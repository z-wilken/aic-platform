from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from enum import Enum

class FrameworkType(str, Enum):
    POPIA = "popia"
    EU_AI_ACT = "eu_ai_act"
    EEOC = "eeoc"
    IEEE = "ieee"
    ISO_42001 = "iso_42001"
    NIST_RMF = "nist_rmf"

class TierLevel(str, Enum):
    TIER_1 = "TIER_1"
    TIER_2 = "TIER_2"
    TIER_3 = "TIER_3"

class BiasStatus(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    WARNING = "WARNING"

class EmpathyLevel(str, Enum):
    HOSTILE = "HOSTILE"
    COLD = "COLD"
    NEUTRAL = "NEUTRAL"
    WARM = "WARM"
    EMPATHETIC = "EMPATHETIC"

class BiasAuditRequest(BaseModel):
    data: List[Dict]
    protected_attribute: str
    outcome_variable: str

class EqualizedOddsRequest(BaseModel):
    data: List[Dict]
    protected_attribute: str
    actual_outcome: str
    predicted_outcome: str
    threshold: float = Field(default=0.1)

class IntersectionalRequest(BaseModel):
    data: List[Dict]
    protected_attributes: List[str]
    outcome_variable: str
    min_group_size: int = Field(default=30)

class ExplainRequest(BaseModel):
    model_type: str
    input_features: Dict[str, Any]
    decision: str
    feature_weights: Optional[Dict[str, float]] = None
    confidence: Optional[float] = None

class EmpathyRequest(BaseModel):
    text: str
    context: Optional[str] = Field(default="rejection", description="rejection, notification, support")

class CorrectionRequest(BaseModel):
    decision_id: str
    original_decision: str
    requested_outcome: str
    reason: str
    supporting_evidence: Optional[Dict[str, Any]] = None

class CorrectionValidationRequest(BaseModel):
    has_appeal_mechanism: bool
    response_time_hours: int
    human_reviewer_assigned: bool
    clear_instructions: bool
    accessible_format: bool

class DisclosureRequest(BaseModel):
    interface_text: str
    interaction_type: str = Field(default="chatbot", description="chatbot, email, web, phone")

class ComprehensiveAuditRequest(BaseModel):
    organization_name: str
    ai_systems: List[Dict[str, Any]]
    framework: FrameworkType = FrameworkType.POPIA

class AssessmentRequest(BaseModel):
    answers: Dict[str, int]

class TierAssessmentRequest(BaseModel):
    ai_affects_rights: int = Field(..., ge=1, le=3)
    special_personal_info: int = Field(..., ge=1, le=3)
    human_oversight: int = Field(..., ge=1, le=3)
