from app.core.celery_app import celery_app
from app.services.bias_analysis import (
    analyze_disparate_impact, analyze_equalized_odds, analyze_intersectional
)
from app.core.signing import sign_data
import logging

logger = logging.getLogger("aic.tasks")

@celery_app.task(name="analysis.disparate_impact", bind=True, max_retries=3)
def task_disparate_impact(self, data, protected_attribute, outcome_variable, previous_hash=None):
    try:
        logger.info(f"Starting Disparate Impact task for {protected_attribute}")
        result = analyze_disparate_impact(data, protected_attribute, outcome_variable, previous_hash)
        if "error" in result:
            return {"status": "error", "message": result["error"]}
        
        result["signature"] = sign_data(result["audit_hash"])
        return {"status": "success", "data": result}
    except Exception as e:
        logger.error(f"Task failed: {str(e)}")
        raise self.retry(exc=e, countdown=5)

@celery_app.task(name="analysis.equalized_odds", bind=True, max_retries=3)
def task_equalized_odds(self, data, protected_attribute, actual_outcome, predicted_outcome, threshold=0.1, previous_hash=None):
    try:
        result = analyze_equalized_odds(data, protected_attribute, actual_outcome, predicted_outcome, threshold, previous_hash)
        if "error" in result:
            return {"status": "error", "message": result["error"]}
        
        result["signature"] = sign_data(result["audit_hash"])
        return {"status": "success", "data": result}
    except Exception as e:
        raise self.retry(exc=e, countdown=5)

@celery_app.task(name="analysis.intersectional", bind=True, max_retries=3)
def task_intersectional(self, data, protected_attributes, outcome_variable, min_group_size=10, previous_hash=None):
    try:
        result = analyze_intersectional(data, protected_attributes, outcome_variable, min_group_size, previous_hash)
        if "error" in result:
            return {"status": "error", "message": result["error"]}
        
        result["signature"] = sign_data(result["audit_hash"])
        return {"status": "success", "data": result}
    except Exception as e:
        raise self.retry(exc=e, countdown=5)
