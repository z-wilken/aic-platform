from app.core.celery_app import celery_app
from app.services.bias_analysis import (
    analyze_disparate_impact, analyze_equalized_odds, analyze_intersectional
)
from app.services.explainability import explain_from_data
from app.core.signing import sign_data
from app.core.telemetry import track_resource_usage
import logging

logger = logging.getLogger("aic.tasks")

@celery_app.task(name="analysis.disparate_impact", bind=True, max_retries=3)
def task_disparate_impact(self, data, protected_attribute, outcome_variable, previous_hash=None):
    try:
        logger.info(f"Starting Disparate Impact task for {protected_attribute}")
        with track_resource_usage() as usage:
            result = analyze_disparate_impact(data, protected_attribute, outcome_variable, previous_hash)
            if "error" in result:
                return {"status": "error", "message": result["error"]}
            
            result["resource_usage"] = usage
            result["signature"] = sign_data(result["audit_hash"])
            return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Task failed: {str(e)}")
        raise self.retry(exc=e, countdown=5)

@celery_app.task(name="analysis.equalized_odds", bind=True, max_retries=3)
def task_equalized_odds(self, data, protected_attribute, actual_outcome, predicted_outcome, threshold=0.1, previous_hash=None):
    try:
        with track_resource_usage() as usage:
            result = analyze_equalized_odds(data, protected_attribute, actual_outcome, predicted_outcome, threshold, previous_hash)
            if "error" in result:
                return {"status": "error", "message": result["error"]}
            
            result["resource_usage"] = usage
            result["signature"] = sign_data(result["audit_hash"])
            return {"status": "success", "data": result}
    except Exception as e:
        raise self.retry(exc=e, countdown=5)

@celery_app.task(name="analysis.intersectional", bind=True, max_retries=3)
def task_intersectional(self, data, protected_attributes, outcome_variable, min_group_size=10, previous_hash=None):
    try:
        with track_resource_usage() as usage:
            result = analyze_intersectional(data, protected_attributes, outcome_variable, min_group_size, previous_hash)
            if "error" in result:
                return {"status": "error", "message": result["error"]}
            
            result["resource_usage"] = usage
            result["signature"] = sign_data(result["audit_hash"])
            return {"status": "success", "data": result}
    except Exception as e:
        raise self.retry(exc=e, countdown=5)

@celery_app.task(name="analysis.explain", bind=True, max_retries=2)
def task_explain(self, data, target_column, instance, method="shap", num_features=10):
    """Async task for SHAP/LIME explanations."""
    try:
        logger.info(f"Starting {method.upper()} explanation task")
        with track_resource_usage() as usage:
            result = explain_from_data(data, target_column, instance, method, num_features)
            if "error" in result:
                return {"status": "error", "message": result["error"]}
            
            result["resource_usage"] = usage
            # Sign the result for the audit trail
            if "audit_hash" in result:
                result["signature"] = sign_data(result["audit_hash"])
                
            return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Explanation task failed: {str(e)}")
        raise self.retry(exc=e, countdown=10)
