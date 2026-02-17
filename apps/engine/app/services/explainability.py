"""
Explainability Service — SHAP & LIME integrations.

Provides model-agnostic explanations for AI decisions, supporting
POPIA Section 71 Right to Explanation compliance.

SHAP: Global and local feature importance via Shapley values.
LIME: Local interpretable model-agnostic explanations.
"""

import numpy as np
import pandas as pd
from typing import List, Dict, Any, Optional, Callable
from datetime import datetime
import hashlib
import json
import logging
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder

# Task 7: Module-level imports to mitigate overhead
try:
    import shap
except ImportError:
    shap = None
    logging.warning("SHAP library not available")

try:
    import lime.lime_tabular
except ImportError:
    lime = None
    logging.warning("LIME library not available")

from app.core.config import MAX_FEATURES, MAX_DATA_ROWS, MAX_BATCH_SIZE, MAX_CACHE_ENTRIES, CACHE_TTL_SECONDS

logger = logging.getLogger("aic.engine.explainability")

# Maximum model/data sizes to prevent resource exhaustion
# Replaced by centralized config imports
MAX_SAMPLES = MAX_DATA_ROWS
MAX_EXPLANATION_INSTANCES = MAX_BATCH_SIZE

# Task 6: SHAP/LIME Surrogate Model Cache
_MODEL_CACHE = {}

def _cleanup_cache():
    """Remove expired entries and enforce size limit."""
    global _MODEL_CACHE
    now = datetime.utcnow()
    
    # 1. Remove expired entries
    expired_keys = [
        k for k, v in _MODEL_CACHE.items() 
        if (now - v["timestamp"]).total_seconds() > CACHE_TTL_SECONDS
    ]
    for k in expired_keys:
        del _MODEL_CACHE[k]
    if expired_keys:
        logger.info(f"Cleared {len(expired_keys)} expired entries from model cache.")

    # 2. Enforce size limit (LRU)
    if len(_MODEL_CACHE) > MAX_CACHE_ENTRIES:
        sorted_keys = sorted(_MODEL_CACHE.keys(), key=lambda k: _MODEL_CACHE[k]["timestamp"])
        num_to_remove = len(_MODEL_CACHE) - MAX_CACHE_ENTRIES + 5 # Remove extra to avoid immediate thrashing
        for i in range(min(num_to_remove, len(sorted_keys))):
            del _MODEL_CACHE[sorted_keys[i]]
        logger.info(f"Model cache exceeded limit. Removed {num_to_remove} oldest entries.")

def _generate_hash(data: Any) -> str:
    """Generate SHA-256 hash for audit trail and caching."""
    json_str = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(json_str.encode()).hexdigest()


def explain_with_shap(
    predict_fn: Callable,
    background_data: np.ndarray,
    instances: np.ndarray,
    feature_names: Optional[List[str]] = None,
    max_background_samples: int = 100,
) -> Dict[str, Any]:
    """
    Generate SHAP explanations for one or more instances.
    """
    if shap is None:
        return {"error": "SHAP library not installed. Add shap>=0.44.0 to requirements."}

    # Validate inputs
    if background_data.ndim != 2:
        return {"error": "background_data must be a 2D array"}
    if instances.ndim != 2:
        return {"error": "instances must be a 2D array"}
    if background_data.shape[1] != instances.shape[1]:
        return {"error": f"Feature count mismatch: background has {background_data.shape[1]}, instances have {instances.shape[1]}"}
    if instances.shape[1] > MAX_FEATURES:
        return {"error": f"Too many features ({instances.shape[1]}). Maximum is {MAX_FEATURES}."}
    if instances.shape[0] > MAX_EXPLANATION_INSTANCES:
        return {"error": f"Too many instances ({instances.shape[0]}). Maximum is {MAX_EXPLANATION_INSTANCES}."}

    n_features = instances.shape[1]
    if feature_names is None:
        feature_names = [f"feature_{i}" for i in range(n_features)]

    # Subsample background data if too large
    if background_data.shape[0] > max_background_samples:
        indices = np.random.choice(
            background_data.shape[0], max_background_samples, replace=False
        )
        background_data = background_data[indices]

    try:
        explainer = shap.KernelExplainer(predict_fn, background_data)
        shap_values = explainer.shap_values(instances)

        # Handle multi-output models
        if isinstance(shap_values, list):
            # Multi-class: use first class for ranking
            primary_shap = shap_values[0]
            all_shap = {f"class_{i}": sv.tolist() for i, sv in enumerate(shap_values)}
        else:
            primary_shap = shap_values
            all_shap = {"values": shap_values.tolist()}

        # Compute feature importance (mean absolute SHAP value)
        mean_abs_shap = np.abs(primary_shap).mean(axis=0)
        importance_ranking = sorted(
            zip(feature_names, mean_abs_shap.tolist()),
            key=lambda x: x[1],
            reverse=True,
        )

        # Per-instance explanations
        instance_explanations = []
        for idx in range(instances.shape[0]):
            instance_shap = primary_shap[idx]
            contributions = sorted(
                zip(feature_names, instance_shap.tolist()),
                key=lambda x: abs(x[1]),
                reverse=True,
            )
            instance_explanations.append({
                "instance_index": idx,
                "feature_contributions": [
                    {"feature": name, "shap_value": round(val, 6)}
                    for name, val in contributions
                ],
                "prediction_explanation": _build_explanation_text(contributions[:5]),
            })

        result = {
            "method": "SHAP (KernelExplainer)",
            "instances_explained": instances.shape[0],
            "n_features": n_features,
            "feature_importance": [
                {"feature": name, "mean_abs_shap": round(val, 6)}
                for name, val in importance_ranking
            ],
            "base_value": (
                explainer.expected_value.tolist()
                if isinstance(explainer.expected_value, np.ndarray)
                else explainer.expected_value
            ),
            "shap_values": all_shap,
            "instance_explanations": instance_explanations,
            "popia_compliance": True,
            "right_enforced": "Right to Explanation (POPIA Section 71)",
            "timestamp": datetime.utcnow().isoformat(),
        }
        result["audit_hash"] = _generate_hash(result)
        return result

    except Exception as e:
        logger.error(f"SHAP explanation failed: {e}")
        return {"error": f"SHAP explanation failed: {str(e)}"}


def explain_with_lime(
    predict_fn: Callable,
    training_data: np.ndarray,
    instance: np.ndarray,
    feature_names: Optional[List[str]] = None,
    class_names: Optional[List[str]] = None,
    num_features: int = 10,
    num_samples: int = 5000,
    mode: str = "classification",
) -> Dict[str, Any]:
    """
    Generate LIME explanation for a single instance.

    Args:
        predict_fn: Model prediction function.
        training_data: Training data for fitting the explainer.
        instance: Single instance to explain (1D array).
        feature_names: Optional list of feature names.
        class_names: Optional list of class names.
        num_features: Number of top features to include.
        num_samples: Number of perturbed samples for LIME.
        mode: "classification" or "regression".

    Returns:
        Dict with feature contributions, prediction probabilities, and explanation text.
    """
    if lime is None:
        return {"error": "LIME library not installed. Add lime>=0.2.0 to requirements."}

    # Validate inputs
    if training_data.ndim != 2:
        return {"error": "training_data must be a 2D array"}
    if instance.ndim != 1:
        return {"error": "instance must be a 1D array"}
    if training_data.shape[1] != instance.shape[0]:
        return {"error": f"Feature count mismatch: training has {training_data.shape[1]}, instance has {instance.shape[0]}"}
    if training_data.shape[1] > MAX_FEATURES:
        return {"error": f"Too many features ({training_data.shape[1]}). Maximum is {MAX_FEATURES}."}
    if mode not in ("classification", "regression"):
        return {"error": f"Invalid mode '{mode}'. Must be 'classification' or 'regression'."}

    n_features = training_data.shape[1]
    if feature_names is None:
        feature_names = [f"feature_{i}" for i in range(n_features)]

    # Subsample training data if too large
    if training_data.shape[0] > MAX_SAMPLES:
        indices = np.random.choice(training_data.shape[0], MAX_SAMPLES, replace=False)
        training_data = training_data[indices]

    try:
        explainer = lime.lime_tabular.LimeTabularExplainer(
            training_data,
            feature_names=feature_names,
            class_names=class_names,
            mode=mode,
        )

        explanation = explainer.explain_instance(
            instance,
            predict_fn,
            num_features=min(num_features, n_features),
            num_samples=num_samples,
        )

        # Extract feature contributions
        feature_contributions = []
        for feature_idx, weight in explanation.as_list():
            feature_contributions.append({
                "feature": str(feature_idx),
                "weight": round(weight, 6),
                "direction": "positive" if weight > 0 else "negative",
            })

        # Get prediction probabilities
        local_pred = explanation.local_pred
        intercept = explanation.intercept

        result = {
            "method": "LIME (LimeTabularExplainer)",
            "mode": mode,
            "n_features_used": len(feature_contributions),
            "n_samples_generated": num_samples,
            "feature_contributions": feature_contributions,
            "intercept": (
                intercept.tolist() if isinstance(intercept, np.ndarray)
                else [intercept] if isinstance(intercept, (int, float)) else list(intercept)
            ),
            "local_prediction": (
                local_pred.tolist() if isinstance(local_pred, np.ndarray)
                else [local_pred] if isinstance(local_pred, (int, float)) else list(local_pred)
            ),
            "prediction_explanation": _build_lime_explanation(feature_contributions[:5]),
            "score": explanation.score if hasattr(explanation, "score") else None,
            "popia_compliance": True,
            "right_enforced": "Right to Explanation (POPIA Section 71)",
            "timestamp": datetime.utcnow().isoformat(),
        }
        result["audit_hash"] = _generate_hash(result)
        return result

    except Exception as e:
        logger.error(f"LIME explanation failed: {e}")
        return {"error": f"LIME explanation failed: {str(e)}"}


def explain_from_data(
    data: List[Dict[str, Any]],
    target_column: str,
    instance_data: Dict[str, Any],
    method: str = "shap",
    num_features: int = 10,
) -> Dict[str, Any]:
    """
    High-level explanation function that trains a simple model on the provided data
    and explains a specific instance. This is the API-friendly entry point that
    doesn't require the caller to provide a pre-trained model.

    Args:
        data: Training data as list of dicts.
        target_column: Name of the target/outcome column.
        instance_data: Single instance to explain (dict of feature values).
        method: "shap" or "lime".
        num_features: Number of features to include in explanation.

    Returns:
        Explanation dict with feature contributions and compliance info.
    """
    if not data:
        return {"error": "No training data provided"}
    if target_column not in data[0]:
        return {"error": f"Target column '{target_column}' not found in data"}

    # Task 6: Implement Model Caching
    _cleanup_cache()
    data_hash = _generate_hash({"data": data, "target": target_column})
    
    # Always compute X_array and feature names from current data to avoid fatal memory growth
    df = pd.DataFrame(data)
    if target_column not in df.columns:
        return {"error": f"Target column '{target_column}' not found"}

    feature_cols = [c for c in df.columns if c != target_column]
    if not feature_cols:
        return {"error": "No feature columns found"}

    encoders = {}
    X = df[feature_cols].copy()
    for col in X.columns:
        if X[col].dtype == object:
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
            encoders[col] = le

    y = df[target_column].values
    feature_names = list(X.columns)
    X_array = X.values.astype(float)

    if data_hash in _MODEL_CACHE:
        cache_entry = _MODEL_CACHE[data_hash]
        model = cache_entry["model"]
        # Update timestamp to mark as recently used
        cache_entry["timestamp"] = datetime.utcnow()
        # Use encoders and feature names from cache if they were different
        if "encoders" in cache_entry: encoders = cache_entry["encoders"]
        if "feature_names" in cache_entry: feature_names = cache_entry["feature_names"]
        logger.info(f"Using cached surrogate model for data hash {data_hash[:8]}")
    else:
        # Train a simple model
        model = GradientBoostingClassifier(n_estimators=50, max_depth=3, random_state=42)
        try:
            model.fit(X_array, y)
        except Exception as e:
            return {"error": f"Model training failed: {str(e)}"}

        # Store in cache (MINIMAL ENTRY - NO X_ARRAY)
        _MODEL_CACHE[data_hash] = {
            "model": model,
            "feature_names": feature_names,
            "encoders": encoders,
            "timestamp": datetime.utcnow()
        }
        logger.info(f"Trained and cached new surrogate model for data hash {data_hash[:8]}")

    # Build instance array
    feature_cols = feature_names # use names from trained model
    instance_values = []
    for col in feature_cols:
        val = instance_data.get(col)
        if val is None:
            return {"error": f"Instance missing feature '{col}'"}
        if col in encoders:
            try:
                val = encoders[col].transform([str(val)])[0]
            except ValueError:
                return {"error": f"Unknown category '{val}' for feature '{col}'"}
        instance_values.append(float(val))

    instance_array = np.array(instance_values)

    # Generate explanation
    if method == "shap":
        return explain_with_shap(
            predict_fn=model.predict_proba,
            background_data=X_array,
            instances=instance_array.reshape(1, -1),
            feature_names=feature_names,
        )
    elif method == "lime":
        return explain_with_lime(
            predict_fn=model.predict_proba,
            training_data=X_array,
            instance=instance_array,
            feature_names=feature_names,
            mode="classification",
            num_features=num_features,
        )
    else:
        return {"error": f"Unknown method '{method}'. Use 'shap' or 'lime'."}


def explain_from_data_stream(
    data: List[Dict[str, Any]],
    target_column: str,
    instances: List[Dict[str, Any]],
    method: str = "shap",
    num_features: int = 10,
):
    """
    Generator that yields explanations one by one for a batch of instances.
    Enables streaming responses for long-running batch explanations.
    """
    if not data or not instances:
        yield json.dumps({"error": "Data and instances required"})
        return

    # 1. Prepare / Train model (cached)
    _cleanup_cache()
    data_hash = _generate_hash({"data": data, "target": target_column})
    
    df = pd.DataFrame(data)
    feature_cols = [c for c in df.columns if c != target_column]
    encoders = {}
    X = df[feature_cols].copy()
    for col in X.columns:
        if X[col].dtype == object:
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
            encoders[col] = le

    y = df[target_column].values
    feature_names = list(X.columns)
    X_array = X.values.astype(float)

    if data_hash in _MODEL_CACHE:
        cache_entry = _MODEL_CACHE[data_hash]
        model = cache_entry["model"]
        cache_entry["timestamp"] = datetime.utcnow()
    else:
        model = GradientBoostingClassifier(n_estimators=50, max_depth=3, random_state=42)
        model.fit(X_array, y)
        _MODEL_CACHE[data_hash] = {
            "model": model,
            "feature_names": feature_names,
            "encoders": encoders,
            "timestamp": datetime.utcnow()
        }

    # 2. Process instances one by one
    for i, instance_data in enumerate(instances):
        try:
            instance_values = []
            for col in feature_names:
                val = instance_data.get(col)
                if val is None:
                    yield json.dumps({"index": i, "error": f"Missing feature '{col}'"})
                    continue
                if col in encoders:
                    val = encoders[col].transform([str(val)])[0]
                instance_values.append(float(val))

            instance_array = np.array(instance_values).reshape(1, -1)

            if method == "shap":
                res = explain_with_shap(model.predict_proba, X_array, instance_array, feature_names)
            else:
                res = explain_with_lime(model.predict_proba, X_array, instance_array[0], feature_names, num_features=num_features)
            
            yield json.dumps({"index": i, "result": res}) + "\n"
        except Exception as e:
            yield json.dumps({"index": i, "error": str(e)}) + "\n"


def _build_explanation_text(top_contributions: list) -> str:
    """Build human-readable explanation from top SHAP contributions."""
    if not top_contributions:
        return "No significant feature contributions identified."

    parts = []
    for name, value in top_contributions:
        direction = "increased" if value > 0 else "decreased"
        parts.append(f"'{name}' {direction} the prediction by {abs(value):.4f}")

    return "Key factors: " + "; ".join(parts) + "."


def _build_lime_explanation(top_contributions: list) -> str:
    """Build human-readable explanation from top LIME contributions."""
    if not top_contributions:
        return "No significant feature contributions identified."

    parts = []
    for contrib in top_contributions:
        feature = contrib["feature"]
        weight = contrib["weight"]
        direction = "supports" if weight > 0 else "opposes"
        parts.append(f"'{feature}' {direction} the prediction (weight: {weight:.4f})")

    return "Key factors: " + "; ".join(parts) + "."
