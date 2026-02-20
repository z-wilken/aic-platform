from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from enum import Enum
from datetime import datetime

class BiasStatus(str, Enum):
    PASS = "PASS"  # nosec
    WARNING = "WARNING"
    FAIL = "FAIL"

class TierLevel(str, Enum):
    TIER_1 = "TIER_1"
    TIER_2 = "TIER_2"
    TIER_3 = "TIER_3"

class FrameworkType(str, Enum):
    POPIA = "popia"
    EU_AI_ACT = "eu_ai_act"
    EEOC = "eeoc"
    IEEE = "ieee"
    ISO_42001 = "iso_42001"
    NIST_RMF = "nist_rmf"

class SystemType(str, Enum):
    HIRING = "hiring"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    INSURANCE = "insurance"
    GOVERNMENT = "government"
    RETAIL = "retail"

class ScoringCategory(BaseModel):
    score: float = Field(..., ge=0, le=4)
    weight: float
    evidence_count: int
    findings: List[str] = []

class IntegrityScoreRequest(BaseModel):
    org_id: str
    system_id: str
    system_type: SystemType
    categories: Dict[str, ScoringCategory]
    open_incidents: int = 0

class IntegrityScoreResponse(BaseModel):
    score: int
    tier: TierLevel
    status: str
    breakdown: Dict[str, float]
    penalty_applied: int
    recommendations: List[str]
    audit_hash: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class UseCaseThresholds(BaseModel):
    min_selection_rate: float = 0.8
    max_false_positive_disparity: float = 0.1
    required_human_review_percentage: float = 1.0
