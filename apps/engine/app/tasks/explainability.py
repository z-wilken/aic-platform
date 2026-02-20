from app.core.celery_app import celery_app
from app.services.explainability import explain_from_data
from typing import List, Dict, Any

@celery_app.task(name="app.tasks.explainability.compute_explanation")
def compute_explanation_task(
    data: List[Dict[str, Any]],
    target_column: str,
    instance_data: Dict[str, Any],
    method: str = "shap",
    num_features: int = 10
) -> Dict[str, Any]:
    """
    Background task to compute SHAP/LIME explanations.
    """
    return explain_from_data(
        data=data,
        target_column=target_column,
        instance_data=instance_data,
        method=method,
        num_features=num_features
    )
