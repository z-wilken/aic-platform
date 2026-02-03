from fastapi import APIRouter, HTTPException
from app.api.v1.schemas.analysis import (
    BiasAuditRequest, EqualizedOddsRequest, IntersectionalRequest, ExplainRequest,
    EmpathyRequest, CorrectionValidationRequest, CorrectionRequest, DisclosureRequest,
    ComprehensiveAuditRequest, AssessmentRequest, TierAssessmentRequest
)
from app.services.bias_analysis import (
    analyze_disparate_impact, analyze_equalized_odds, analyze_intersectional,
    analyze_statistical_significance, explain_decision, analyze_empathy,
    validate_correction_process, submit_correction_request, analyze_ai_disclosure,
    comprehensive_audit, assess_organization, assess_tier, list_frameworks
)

router = APIRouter()

@router.post("/analyze")
def disparate_impact(request: BiasAuditRequest):
    result = analyze_disparate_impact(request.data, request.protected_attribute, request.outcome_variable)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/equalized-odds")
def equalized_odds(request: EqualizedOddsRequest):
    result = analyze_equalized_odds(request.data, request.protected_attribute, request.actual_outcome, request.predicted_outcome, request.threshold)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/analyze/intersectional")
def intersectional_analysis(request: IntersectionalRequest):
    result = analyze_intersectional(request.data, request.protected_attributes, request.outcome_variable, request.min_group_size)
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
