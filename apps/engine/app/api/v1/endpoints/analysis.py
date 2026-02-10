from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from pydantic import BaseModel, Field

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
# ...
@router.post("/analyze/theil-index")
def theil_index(request: BiasAuditRequest):
    return get_theil_index(request.data, request.protected_attribute, request.outcome_variable)
# ...
@router.post("/analyze/atkinson-index")
def atkinson_index(request: BiasAuditRequest):
    return get_atkinson_index(request.data, request.protected_attribute, request.outcome_variable)
# ...
@router.post("/analyze/differential-fairness")
def differential_fairness(request: IntersectionalRequest):
    return get_differential_fairness(request.data, request.protected_attributes, request.outcome_variable)
from app.services.scoring import calculate_integrity_score
from app.services.privacy_audit import audit_privacy
from app.services.labor_audit import audit_labor
from app.services.evidence_scanner import scan_evidence
from app.services.red_team import red_team_audit
<<<<<<< HEAD
from app.services.chain_verification import verify_hash_chain
from app.services.drift_monitoring import get_psi_drift, get_js_drift
from app.core.security import signing_service
from pydantic import BaseModel
=======
from app.services.fairness_metrics import statistical_parity_difference, epsilon_differential_fairness
from app.services.drift_monitoring import analyze_drift
from app.services.hash_chain import HashChain
from app.services.explainability import explain_from_data
from app.core.signing import verify_signature, get_public_key_pem, is_signing_available
>>>>>>> 6613deacf45449267c65d2548cdf527fffefefb1

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

<<<<<<< HEAD
class VerifyChainRequest(BaseModel):
    entries: List[Dict[str, Any]]

class DriftRequest(BaseModel):
    expected_data: List[float]
    actual_data: List[float]

@router.post("/analyze/drift/psi")
def get_psi_analysis(request: DriftRequest):
    return get_psi_drift(request.expected_data, request.actual_data)

@router.post("/analyze/drift/js")
def get_js_analysis(request: DriftRequest):
    return get_js_drift(request.expected_data, request.actual_data)
=======
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

class SignatureVerifyRequest(BaseModel):
    data: str
    signature: str

class BatchAnalysisRequest(BaseModel):
    analyses: List[Dict[str, Any]] = Field(..., max_length=20)
    """Each item: {"type": "disparate_impact"|"equalized_odds"|..., "params": {...}}"""


# --- Existing endpoints (fixed) ---
>>>>>>> 6613deacf45449267c65d2548cdf527fffefefb1

@router.post("/audit/privacy")
@limiter.limit("30/minute")
def get_privacy_audit(request: PrivacyRequest, req: Request):
    return audit_privacy(request.columns)

@router.post("/audit/labor")
@limiter.limit("30/minute")
def get_labor_audit(request: LaborRequest, req: Request):
    return audit_labor(request.total_decisions, request.human_interventions, request.human_overrides)

@router.post("/audit/verify-document")
@limiter.limit("20/minute")
def get_evidence_verification(request: EvidenceRequest, req: Request):
    return scan_evidence(request.text)

@router.post("/audit/red-team")
@limiter.limit("10/minute")
def get_red_team_audit(request: RedTeamRequest, req: Request):
    return red_team_audit(request.data, request.protected_attribute, request.other_columns)

@router.post("/audit-trail/verify")
def get_chain_verification(request: VerifyChainRequest):
    return verify_hash_chain(request.entries)

@router.post("/integrity/calculate", response_model=IntegrityScoreResponse)
@limiter.limit("30/minute")
def get_integrity_score(request: IntegrityScoreRequest, req: Request):
    return calculate_integrity_score(request)

@router.post("/analyze")
<<<<<<< HEAD
def disparate_impact(request: BiasAuditRequest):
    result = analyze_disparate_impact(request.data, request.protected_attribute, request.outcome_variable, request.previous_hash)
=======
@limiter.limit("30/minute")
def disparate_impact(request: BiasAuditRequest, req: Request):
    result = analyze_disparate_impact(request.data, request.protected_attribute, request.outcome_variable)
>>>>>>> 6613deacf45449267c65d2548cdf527fffefefb1
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = signing_service.sign_hash(result["audit_hash"])
    return result

@router.post("/analyze/equalized-odds")
<<<<<<< HEAD
def equalized_odds(request: EqualizedOddsRequest):
    result = analyze_equalized_odds(request.data, request.protected_attribute, request.actual_outcome, request.predicted_outcome, request.threshold, request.previous_hash)
=======
@limiter.limit("30/minute")
def equalized_odds(request: EqualizedOddsRequest, req: Request):
    result = analyze_equalized_odds(request.data, request.protected_attribute, request.actual_outcome, request.predicted_outcome, request.threshold)
>>>>>>> 6613deacf45449267c65d2548cdf527fffefefb1
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = signing_service.sign_hash(result["audit_hash"])
    return result

@router.post("/analyze/intersectional")
<<<<<<< HEAD
def intersectional_analysis(request: IntersectionalRequest):
    result = analyze_intersectional(request.data, request.protected_attributes, request.outcome_variable, request.min_group_size, request.previous_hash)
=======
@limiter.limit("20/minute")
def intersectional_analysis(request: IntersectionalRequest, req: Request):
    result = analyze_intersectional(request.data, request.protected_attributes, request.outcome_variable, request.min_group_size)
>>>>>>> 6613deacf45449267c65d2548cdf527fffefefb1
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    result["signature"] = signing_service.sign_hash(result["audit_hash"])
    return result

@router.post("/analyze/statistical")
@limiter.limit("30/minute")
def statistical_significance(request: BiasAuditRequest, req: Request):
    result = analyze_statistical_significance(request.data, request.protected_attribute, request.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/explain")
@limiter.limit("30/minute")
def decision_explanation(request: ExplainRequest, req: Request):
    return explain_decision(request.model_type, request.input_features, request.decision, request.feature_weights, request.confidence)

@router.post("/analyze/empathy")
@limiter.limit("30/minute")
def empathy_analysis(request: EmpathyRequest, req: Request):
    return analyze_empathy(request.text, request.context)

@router.post("/validate/correction-process")
@limiter.limit("20/minute")
def correction_process_validation(request: CorrectionValidationRequest, req: Request):
    return validate_correction_process(request.has_appeal_mechanism, request.response_time_hours, request.human_reviewer_assigned, request.clear_instructions, request.accessible_format)

@router.post("/correction/submit")
@limiter.limit("10/minute")
def correction_submission(request: CorrectionRequest, req: Request):
    return submit_correction_request(request.decision_id, request.original_decision, request.requested_outcome, request.reason, request.supporting_evidence)

@router.post("/analyze/disclosure")
@limiter.limit("30/minute")
def ai_disclosure_analysis(request: DisclosureRequest, req: Request):
    return analyze_ai_disclosure(request.interface_text, request.interaction_type)

@router.post("/audit/comprehensive")
@limiter.limit("5/minute")
def comprehensive_auditing(request: ComprehensiveAuditRequest, req: Request):
    return comprehensive_audit(request.organization_name, request.ai_systems, request.framework)

@router.post("/assess")
@limiter.limit("30/minute")
def organization_assessment(request: AssessmentRequest, req: Request):
    return assess_organization(request.answers)

@router.post("/assess/tier")
@limiter.limit("30/minute")
def tier_assessment(request: TierAssessmentRequest, req: Request):
    return assess_tier(request.ai_affects_rights, request.special_personal_info, request.human_oversight)

@router.get("/frameworks")
@limiter.limit("60/minute")
def frameworks_listing(req: Request):
    return list_frameworks()


# --- New endpoints ---

@router.post("/analyze/statistical-parity")
@limiter.limit("30/minute")
def spd_analysis(request: SPDRequest, req: Request):
    """Statistical Parity Difference analysis across groups."""
    result = statistical_parity_difference(request.data, request.protected_attribute, request.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/epsilon-fairness")
@limiter.limit("20/minute")
def epsilon_fairness_analysis(request: EpsilonFairnessRequest, req: Request):
    """ε-Differential Fairness for intersectional subgroups."""
    result = epsilon_differential_fairness(
        request.data, request.protected_attributes, request.outcome_variable,
        request.epsilon, request.min_group_size
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/drift")
@limiter.limit("20/minute")
def drift_analysis(request: DriftRequest, req: Request):
    """Distribution drift monitoring (PSI + Jensen-Shannon + KS test)."""
    result = analyze_drift(request.baseline_data, request.current_data, request.feature_name, request.n_bins)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/audit-trail/create")
@limiter.limit("60/minute")
def create_audit_record(request: HashChainCreateRequest, req: Request):
    """Create a chain-linked audit record."""
    return HashChain.create_audit_record(
        request.entry_data, request.previous_hash, request.sequence_number
    )

@router.post("/audit-trail/verify")
@limiter.limit("10/minute")
def verify_audit_chain(request: HashChainVerifyRequest, req: Request):
    """Verify integrity of a hash chain of audit records."""
    return HashChain.verify_chain(request.records)


# --- Explainability endpoints (SHAP / LIME) ---

@router.post("/explain/shap")
@limiter.limit("10/minute")
def shap_explanation(request: ExplainabilityRequest, req: Request):
    """SHAP-based model explanation. Trains a surrogate model on provided data."""
    result = explain_from_data(
        request.data, request.target_column, request.instance,
        method="shap", num_features=request.num_features,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/explain/lime")
@limiter.limit("10/minute")
def lime_explanation(request: ExplainabilityRequest, req: Request):
    """LIME-based local model explanation."""
    result = explain_from_data(
        request.data, request.target_column, request.instance,
        method="lime", num_features=request.num_features,
    )
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


# --- Cryptographic signature endpoints ---

@router.post("/audit-trail/verify-signature")
@limiter.limit("30/minute")
def verify_audit_signature(request: SignatureVerifyRequest, req: Request):
    """Verify the cryptographic signature of an audit record."""
    return verify_signature(request.data, request.signature)

@router.get("/audit-trail/public-key")
@limiter.limit("60/minute")
def get_signing_public_key(req: Request):
    """Retrieve the public key for external signature verification."""
    pem = get_public_key_pem()
    if pem is None:
        raise HTTPException(status_code=503, detail="Signing not available")
    return {"public_key_pem": pem, "algorithm": "RSA-3072 with PSS padding (SHA-256)"}

@router.get("/audit-trail/signing-status")
@limiter.limit("60/minute")
def signing_status(req: Request):
    """Check whether cryptographic signing is available."""
    return {"signing_available": is_signing_available()}


# --- Batch processing endpoint ---

@router.post("/analyze/batch")
@limiter.limit("5/minute")
def batch_analysis(request: BatchAnalysisRequest, req: Request):
    """
    Run multiple analyses in a single request.
    Each item specifies a type and params dict.
    Max 20 analyses per batch.
    """
    ANALYSIS_MAP = {
        "disparate_impact": lambda p: analyze_disparate_impact(
            p["data"], p["protected_attribute"], p["outcome_variable"]
        ),
        "equalized_odds": lambda p: analyze_equalized_odds(
            p["data"], p["protected_attribute"],
            p["actual_outcome"], p["predicted_outcome"],
            p.get("threshold", 0.1),
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
    for i, item in enumerate(request.analyses):
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
            result = ANALYSIS_MAP[analysis_type](params)
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
        "total": len(request.analyses),
        "completed": sum(1 for r in results if "result" in r),
        "failed": sum(1 for r in results if "error" in r),
        "results": results,
    }
