import shap
import lime
import lime.lime_tabular
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional

class XAIService:
    """Provides automated, legally defensible explanations using SHAP and LIME."""

    def explain_with_shap(self, model: Any, background_data: pd.DataFrame, input_instance: pd.DataFrame) -> Dict[str, Any]:
        """Calculates SHAP values for a single instance."""
        # Using KernelExplainer as it's model-agnostic
        explainer = shap.KernelExplainer(model.predict, background_data)
        shap_values = explainer.shap_values(input_instance)
        
        # Format results
        feature_names = background_data.columns.tolist()
        importance = dict(zip(feature_names, shap_values[0].tolist()))
        
        return {
            "method": "SHAP (KernelExplainer)",
            "base_value": float(explainer.expected_value),
            "feature_importance": importance,
            "right_enforced": "Right to Explanation"
        }

    def explain_with_lime(self, model: Any, training_data: pd.DataFrame, input_instance: np.ndarray) -> Dict[str, Any]:
        """Calculates LIME explanations for a single instance."""
        explainer = lime.lime_tabular.LimeTabularExplainer(
            training_data.values,
            feature_names=training_data.columns.tolist(),
            class_names=['Rejected', 'Approved'],
            mode='classification'
        )
        
        exp = explainer.explain_instance(input_instance, model.predict_proba)
        
        return {
            "method": "LIME",
            "explanation": exp.as_list(),
            "right_enforced": "Right to Explanation"
        }

def get_shap_explanation(model: Any, background_data: List[Dict], input_instance: Dict):
    service = XAIService()
    bg_df = pd.DataFrame(background_data)
    inst_df = pd.DataFrame([input_instance])
    return service.explain_with_shap(model, bg_df, inst_df)
