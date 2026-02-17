from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse, StreamingResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool
import json

from app.api.v1.schemas.analysis import (
    BiasAuditRequest, EqualizedOddsRequest, IntersectionalRequest, ExplainRequest,
    EmpathyRequest, CorrectionValidationRequest, CorrectionRequest, DisclosureRequest,
    ComprehensiveAuditRequest, AssessmentRequest, TierAssessmentRequest
)
from app.schemas.integrity import IntegrityScoreRequest, IntegrityScoreResponse
from app.services.bias_analysis import (
    analyze_disparate_impact, analyze_equalized_odds, analyze_intersectional,
    analyze_statistical_significance, explain_decision, analyze_empathy,
    validate_correction_process, submit_correction_request, analyze_ai_disclosure,
    comprehensive_audit, assess_organization, assess_tier, list_frameworks,
    get_differential_fairness, get_atkinson_index, get_theil_index
)
from app.services.scoring import calculate_integrity_score
from app.services.privacy_audit import audit_privacy
from app.services.labor_audit import audit_labor
from app.services.evidence_scanner import scan_evidence
from app.services.red_team import red_team_audit
from app.services.fairness_metrics import statistical_parity_difference, epsilon_differential_fairness
from app.services.drift_monitoring import analyze_drift
from app.services.hash_chain import HashChain
from app.services.chain_verification import verify_hash_chain
from app.services.explainability import explain_from_data, explain_from_data_stream
from app.core.signing import sign_data, verify_signature, get_public_key_pem, is_signing_available

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


# --- Request schemas for new endpoints ---

class PrivacyRequest(BaseModel):
    columns: List[str]

class LaborRequest(BaseModel):
    total_decisions: int
    human_interventions: int
    human_overrides: int

class EvidenceRequest(BaseModel):
    text: str

class RedTeamRequest(BaseModel):
    data: List[Dict[str, Any]]
    protected_attribute: str
    other_columns: List[str]

class DriftRequest(BaseModel):
    baseline_data: List[float]
    current_data: List[float]
    feature_name: str
    n_bins: int = Field(default=10, ge=2, le=100)

class SPDRequest(BaseModel):
    data: List[Dict]
    protected_attribute: str
    outcome_variable: str

class EpsilonFairnessRequest(BaseModel):
    data: List[Dict]
    protected_attributes: List[str]
    outcome_variable: str
    epsilon: float = Field(default=0.8, gt=0.0)
    min_group_size: int = Field(default=10, ge=2)

class HashChainVerifyRequest(BaseModel):
    records: List[Dict[str, Any]]

class HashChainCreateRequest(BaseModel):
    entry_data: Dict[str, Any]
    previous_hash: Optional[str] = None
    sequence_number: int = 0

class ExplainabilityRequest(BaseModel):
    data: List[Dict[str, Any]]
    target_column: str
    instance: Dict[str, Any]
    method: str = Field(default="shap", pattern="^(shap|lime)$")
    num_features: int = Field(default=10, ge=1, le=50)

class ExplainStreamingRequest(BaseModel):
    data: List[Dict[str, Any]]
    target_column: str
    instances: List[Dict[str, Any]]
    method: str = Field(default="shap", pattern="^(shap|lime)$")
    num_features: int = Field(default=10, ge=1, le=50)

class SignatureVerifyRequest(BaseModel):
    data: str
    signature: str

class BatchAnalysisRequest(BaseModel):
    analyses: List[Dict[str, Any]] = Field(..., max_length=20)
    """Each item: {"type": "disparate_impact"|"equalized_odds"|..., "params": {...}}"""


# --- Task Monitoring & Async Integration ---

from app.tasks.explainability import compute_explanation_task
from app.tasks.analysis import (
    task_disparate_impact, task_equalized_odds, task_intersectional
)
from celery.result import AsyncResult

@router.get("/tasks/{task_id}")
def get_task_status(task_id: str):
    """Check status and retrieve results for any async task."""
    result = AsyncResult(task_id)
    return {
        "task_id": task_id,
        "status": result.status,
        "result": result.result if result.ready() else None
    }

@router.post("/analyze/async")
@limiter.limit("30/minute")
def disparate_impact_async(body: BiasAuditRequest, request: Request):
    task = task_disparate_impact.delay(
        body.data, body.protected_attribute, body.outcome_variable, body.previous_hash
    )
    return {"task_id": task.id, "status": "PENDING"}

@router.post("/analyze/equalized-odds/async")
@limiter.limit("30/minute")
def equalized_odds_async(body: EqualizedOddsRequest, request: Request):
    task = task_equalized_odds.delay(
        body.data, body.protected_attribute, body.actual_outcome, 
        body.predicted_outcome, body.threshold, body.previous_hash
    )
    return {"task_id": task.id, "status": "PENDING"}

@router.post("/analyze/intersectional/async")
@limiter.limit("20/minute")
def intersectional_analysis_async(body: IntersectionalRequest, request: Request):
    task = task_intersectional.delay(
        body.data, body.protected_attributes, body.outcome_variable, 
        body.min_group_size, body.previous_hash
    )
    return {"task_id": task.id, "status": "PENDING"}

@router.post("/explain/async")
@limiter.limit("20/minute")
def explain_async(body: ExplainabilityRequest, request: Request):
    """Asynchronous explanation request (SHAP or LIME)."""
    task = compute_explanation_task.delay(
        body.data, body.target_column, body.instance,
        body.method, body.num_features
    )
    return {"task_id": task.id, "status": "PENDING"}


# --- Core audit endpoints ---

@router.post("/audit/privacy")
@limiter.limit("30/minute")
def get_privacy_audit(body: PrivacyRequest, request: Request):
    return audit_privacy(body.columns)

@router.post("/audit/labor")
@limiter.limit("30/minute")
def get_labor_audit(body: LaborRequest, request: Request):
    return audit_labor(body.total_decisions, body.human_interventions, body.human_overrides)

@router.post("/audit/verify-document")
@limiter.limit("20/minute")
def get_evidence_verification(body: EvidenceRequest, request: Request):
    return scan_evidence(body.text)

@router.post("/audit/red-team")
@limiter.limit("10/minute")
def get_red_team_audit(body: RedTeamRequest, request: Request):
    return red_team_audit(body.data, body.protected_attribute, body.other_columns)

@router.post("/audit-trail/verify")
@limiter.limit("10/minute")
def verify_audit_chain(body: HashChainVerifyRequest, request: Request):
    """Verify integrity of a hash chain of audit records."""
    return HashChain.verify_chain(body.records)

@router.post("/integrity/calculate", response_model=IntegrityScoreResponse)
@limiter.limit("30/minute")
def get_integrity_score(body: IntegrityScoreRequest, request: Request):
    return calculate_integrity_score(body)


# --- Bias analysis endpoints ---

@router.post("/analyze")
@limiter.limit("30/minute")
async def disparate_impact(body: BiasAuditRequest, request: Request):
    result = await run_in_threadpool(analyze_disparate_impact, body.data, body.protected_attribute, body.outcome_variable, body.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = sign_data(result["audit_hash"])
    return result

@router.post("/analyze/equalized-odds")
@limiter.limit("30/minute")
async def equalized_odds(body: EqualizedOddsRequest, request: Request):
    result = await run_in_threadpool(analyze_equalized_odds, body.data, body.protected_attribute, body.actual_outcome, body.predicted_outcome, body.threshold, body.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = sign_data(result["audit_hash"])
    return result

@router.post("/analyze/intersectional")
@limiter.limit("20/minute")
async def intersectional_analysis(body: IntersectionalRequest, request: Request):
    result = await run_in_threadpool(analyze_intersectional, body.data, body.protected_attributes, body.outcome_variable, body.min_group_size, body.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = sign_data(result["audit_hash"])
    return result

@router.post("/analyze/statistical")
@limiter.limit("30/minute")
def statistical_significance(body: BiasAuditRequest, request: Request):
    result = analyze_statistical_significance(body.data, body.protected_attribute, body.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/theil-index")
@limiter.limit("30/minute")
def theil_index(body: BiasAuditRequest, request: Request):
    return get_theil_index(body.data, body.protected_attribute, body.outcome_variable)

@router.post("/analyze/atkinson-index")
@limiter.limit("30/minute")
def atkinson_index(body: BiasAuditRequest, request: Request):
    return get_atkinson_index(body.data, body.protected_attribute, body.outcome_variable)

@router.post("/analyze/differential-fairness")
@limiter.limit("20/minute")
def differential_fairness(body: IntersectionalRequest, request: Request):
    return get_differential_fairness(body.data, body.protected_attributes, body.outcome_variable)


# --- Rights enforcement endpoints ---

@router.post("/explain")
@limiter.limit("30/minute")
def decision_explanation(body: ExplainRequest, request: Request):
    return explain_decision(body.model_type, body.input_features, body.decision, body.feature_weights, body.confidence)

@router.post("/analyze/empathy")
@limiter.limit("30/minute")
def empathy_analysis(body: EmpathyRequest, request: Request):
    return analyze_empathy(body.text, body.context)

@router.post("/validate/correction-process")
@limiter.limit("20/minute")
def correction_process_validation(body: CorrectionValidationRequest, request: Request):
    return validate_correction_process(body.has_appeal_mechanism, body.response_time_hours, body.human_reviewer_assigned, body.clear_instructions, body.accessible_format)

@router.post("/correction/submit")
@limiter.limit("10/minute")
def correction_submission(body: CorrectionRequest, request: Request):
    return submit_correction_request(body.decision_id, body.original_decision, body.requested_outcome, body.reason, body.supporting_evidence)

@router.post("/analyze/disclosure")
@limiter.limit("30/minute")
def ai_disclosure_analysis(body: DisclosureRequest, request: Request):
    return analyze_ai_disclosure(body.interface_text, body.interaction_type)

@router.post("/audit/comprehensive")
@limiter.limit("5/minute")
def comprehensive_auditing(body: ComprehensiveAuditRequest, request: Request):
    return comprehensive_audit(body.organization_name, body.ai_systems, body.framework)


# --- Assessment endpoints ---

@router.post("/assess")
@limiter.limit("30/minute")
def organization_assessment(body: AssessmentRequest, request: Request):
    return assess_organization(body.answers)

@router.post("/assess/tier")
@limiter.limit("30/minute")
def tier_assessment(body: TierAssessmentRequest, request: Request):
    return assess_tier(body.ai_affects_rights, body.special_personal_info, body.human_oversight)

@router.get("/frameworks")
@limiter.limit("60/minute")
def frameworks_listing(request: Request):
    return list_frameworks()


# --- Fairness metrics endpoints ---

@router.post("/analyze/statistical-parity")
@limiter.limit("30/minute")
def spd_analysis(body: SPDRequest, request: Request):
    """Statistical Parity Difference analysis across groups."""
    result = statistical_parity_difference(body.data, body.protected_attribute, body.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/epsilon-fairness")
@limiter.limit("20/minute")
def epsilon_fairness_analysis(body: EpsilonFairnessRequest, request: Request):
    """epsilon-Differential Fairness for intersectional subgroups."""
    result = epsilon_differential_fairness(
        body.data, body.protected_attributes, body.outcome_variable,
        body.epsilon, body.min_group_size
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


# --- Drift monitoring endpoint ---

@router.post("/analyze/drift")
@limiter.limit("20/minute")
def drift_analysis(body: DriftRequest, request: Request):
    """Distribution drift monitoring (PSI + Jensen-Shannon + KS test)."""
    result = analyze_drift(body.baseline_data, body.current_data, body.feature_name, body.n_bins)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


# --- Hash chain / audit trail endpoints ---

@router.post("/audit-trail/create")
@limiter.limit("60/minute")
def create_audit_record(body: HashChainCreateRequest, request: Request):
    """Create a chain-linked audit record."""
    return HashChain.create_audit_record(
        body.entry_data, body.previous_hash, body.sequence_number
    )


# --- Explainability endpoints (SHAP / LIME) ---

@router.post("/explain/shap")
@limiter.limit("10/minute")
async def shap_explanation(body: ExplainabilityRequest, request: Request):
    """SHAP-based model explanation. Trains a surrogate model on provided data."""
    result = await run_in_threadpool(
        explain_from_data,
        body.data, body.target_column, body.instance,
        method="shap", num_features=body.num_features,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/explain/lime")
@limiter.limit("10/minute")
async def lime_explanation(body: ExplainabilityRequest, request: Request):
    """LIME-based local model explanation."""
    result = await run_in_threadpool(
        explain_from_data,
        body.data, body.target_column, body.instance,
        method="lime", num_features=body.num_features,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/explain/stream")
@limiter.limit("5/minute")
async def explain_streaming(body: ExplainStreamingRequest, request: Request):
    """Streaming explanation request for multiple instances."""
    return StreamingResponse(
        explain_from_data_stream(
            body.data, body.target_column, body.instances,
            body.method, body.num_features
        ),
        media_type="application/x-ndjson"
    )


# --- Cryptographic signature endpoints ---

@router.post("/audit-trail/verify-signature")
@limiter.limit("30/minute")
def verify_audit_signature(body: SignatureVerifyRequest, request: Request):
    """Verify the cryptographic signature of an audit record."""
    return verify_signature(body.data, body.signature)

@router.get("/audit-trail/public-key")
@limiter.limit("60/minute")
def get_signing_public_key(request: Request):
    """Retrieve the public key for external signature verification."""
    pem = get_public_key_pem()
    if pem is None:
        raise HTTPException(status_code=503, detail="Signing not available")
    return {"public_key_pem": pem, "algorithm": "RSA-3072 with PSS padding (SHA-256)"}

@router.get("/audit-trail/signing-status")
@limiter.limit("60/minute")
def signing_status(request: Request):
    """Check whether cryptographic signing is available."""
    return {"signing_available": is_signing_available()}


# --- Batch processing endpoint ---

@router.post("/analyze/batch")
@limiter.limit("5/minute")
async def batch_analysis(body: BatchAnalysisRequest, request: Request):
    """
    Run multiple analyses in a single request.
    Each item specifies a type and params dict.
    Max 20 analyses per batch.
    """
    ANALYSIS_MAP = {
        "disparate_impact": lambda p: analyze_disparate_impact(
            p["data"], p["protected_attribute"], p["outcome_variable"], p.get("previous_hash")
        ),
        "equalized_odds": lambda p: analyze_equalized_odds(
            p["data"], p["protected_attribute"],
            p["actual_outcome"], p["predicted_outcome"],
            p.get("threshold", 0.1), p.get("previous_hash")
        ),
        "statistical": lambda p: analyze_statistical_significance(
            p["data"], p["protected_attribute"], p["outcome_variable"]
        ),
        "statistical_parity": lambda p: statistical_parity_difference(
            p["data"], p["protected_attribute"], p["outcome_variable"]
        ),
        "empathy": lambda p: analyze_empathy(p["text"], p["context"]),
        "disclosure": lambda p: analyze_ai_disclosure(
            p["interface_text"], p["interaction_type"]
        ),
        "drift": lambda p: analyze_drift(
            p["baseline_data"], p["current_data"],
            p["feature_name"], p.get("n_bins", 10),
        ),
    }

    results = []
    for i, item in enumerate(body.analyses):
        analysis_type = item.get("type", "")
        params = item.get("params", {})

        if analysis_type not in ANALYSIS_MAP:
            results.append({
                "index": i,
                "type": analysis_type,
                "error": f"Unknown analysis type '{analysis_type}'. "
                         f"Available: {', '.join(ANALYSIS_MAP.keys())}",
            })
            continue

        try:
            result = await run_in_threadpool(ANALYSIS_MAP[analysis_type], params)
            results.append({"index": i, "type": analysis_type, "result": result})
        except KeyError as e:
            results.append({
                "index": i, "type": analysis_type,
                "error": f"Missing required parameter: {e}",
            })
        except Exception as e:
            results.append({
                "index": i, "type": analysis_type,
                "error": f"Analysis failed: {str(e)}",
            })

    return {
        "total": len(body.analyses),
        "completed": sum(1 for r in results if "result" in r),
        "failed": sum(1 for r in results if "error" in r),
        "results": results,
    }
