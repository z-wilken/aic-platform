"""
AIC Audit Engine - AI Integrity Certification
Version 2.0.0

Enforcing the 5 Algorithmic Rights:
1. Right to Human Agency - Bias detection, disparate impact analysis
2. Right to Explanation - Decision explainability
3. Right to Empathy - Tone and sentiment analysis
4. Right to Correction - Appeal workflow validation
5. Right to Truth - AI disclosure detection

Supports compliance frameworks:
- POPIA Section 71 (South Africa)
- EU AI Act (European Union)
- EEOC/Title VII (United States)
- IEEE 7000-2021, ISO/IEC 42001, NIST AI RMF
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from enum import Enum
import pandas as pd
import numpy as np
from scipy import stats
from textblob import TextBlob
import hashlib
import uuid
from datetime import datetime
import json
import re

app = FastAPI(
    title="AIC Audit Engine",
    description="AI Integrity Certification - Enforcing the 5 Algorithmic Rights",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (use Redis/Postgres in production)
batch_jobs: Dict[str, Dict] = {}
correction_requests: Dict[str, Dict] = {}


# ==================== ENUMS ====================

class FrameworkType(str, Enum):
    POPIA = "popia"
    EU_AI_ACT = "eu_ai_act"
    EEOC = "eeoc"
    IEEE = "ieee"
    ISO_42001 = "iso_42001"
    NIST_RMF = "nist_rmf"

class TierLevel(str, Enum):
    TIER_1 = "TIER_1"  # Human-Approved (Critical)
    TIER_2 = "TIER_2"  # Human-Supervised (Consequential)
    TIER_3 = "TIER_3"  # Automated (Low-stakes)

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


# ==================== REQUEST MODELS ====================

# RIGHT 1: Human Agency - Bias Detection
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

# RIGHT 2: Explanation
class ExplainRequest(BaseModel):
    model_type: str
    input_features: Dict[str, Any]
    decision: str
    feature_weights: Optional[Dict[str, float]] = None
    confidence: Optional[float] = None

# RIGHT 3: Empathy
class EmpathyRequest(BaseModel):
    text: str
    context: Optional[str] = Field(default="rejection", description="rejection, notification, support")

# RIGHT 4: Correction
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

# RIGHT 5: Truth
class DisclosureRequest(BaseModel):
    interface_text: str
    interaction_type: str = Field(default="chatbot", description="chatbot, email, web, phone")

# Comprehensive Audit
class ComprehensiveAuditRequest(BaseModel):
    organization_name: str
    ai_systems: List[Dict[str, Any]]
    framework: FrameworkType = FrameworkType.POPIA

# Assessment
class AssessmentRequest(BaseModel):
    answers: Dict[str, int]  # question_id -> score

class TierAssessmentRequest(BaseModel):
    ai_affects_rights: int = Field(..., ge=1, le=3)
    special_personal_info: int = Field(..., ge=1, le=3)
    human_oversight: int = Field(..., ge=1, le=3)


# ==================== HELPER FUNCTIONS ====================

def generate_audit_hash(data: Dict) -> str:
    """Generate SHA-256 hash for audit trail integrity"""
    json_str = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(json_str.encode()).hexdigest()

def calculate_confusion_metrics(df: pd.DataFrame, actual: str, predicted: str, group_col: str) -> Dict:
    """Calculate TPR, FPR, PPV for each group"""
    results = {}
    for group in df[group_col].unique():
        group_df = df[df[group_col] == group]
        tp = len(group_df[(group_df[actual] == 1) & (group_df[predicted] == 1)])
        tn = len(group_df[(group_df[actual] == 0) & (group_df[predicted] == 0)])
        fp = len(group_df[(group_df[actual] == 0) & (group_df[predicted] == 1)])
        fn = len(group_df[(group_df[actual] == 1) & (group_df[predicted] == 0)])

        tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
        fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
        ppv = tp / (tp + fp) if (tp + fp) > 0 else 0

        results[str(group)] = {
            "true_positive_rate": round(tpr, 4),
            "false_positive_rate": round(fpr, 4),
            "positive_predictive_value": round(ppv, 4),
            "sample_size": len(group_df),
            "confusion_matrix": {"tp": tp, "tn": tn, "fp": fp, "fn": fn}
        }
    return results


# ==================== HEALTH & INFO ====================

@app.get("/")
def health_check():
    """Health check with capabilities"""
    return {
        "status": "AIC Audit Engine Operational",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "rights_enforced": [
            "Right to Human Agency",
            "Right to Explanation",
            "Right to Empathy",
            "Right to Correction",
            "Right to Truth"
        ],
        "frameworks_supported": [f.value for f in FrameworkType],
        "endpoints": {
            "bias": ["/analyze", "/analyze/equalized-odds", "/analyze/intersectional", "/analyze/statistical"],
            "empathy": ["/analyze/empathy"],
            "explanation": ["/explain"],
            "correction": ["/validate/correction-process"],
            "truth": ["/analyze/disclosure"],
            "comprehensive": ["/audit/comprehensive", "/assess", "/assess/tier"]
        }
    }


# ==================== RIGHT 1: HUMAN AGENCY (Bias Detection) ====================

@app.post("/analyze")
def analyze_disparate_impact(request: BiasAuditRequest):
    """
    Disparate Impact Analysis - Four-Fifths Rule

    RIGHT TO HUMAN AGENCY: No AI should discriminate. This endpoint detects
    if selection rates violate the 80% rule indicating potential bias.

    Used by: EEOC (US), POPIA Section 71 (SA), EU AI Act
    """
    df = pd.DataFrame(request.data)

    if request.protected_attribute not in df.columns:
        raise HTTPException(400, f"Column '{request.protected_attribute}' not found")
    if request.outcome_variable not in df.columns:
        raise HTTPException(400, f"Column '{request.outcome_variable}' not found")

    # Calculate selection rates
    group_stats = df.groupby(request.protected_attribute)[request.outcome_variable].agg(['mean', 'count', 'sum'])
    group_stats.columns = ['selection_rate', 'total', 'selected']

    best_group = group_stats['selection_rate'].idxmax()
    best_rate = group_stats['selection_rate'].max()

    report = {}
    flags = []
    recommendations = []

    for group in group_stats.index:
        rate = group_stats.loc[group, 'selection_rate']
        impact_ratio = rate / best_rate if best_rate > 0 else 0

        if impact_ratio >= 0.8:
            status = BiasStatus.PASS.value
        elif impact_ratio >= 0.7:
            status = BiasStatus.WARNING.value
            flags.append(f"Marginal disparity for {group}: {impact_ratio:.1%} (threshold: 80%)")
        else:
            status = BiasStatus.FAIL.value
            flags.append(f"BIAS DETECTED against {group}: {impact_ratio:.1%} impact ratio")
            recommendations.append(f"Investigate criteria affecting {group} outcomes")

        report[str(group)] = {
            "selection_rate": round(rate, 4),
            "disparate_impact_ratio": round(impact_ratio, 4),
            "status": status,
            "sample_size": int(group_stats.loc[group, 'total']),
            "selected_count": int(group_stats.loc[group, 'selected']),
            "is_reference_group": group == best_group
        }

    overall = "BIASED" if any(r["status"] == "FAIL" for r in report.values()) else \
              "WARNING" if any(r["status"] == "WARNING" for r in report.values()) else "FAIR"

    result = {
        "right_enforced": "Right to Human Agency",
        "overall_status": overall,
        "methodology": "POPIA Section 71 / EEOC Four-Fifths Rule",
        "reference_group": str(best_group),
        "reference_rate": round(best_rate, 4),
        "flags": flags,
        "detailed_analysis": report,
        "recommendations": recommendations or ["No immediate action required. Continue monitoring."],
        "popia_compliance": overall == "FAIR",
        "audit_hash": generate_audit_hash({"report": report, "flags": flags})
    }

    return result


@app.post("/analyze/equalized-odds")
def analyze_equalized_odds(request: EqualizedOddsRequest):
    """
    Equalized Odds Analysis

    Tests if TPR and FPR are equal across groups - ensuring the model
    performs equally well regardless of protected attributes.
    """
    df = pd.DataFrame(request.data)

    for col in [request.protected_attribute, request.actual_outcome, request.predicted_outcome]:
        if col not in df.columns:
            raise HTTPException(400, f"Column '{col}' not found")

    metrics = calculate_confusion_metrics(
        df, request.actual_outcome, request.predicted_outcome, request.protected_attribute
    )

    tprs = [m["true_positive_rate"] for m in metrics.values()]
    fprs = [m["false_positive_rate"] for m in metrics.values()]

    tpr_diff = max(tprs) - min(tprs)
    fpr_diff = max(fprs) - min(fprs)

    tpr_parity = tpr_diff <= request.threshold
    fpr_parity = fpr_diff <= request.threshold

    flags = []
    if not tpr_parity:
        flags.append(f"TPR disparity: {tpr_diff:.3f} exceeds threshold {request.threshold}")
    if not fpr_parity:
        flags.append(f"FPR disparity: {fpr_diff:.3f} exceeds threshold {request.threshold}")

    return {
        "right_enforced": "Right to Human Agency",
        "overall_status": "PASS" if (tpr_parity and fpr_parity) else "FAIL",
        "methodology": "Equalized Odds (TPR & FPR Parity)",
        "tpr_parity": tpr_parity,
        "tpr_difference": round(tpr_diff, 4),
        "fpr_parity": fpr_parity,
        "fpr_difference": round(fpr_diff, 4),
        "threshold": request.threshold,
        "flags": flags,
        "detailed_analysis": metrics,
        "audit_hash": generate_audit_hash(metrics)
    }


@app.post("/analyze/intersectional")
def analyze_intersectional(request: IntersectionalRequest):
    """
    Intersectional Fairness Analysis

    Analyzes bias across combinations of protected attributes
    (e.g., Black women, elderly disabled) where hidden bias often lurks.
    """
    df = pd.DataFrame(request.data)

    for attr in request.protected_attributes:
        if attr not in df.columns:
            raise HTTPException(400, f"Column '{attr}' not found")

    # Create intersectional groups
    df['intersectional_group'] = df[request.protected_attributes].astype(str).agg(' + '.join, axis=1)

    group_stats = df.groupby('intersectional_group').agg({
        request.outcome_variable: ['mean', 'count']
    })
    group_stats.columns = ['selection_rate', 'total']
    group_stats = group_stats[group_stats['total'] >= request.min_group_size]

    if len(group_stats) == 0:
        raise HTTPException(400, f"No groups with minimum size {request.min_group_size}")

    best_rate = group_stats['selection_rate'].max()
    best_group = group_stats['selection_rate'].idxmax()

    results = {}
    flags = []

    for group in group_stats.index:
        rate = group_stats.loc[group, 'selection_rate']
        impact = rate / best_rate if best_rate > 0 else 0
        status = "PASS" if impact >= 0.8 else "FAIL"

        if status == "FAIL":
            flags.append(f"Intersectional bias against '{group}': {impact:.1%}")

        results[group] = {
            "selection_rate": round(rate, 4),
            "disparate_impact": round(impact, 4),
            "status": status,
            "sample_size": int(group_stats.loc[group, 'total'])
        }

    return {
        "right_enforced": "Right to Human Agency",
        "overall_status": "BIASED" if flags else "FAIR",
        "methodology": "Intersectional Fairness Analysis",
        "attributes_analyzed": request.protected_attributes,
        "groups_analyzed": len(results),
        "reference_group": best_group,
        "flags": flags,
        "detailed_analysis": results,
        "audit_hash": generate_audit_hash(results)
    }


@app.post("/analyze/statistical")
def analyze_statistical_significance(request: BiasAuditRequest):
    """
    Statistical Significance Testing

    Chi-square test to determine if differences are statistically
    significant or could be random chance.
    """
    df = pd.DataFrame(request.data)

    contingency = pd.crosstab(df[request.protected_attribute], df[request.outcome_variable])
    chi2, p_value, dof, expected = stats.chi2_contingency(contingency)

    is_significant = p_value < 0.05
    n = len(df)
    min_dim = min(contingency.shape) - 1
    cramers_v = np.sqrt(chi2 / (n * min_dim)) if min_dim > 0 else 0

    effect = "negligible" if cramers_v < 0.1 else \
             "small" if cramers_v < 0.3 else \
             "medium" if cramers_v < 0.5 else "large"

    return {
        "right_enforced": "Right to Human Agency",
        "overall_status": "SIGNIFICANT_BIAS" if is_significant else "NOT_SIGNIFICANT",
        "methodology": "Chi-Square Test for Independence",
        "chi_square": round(chi2, 4),
        "p_value": round(p_value, 6),
        "is_significant": is_significant,
        "effect_size": {"cramers_v": round(cramers_v, 4), "interpretation": effect},
        "recommendation": "Differences are statistically significant - investigate root causes" if is_significant else "Differences may be random variation",
        "audit_hash": generate_audit_hash({"chi2": chi2, "p": p_value})
    }


# ==================== RIGHT 2: EXPLANATION ====================

@app.post("/explain")
def explain_decision(request: ExplainRequest):
    """
    Generate Human-Readable Explanation

    RIGHT TO EXPLANATION: Every person has the right to know WHY an
    algorithmic decision was made. "Black box" is not a defense.

    Required by: POPIA Section 71, GDPR Article 22
    """
    model_descriptions = {
        "credit_scoring": "a credit scoring model that evaluates loan applications",
        "fraud_detection": "a fraud detection system that flags suspicious transactions",
        "hiring": "an applicant screening tool that evaluates job candidates",
        "insurance": "an insurance risk assessment model",
        "healthcare": "a healthcare decision support system",
        "recommendation": "a recommendation engine that suggests products or content"
    }

    model_desc = model_descriptions.get(request.model_type, "an automated decision-making system")

    explanation_parts = [
        f"## Decision Explanation",
        f"",
        f"**System:** This decision was made by {model_desc}.",
        f"**Outcome:** {request.decision}",
    ]

    if request.confidence:
        explanation_parts.append(f"**Confidence:** {request.confidence:.1%}")

    # Feature importance
    if request.feature_weights:
        explanation_parts.append("")
        explanation_parts.append("### Key Factors")
        sorted_features = sorted(request.feature_weights.items(), key=lambda x: abs(x[1]), reverse=True)[:5]
        for feature, weight in sorted_features:
            direction = "increased" if weight > 0 else "decreased"
            explanation_parts.append(f"- **{feature}**: {direction} the likelihood ({abs(weight):.2f} importance)")

    # Input summary
    explanation_parts.append("")
    explanation_parts.append("### Information Used")
    for feature, value in request.input_features.items():
        explanation_parts.append(f"- {feature}: {value}")

    # Rights notice
    explanation_parts.extend([
        "",
        "---",
        "### Your Rights Under POPIA Section 71",
        "1. **Request Human Review:** You may request that a human reviews this automated decision",
        "2. **Make Representations:** You may submit reasons why this decision should be reconsidered",
        "3. **Request Logic Explanation:** You may request further details about how this decision was made",
        "",
        "To exercise these rights, contact the organization's data protection officer."
    ])

    return {
        "right_enforced": "Right to Explanation",
        "explanation": "\n".join(explanation_parts),
        "model_type": request.model_type,
        "decision": request.decision,
        "explainability_score": 100 if request.feature_weights else 60,
        "popia_compliant": True,
        "timestamp": datetime.utcnow().isoformat(),
        "audit_hash": generate_audit_hash({"decision": request.decision, "features": request.input_features})
    }


# ==================== RIGHT 3: EMPATHY ====================

@app.post("/analyze/empathy")
def analyze_empathy(request: EmpathyRequest):
    """
    Empathy Analysis - Tone Detection

    RIGHT TO EMPATHY: Automated interactions must preserve human dignity.
    Cruelty, dismissal, and cold bureaucratic rejection are design failures.

    Analyzes rejection letters, chatbot responses, and automated communications.
    """
    blob = TextBlob(request.text)

    # Sentiment analysis (-1 to 1)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity

    # Convert to 0-100 scale
    empathy_score = (polarity + 1) * 50

    # Check for hostile language patterns
    hostile_patterns = [
        r'\bdenied\b', r'\brejected\b', r'\bfailed\b', r'\bunfortunately\b',
        r'\bcannot\b', r'\bwill not\b', r'\bunable\b', r'\bineligible\b'
    ]

    empathetic_patterns = [
        r'\bunderstand\b', r'\bappreciate\b', r'\bthank you\b', r'\bsorry\b',
        r'\bhelp\b', r'\bsupport\b', r'\boptions\b', r'\balternative\b'
    ]

    text_lower = request.text.lower()
    hostile_count = sum(1 for p in hostile_patterns if re.search(p, text_lower))
    empathetic_count = sum(1 for p in empathetic_patterns if re.search(p, text_lower))

    # Adjust score based on patterns
    pattern_adjustment = (empathetic_count - hostile_count) * 5
    empathy_score = max(0, min(100, empathy_score + pattern_adjustment))

    # Determine level
    if empathy_score < 30:
        level = EmpathyLevel.HOSTILE.value
        status = "FAIL"
        recommendation = "URGENT: Rewrite required. Tone is hostile and may cause distress."
    elif empathy_score < 45:
        level = EmpathyLevel.COLD.value
        status = "FAIL"
        recommendation = "Tone is cold and bureaucratic. Add acknowledgment and options."
    elif empathy_score < 60:
        level = EmpathyLevel.NEUTRAL.value
        status = "WARNING"
        recommendation = "Tone is neutral but could be warmer. Consider adding supportive language."
    elif empathy_score < 75:
        level = EmpathyLevel.WARM.value
        status = "PASS"
        recommendation = "Good empathetic tone. Minor improvements possible."
    else:
        level = EmpathyLevel.EMPATHETIC.value
        status = "PASS"
        recommendation = "Excellent empathetic communication."

    # Specific feedback for rejections
    feedback = []
    if request.context == "rejection":
        if not re.search(r'\balternative|option|next step\b', text_lower):
            feedback.append("Missing: Provide alternative options or next steps")
        if not re.search(r'\bappeal|review|reconsider\b', text_lower):
            feedback.append("Missing: Mention appeal or review process")
        if not re.search(r'\bthank|appreciate\b', text_lower):
            feedback.append("Missing: Acknowledge the person's effort or situation")

    return {
        "right_enforced": "Right to Empathy",
        "empathy_score": round(empathy_score, 2),
        "empathy_level": level,
        "status": status,
        "sentiment": {
            "polarity": round(polarity, 3),
            "subjectivity": round(subjectivity, 3)
        },
        "pattern_analysis": {
            "hostile_indicators": hostile_count,
            "empathetic_indicators": empathetic_count
        },
        "recommendation": recommendation,
        "specific_feedback": feedback,
        "popia_compliant": status != "FAIL",
        "audit_hash": generate_audit_hash({"score": empathy_score, "text_hash": hashlib.md5(request.text.encode()).hexdigest()})
    }


# ==================== RIGHT 4: CORRECTION ====================

@app.post("/validate/correction-process")
def validate_correction_process(request: CorrectionValidationRequest):
    """
    Correction Process Validation

    RIGHT TO CORRECTION: Every system must provide a clear, accessible,
    and human-staffed mechanism to correct errors and appeal decisions.

    Validates if an organization's appeal mechanism meets requirements.
    """
    score = 0
    max_score = 100
    issues = []
    recommendations = []

    # Has appeal mechanism (30 points)
    if request.has_appeal_mechanism:
        score += 30
    else:
        issues.append("CRITICAL: No appeal mechanism exists")
        recommendations.append("Implement formal appeal process with human review")

    # Response time (25 points)
    if request.response_time_hours <= 24:
        score += 25
    elif request.response_time_hours <= 72:
        score += 15
        issues.append(f"Response time ({request.response_time_hours}h) exceeds 24h best practice")
    elif request.response_time_hours <= 168:
        score += 5
        issues.append(f"Response time ({request.response_time_hours}h) is slow")
    else:
        issues.append(f"CRITICAL: Response time ({request.response_time_hours}h) is unacceptable")
        recommendations.append("Reduce appeal response time to under 72 hours")

    # Human reviewer (25 points)
    if request.human_reviewer_assigned:
        score += 25
    else:
        issues.append("No dedicated human reviewer for appeals")
        recommendations.append("Assign trained staff to review appeals")

    # Clear instructions (10 points)
    if request.clear_instructions:
        score += 10
    else:
        issues.append("Appeal instructions not clear")
        recommendations.append("Provide step-by-step appeal instructions")

    # Accessible format (10 points)
    if request.accessible_format:
        score += 10
    else:
        issues.append("Appeal process not accessible")
        recommendations.append("Ensure multiple channels (web, phone, email, in-person)")

    status = "COMPLIANT" if score >= 80 else "PARTIAL" if score >= 50 else "NON_COMPLIANT"

    return {
        "right_enforced": "Right to Correction",
        "compliance_score": score,
        "max_score": max_score,
        "status": status,
        "popia_compliant": score >= 70,
        "issues": issues,
        "recommendations": recommendations or ["Correction process meets requirements"],
        "tier_requirement": {
            "TIER_1": "100% appeals must have human review within 24h",
            "TIER_2": "Appeals reviewed within 72h",
            "TIER_3": "Appeal mechanism with response within 7 days"
        },
        "audit_hash": generate_audit_hash({"score": score, "issues": issues})
    }


@app.post("/correction/submit")
def submit_correction_request(request: CorrectionRequest):
    """Submit a correction/appeal request for tracking"""
    request_id = str(uuid.uuid4())

    correction_requests[request_id] = {
        "id": request_id,
        "decision_id": request.decision_id,
        "original_decision": request.original_decision,
        "requested_outcome": request.requested_outcome,
        "reason": request.reason,
        "evidence": request.supporting_evidence,
        "status": "SUBMITTED",
        "submitted_at": datetime.utcnow().isoformat(),
        "reviewed_at": None,
        "reviewer": None,
        "outcome": None
    }

    return {
        "right_enforced": "Right to Correction",
        "request_id": request_id,
        "status": "SUBMITTED",
        "message": "Your appeal has been submitted and will be reviewed by a human within the required timeframe.",
        "next_steps": [
            "You will receive confirmation within 24 hours",
            "A human reviewer will assess your appeal",
            "You may be contacted for additional information"
        ]
    }


# ==================== RIGHT 5: TRUTH ====================

@app.post("/analyze/disclosure")
def analyze_ai_disclosure(request: DisclosureRequest):
    """
    AI Disclosure Analysis

    RIGHT TO TRUTH: A person has the right to know if they are interacting
    with an artificial intelligence. Deception is a violation of trust.

    Analyzes interface text to check for proper AI disclosure.
    """
    text_lower = request.interface_text.lower()

    # Disclosure patterns
    explicit_disclosures = [
        r'\bai\b', r'\bartificial intelligence\b', r'\bautomated\b',
        r'\bbot\b', r'\bchatbot\b', r'\bvirtual assistant\b',
        r'\bmachine learning\b', r'\balgorithm\b', r'\bautomated system\b'
    ]

    clear_disclosures = [
        r'\bthis is an ai\b', r'\bi am an ai\b', r'\bpowered by ai\b',
        r'\bautomated response\b', r'\bai-generated\b', r'\bai assistant\b',
        r'\byou are chatting with\b.*\bbot\b'
    ]

    deceptive_patterns = [
        r'\bi am a human\b', r'\breal person\b', r'\bmy name is\b',
        r'\bi personally\b', r'\bspeaking from experience\b'
    ]

    has_explicit = any(re.search(p, text_lower) for p in explicit_disclosures)
    has_clear = any(re.search(p, text_lower) for p in clear_disclosures)
    has_deceptive = any(re.search(p, text_lower) for p in deceptive_patterns)

    # Calculate score
    if has_deceptive:
        score = 0
        status = "DECEPTIVE"
        level = "CRITICAL VIOLATION"
    elif has_clear:
        score = 100
        status = "FULLY_DISCLOSED"
        level = "COMPLIANT"
    elif has_explicit:
        score = 70
        status = "PARTIALLY_DISCLOSED"
        level = "ACCEPTABLE"
    else:
        score = 30
        status = "NOT_DISCLOSED"
        level = "NON_COMPLIANT"

    # Recommendations by interaction type
    recommendations = {
        "chatbot": "Add prominent disclosure: 'You are chatting with an AI assistant'",
        "email": "Include header: 'This email was generated by an automated system'",
        "web": "Display AI badge/icon near AI-generated content",
        "phone": "Begin with: 'This is an automated AI assistant'"
    }

    return {
        "right_enforced": "Right to Truth",
        "disclosure_score": score,
        "status": status,
        "compliance_level": level,
        "findings": {
            "explicit_ai_mention": has_explicit,
            "clear_disclosure": has_clear,
            "potentially_deceptive": has_deceptive
        },
        "recommendation": recommendations.get(request.interaction_type, "Add clear AI disclosure"),
        "popia_compliant": score >= 70,
        "eu_ai_act_compliant": score >= 70,
        "best_practices": [
            "Disclose AI involvement at first interaction",
            "Use clear, non-technical language",
            "Provide option to speak with human",
            "Never simulate human identity"
        ],
        "audit_hash": generate_audit_hash({"score": score, "status": status})
    }


# ==================== COMPREHENSIVE AUDIT ====================

@app.post("/audit/comprehensive")
def comprehensive_audit(request: ComprehensiveAuditRequest):
    """
    Comprehensive Rights Audit

    Evaluates an organization across all 5 Algorithmic Rights
    and generates a unified compliance report.
    """
    results = {
        "organization": request.organization_name,
        "framework": request.framework.value,
        "timestamp": datetime.utcnow().isoformat(),
        "systems_audited": len(request.ai_systems),
        "rights_assessment": {},
        "overall_score": 0,
        "recommendations": []
    }

    # Placeholder scores (in production, would run full audits)
    rights_scores = {
        "human_agency": {"score": 75, "status": "PARTIAL"},
        "explanation": {"score": 60, "status": "NEEDS_IMPROVEMENT"},
        "empathy": {"score": 80, "status": "GOOD"},
        "correction": {"score": 70, "status": "PARTIAL"},
        "truth": {"score": 90, "status": "EXCELLENT"}
    }

    results["rights_assessment"] = rights_scores
    results["overall_score"] = sum(r["score"] for r in rights_scores.values()) / len(rights_scores)

    # Tier recommendation
    if results["overall_score"] >= 85:
        results["recommended_tier"] = "TIER_3"
        results["certification_ready"] = True
    elif results["overall_score"] >= 70:
        results["recommended_tier"] = "TIER_2"
        results["certification_ready"] = True
    else:
        results["recommended_tier"] = "TIER_1"
        results["certification_ready"] = False
        results["recommendations"].append("Additional remediation required before certification")

    # Framework-specific notes
    framework_notes = {
        FrameworkType.POPIA: "POPIA Section 71 requires human oversight for automated decisions",
        FrameworkType.EU_AI_ACT: "High-risk systems require conformity assessment",
        FrameworkType.EEOC: "Employment decisions subject to Four-Fifths Rule"
    }
    results["framework_note"] = framework_notes.get(request.framework, "")

    results["audit_hash"] = generate_audit_hash(results)

    return results


@app.post("/assess")
def assess_organization(request: AssessmentRequest):
    """
    Self-Assessment Scoring

    Processes assessment questionnaire answers and calculates
    Integrity Score and Tier Recommendation.
    """
    # Category weights from PRD
    weights = {
        "USAGE": 0.20,
        "OVERSIGHT": 0.35,
        "TRANSPARENCY": 0.25,
        "INFRASTRUCTURE": 0.20
    }

    # Calculate weighted score (simplified)
    total_score = sum(request.answers.values())
    max_possible = len(request.answers) * 4  # Assuming max 4 per question

    integrity_score = (total_score / max_possible) * 100 if max_possible > 0 else 0

    # Tier determination
    if integrity_score >= 80:
        tier = TierLevel.TIER_3
        tier_desc = "Automated (Low-stakes)"
    elif integrity_score >= 50:
        tier = TierLevel.TIER_2
        tier_desc = "Human-Supervised"
    else:
        tier = TierLevel.TIER_1
        tier_desc = "Human-Approved (Critical)"

    return {
        "integrity_score": round(integrity_score, 1),
        "recommended_tier": tier.value,
        "tier_description": tier_desc,
        "questions_answered": len(request.answers),
        "next_steps": [
            "Schedule consultation with AIC advisor",
            "Prepare documentation for audit",
            "Review tier-specific requirements"
        ]
    }


@app.post("/assess/tier")
def assess_tier(request: TierAssessmentRequest):
    """Quick tier assessment based on key criteria"""
    score = request.ai_affects_rights + request.special_personal_info + request.human_oversight

    if score >= 7:
        tier = TierLevel.TIER_1
        desc = "Critical - Human approval required for all decisions"
        requirements = [
            "100% human review of AI decisions",
            "Quarterly independent audits",
            "24-hour incident reporting",
            "Board-level AI governance"
        ]
    elif score >= 4:
        tier = TierLevel.TIER_2
        desc = "Elevated - Human supervision with override capability"
        requirements = [
            "Human override mechanism",
            "Annual independent audit",
            "72-hour incident reporting",
            "Designated compliance officer"
        ]
    else:
        tier = TierLevel.TIER_3
        desc = "Standard - Automated with monitoring"
        requirements = [
            "Clear AI disclosure",
            "Periodic self-assessment",
            "Incident logging",
            "Basic monitoring"
        ]

    return {
        "score": score,
        "tier": tier.value,
        "description": desc,
        "requirements": requirements,
        "pricing_estimate": {
            "TIER_1": "R50,000/month",
            "TIER_2": "R15,000/month",
            "TIER_3": "R5,000/month"
        }[tier.value]
    }


# ==================== FRAMEWORKS ====================

@app.get("/frameworks")
def list_frameworks():
    """List all supported compliance frameworks"""
    return {
        "frameworks": [
            {
                "id": "popia",
                "name": "POPIA Section 71",
                "jurisdiction": "South Africa",
                "description": "Protection of Personal Information Act - Automated Decision Making",
                "key_requirements": ["Human oversight", "Right to representation", "Decision explanation"]
            },
            {
                "id": "eu_ai_act",
                "name": "EU AI Act",
                "jurisdiction": "European Union",
                "description": "Risk-based AI regulation",
                "key_requirements": ["Risk classification", "Conformity assessment", "Human oversight"]
            },
            {
                "id": "eeoc",
                "name": "EEOC Guidelines",
                "jurisdiction": "United States",
                "description": "Title VII - Employment discrimination",
                "key_requirements": ["Four-fifths rule", "Adverse impact analysis", "Validation studies"]
            },
            {
                "id": "ieee",
                "name": "IEEE 7000-2021",
                "jurisdiction": "International",
                "description": "Ethical system design standard",
                "key_requirements": ["Value-based engineering", "Transparency", "Accountability"]
            },
            {
                "id": "iso_42001",
                "name": "ISO/IEC 42001",
                "jurisdiction": "International",
                "description": "AI management system standard",
                "key_requirements": ["AI policy", "Risk assessment", "Performance evaluation"]
            },
            {
                "id": "nist_rmf",
                "name": "NIST AI RMF",
                "jurisdiction": "United States",
                "description": "AI Risk Management Framework",
                "key_requirements": ["Govern", "Map", "Measure", "Manage"]
            }
        ]
    }


# ==================== MAIN ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
