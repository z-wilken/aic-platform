from fastapi import APIRouter, HTTPException
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
    comprehensive_audit, assess_organization, assess_tier, list_frameworks
)
from app.services.scoring import calculate_integrity_score
from app.services.privacy_audit import audit_privacy
from app.services.labor_audit import audit_labor
from app.services.evidence_scanner import scan_evidence
from app.services.red_team import red_team_audit
from app.services.chain_verification import verify_hash_chain
from app.services.drift_monitoring import get_psi_drift
from pydantic import BaseModel

router = APIRouter()

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

class VerifyChainRequest(BaseModel):
    entries: List[Dict[str, Any]]

class DriftRequest(BaseModel):
    expected_data: List[float]
    actual_data: List[float]

@router.post("/analyze/drift/psi")
def get_psi_analysis(request: DriftRequest):
    return get_psi_drift(request.expected_data, request.actual_data)

@router.post("/audit/privacy")
def get_privacy_audit(request: PrivacyRequest):
    return audit_privacy(request.columns)

@router.post("/audit/labor")
def get_labor_audit(request: LaborRequest):
    return audit_labor(request.total_decisions, request.human_interventions, request.human_overrides)

@router.post("/audit/verify-document")
def get_evidence_verification(request: EvidenceRequest):
    return scan_evidence(request.text)

@router.post("/audit/red-team")
def get_red_team_audit(request: RedTeamRequest):
    return red_team_audit(request.data, request.protected_attribute, request.other_columns)

@router.post("/audit-trail/verify")
def get_chain_verification(request: VerifyChainRequest):
    return verify_hash_chain(request.entries)

@router.post("/integrity/calculate", response_model=IntegrityScoreResponse)
def get_integrity_score(request: IntegrityScoreRequest):
    return calculate_integrity_score(request)

@router.post("/analyze")
def disparate_impact(request: BiasAuditRequest):
    result = analyze_disparate_impact(request.data, request.protected_attribute, request.outcome_variable, request.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/equalized-odds")
def equalized_odds(request: EqualizedOddsRequest):
    result = analyze_equalized_odds(request.data, request.protected_attribute, request.actual_outcome, request.predicted_outcome, request.threshold, request.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/intersectional")
def intersectional_analysis(request: IntersectionalRequest):
    result = analyze_intersectional(request.data, request.protected_attributes, request.outcome_variable, request.min_group_size, request.previous_hash)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/statistical")
def statistical_significance(request: BiasAuditRequest):
    result = analyze_statistical_significance(request.data, request.protected_attribute, request.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/explain")
def decision_explanation(request: ExplainRequest):
    return explain_decision(request.model_type, request.input_features, request.decision, request.feature_weights, request.confidence)

@router.post("/analyze/empathy")
def empathy_analysis(request: EmpathyRequest):
    return analyze_empathy(request.text, request.context)

@router.post("/validate/correction-process")
def correction_process_validation(request: CorrectionValidationRequest):
    return validate_correction_process(request.has_appeal_mechanism, request.response_time_hours, request.human_reviewer_assigned, request.clear_instructions, request.accessible_format)

@router.post("/correction/submit")
def correction_submission(request: CorrectionRequest):
    return submit_correction_request(request.decision_id, request.original_decision, request.requested_outcome, request.reason, request.supporting_evidence)

@router.post("/analyze/disclosure")
def ai_disclosure_analysis(request: DisclosureRequest):
    return analyze_ai_disclosure(request.interface_text, request.interaction_type)

@router.post("/audit/comprehensive")
def comprehensive_auditing(request: ComprehensiveAuditRequest):
    return comprehensive_audit(request.organization_name, request.ai_systems, request.framework)

@router.post("/assess")
def organization_assessment(request: AssessmentRequest):
    return assess_organization(request.answers)

@router.post("/assess/tier")
def tier_assessment(request: TierAssessmentRequest):
    return assess_tier(request.ai_affects_rights, request.special_personal_info, request.human_oversight)

@router.get("/frameworks")
def frameworks_listing():
    return list_frameworks()
