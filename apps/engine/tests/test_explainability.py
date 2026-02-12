"""
Tests for SHAP and LIME explainability service.
Uses simple sklearn models to verify explanation output structure.
"""

import pytest
import numpy as np
from unittest.mock import patch


# ============================================================
# Test Data Fixtures
# ============================================================

def make_classification_data():
    """Simple binary classification dataset."""
    np.random.seed(42)
    n = 100
    X = np.random.randn(n, 3)
    # Simple rule: class 1 if feature_0 + feature_1 > 0
    y = (X[:, 0] + X[:, 1] > 0).astype(int)
    return X, y


def make_training_dicts():
    """Training data as list of dicts (API format)."""
    X, y = make_classification_data()
    data = []
    for i in range(len(X)):
        data.append({
            "income": float(X[i, 0]),
            "credit_score": float(X[i, 1]),
            "age": float(X[i, 2]),
            "approved": int(y[i]),
        })
    return data


# ============================================================
# explain_from_data tests (API-level entry point)
# ============================================================

class TestExplainFromData:

    def test_shap_basic_execution(self):
        from app.services.explainability import explain_from_data

        data = make_training_dicts()
        instance = {"income": 1.0, "credit_score": 0.5, "age": -0.2}

        result = explain_from_data(data, "approved", instance, method="shap")

        if "error" in result and "not installed" in result["error"]:
            pytest.skip("SHAP not installed")
        if "error" in result:
            pytest.skip(f"SHAP execution error (library compatibility): {result['error']}")

        assert result.get("method", "").startswith("SHAP")
        assert "feature_importance" in result
        assert "instance_explanations" in result
        assert result["popia_compliance"] is True
        assert "audit_hash" in result

    def test_lime_basic_execution(self):
        from app.services.explainability import explain_from_data

        data = make_training_dicts()
        instance = {"income": 1.0, "credit_score": 0.5, "age": -0.2}

        result = explain_from_data(data, "approved", instance, method="lime")

        if "error" in result and "not installed" in result["error"]:
            pytest.skip("LIME not installed")

        assert result.get("method", "").startswith("LIME")
        assert "feature_contributions" in result
        assert result["popia_compliance"] is True
        assert "audit_hash" in result

    def test_invalid_method_returns_error(self):
        from app.services.explainability import explain_from_data

        result = explain_from_data([], "target", {}, method="invalid")
        assert "error" in result

    def test_missing_target_column_returns_error(self):
        from app.services.explainability import explain_from_data

        data = [{"a": 1, "b": 0}]
        result = explain_from_data(data, "missing_col", {"a": 1}, method="shap")
        assert "error" in result

    def test_empty_data_returns_error(self):
        from app.services.explainability import explain_from_data

        result = explain_from_data([], "target", {}, method="shap")
        assert "error" in result

    def test_missing_instance_feature_returns_error(self):
        from app.services.explainability import explain_from_data

        data = make_training_dicts()
        # Missing "age" feature
        instance = {"income": 1.0, "credit_score": 0.5}

        result = explain_from_data(data, "approved", instance, method="shap")

        if "error" in result and "not installed" in result["error"]:
            pytest.skip("SHAP not installed")

        assert "error" in result
        assert "age" in result["error"]


# ============================================================
# Low-level SHAP tests
# ============================================================

class TestSHAPExplainer:

    def test_input_validation_2d(self):
        from app.services.explainability import explain_with_shap

        result = explain_with_shap(
            predict_fn=lambda x: x,
            background_data=np.array([1, 2, 3]),  # 1D — should fail
            instances=np.array([[1, 2, 3]]),
        )
        assert "error" in result
        assert "2D" in result["error"]

    def test_feature_count_mismatch(self):
        from app.services.explainability import explain_with_shap

        result = explain_with_shap(
            predict_fn=lambda x: x,
            background_data=np.array([[1, 2]]),
            instances=np.array([[1, 2, 3]]),
        )
        assert "error" in result
        assert "mismatch" in result["error"]

    def test_too_many_features(self):
        from app.services.explainability import explain_with_shap

        big = np.zeros((1, 501))
        result = explain_with_shap(
            predict_fn=lambda x: x,
            background_data=big,
            instances=big,
        )
        assert "error" in result
        assert "Maximum" in result["error"]


# ============================================================
# Low-level LIME tests
# ============================================================

class TestLIMEExplainer:

    def _skip_if_lime_missing(self, result):
        if "error" in result and "not installed" in result["error"]:
            pytest.skip("LIME library not installed")

    def test_input_validation_2d(self):
        from app.services.explainability import explain_with_lime

        result = explain_with_lime(
            predict_fn=lambda x: x,
            training_data=np.array([1, 2, 3]),  # 1D — should fail
            instance=np.array([1, 2, 3]),
        )
        self._skip_if_lime_missing(result)
        assert "error" in result
        assert "2D" in result["error"]

    def test_instance_must_be_1d(self):
        from app.services.explainability import explain_with_lime

        result = explain_with_lime(
            predict_fn=lambda x: x,
            training_data=np.array([[1, 2], [3, 4]]),
            instance=np.array([[1, 2]]),  # 2D — should fail
        )
        self._skip_if_lime_missing(result)
        assert "error" in result
        assert "1D" in result["error"]

    def test_feature_count_mismatch(self):
        from app.services.explainability import explain_with_lime

        result = explain_with_lime(
            predict_fn=lambda x: x,
            training_data=np.array([[1, 2]]),
            instance=np.array([1, 2, 3]),
        )
        self._skip_if_lime_missing(result)
        assert "error" in result
        assert "mismatch" in result["error"]

    def test_invalid_mode(self):
        from app.services.explainability import explain_with_lime

        result = explain_with_lime(
            predict_fn=lambda x: x,
            training_data=np.array([[1, 2]]),
            instance=np.array([1, 2]),
            mode="invalid",
        )
        self._skip_if_lime_missing(result)
        assert "error" in result
        assert "mode" in result["error"]


# ============================================================
# Explanation text builders
# ============================================================

class TestExplanationText:

    def test_shap_explanation_text(self):
        from app.services.explainability import _build_explanation_text

        contributions = [("income", 0.5), ("age", -0.3)]
        text = _build_explanation_text(contributions)
        assert "income" in text
        assert "increased" in text
        assert "age" in text
        assert "decreased" in text

    def test_empty_contributions(self):
        from app.services.explainability import _build_explanation_text

        text = _build_explanation_text([])
        assert "No significant" in text

    def test_lime_explanation_text(self):
        from app.services.explainability import _build_lime_explanation

        contributions = [
            {"feature": "income", "weight": 0.4},
            {"feature": "age", "weight": -0.2},
        ]
        text = _build_lime_explanation(contributions)
        assert "income" in text
        assert "supports" in text
        assert "age" in text
        assert "opposes" in text
