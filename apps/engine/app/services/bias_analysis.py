import pandas as pd
import numpy as np
from scipy import stats
import hashlib
import json
from typing import List, Dict, Any
from textblob import TextBlob
import re
import uuid
from datetime import datetime
from app.api.v1.schemas.analysis import BiasStatus, EmpathyLevel, TierLevel, FrameworkType

def generate_audit_hash(data: Dict, previous_hash: str = None) -> str:
    """Generate SHA-256 hash for audit trail integrity, linked to previous entry"""
    payload = {"data": data}
    if previous_hash:
        payload["previous_hash"] = previous_hash
    
    json_str = json.dumps(payload, sort_keys=True, default=str)
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

def analyze_disparate_impact(data: List[Dict], protected_attribute: str, outcome_variable: str, previous_hash: str = None):
    df = pd.DataFrame(data)

    if protected_attribute not in df.columns:
        return {"error": f"Column '{protected_attribute}' not found"}
    if outcome_variable not in df.columns:
        return {"error": f"Column '{outcome_variable}' not found"}

    # Calculate selection rates
    group_stats = df.groupby(protected_attribute)[outcome_variable].agg(['mean', 'count', 'sum'])
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

    # Enhanced Remediation Recommendations — find the worst-case group
    worst_group = min(report, key=lambda g: report[g]["disparate_impact_ratio"])
    worst_ratio = report[worst_group]["disparate_impact_ratio"]
    if worst_ratio < 0.8:
        recommendations.append(f"REMEDIATION: Investigate criteria affecting {worst_group} outcomes. Current impact ratio ({worst_ratio:.2f}) is below 0.8 threshold.")
        recommendations.append("ACTION: Conduct qualitative review of training data feature distributions for proxy variables.")
    if best_rate > 0.9:
        recommendations.append("ADVISORY: Reference group selection rate is unusually high (>90%). Review for potential data leakage or overfitting.")

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
        "previous_hash": previous_hash,
        "audit_hash": generate_audit_hash({"report": report, "flags": flags}, previous_hash)
    }

    return result

def analyze_equalized_odds(data: List[Dict], protected_attribute: str, actual_outcome: str, predicted_outcome: str, threshold: float, previous_hash: str = None):
    df = pd.DataFrame(data)

    for col in [protected_attribute, actual_outcome, predicted_outcome]:
        if col not in df.columns:
            return {"error": f"Column '{col}' not found"}

    metrics = calculate_confusion_metrics(
        df, actual_outcome, predicted_outcome, protected_attribute
    )

    tprs = [m["true_positive_rate"] for m in metrics.values()]
    fprs = [m["false_positive_rate"] for m in metrics.values()]

    tpr_diff = max(tprs) - min(tprs)
    fpr_diff = max(fprs) - min(fprs)

    tpr_parity = tpr_diff <= threshold
    fpr_parity = fpr_diff <= threshold

    flags = []
    if not tpr_parity:
        flags.append(f"TPR disparity: {tpr_diff:.3f} exceeds threshold {threshold}")
    if not fpr_parity:
        flags.append(f"FPR disparity: {fpr_diff:.3f} exceeds threshold {threshold}")

    return {
        "right_enforced": "Right to Human Agency",
        "overall_status": "PASS" if (tpr_parity and fpr_parity) else "FAIL",
        "methodology": "Equalized Odds (TPR & FPR Parity)",
        "tpr_parity": tpr_parity,
        "tpr_difference": round(tpr_diff, 4),
        "fpr_parity": fpr_parity,
        "fpr_difference": round(fpr_diff, 4),
        "threshold": threshold,
        "flags": flags,
        "detailed_analysis": metrics,
        "previous_hash": previous_hash,
        "audit_hash": generate_audit_hash(metrics, previous_hash)
    }

def analyze_intersectional(data: List[Dict], protected_attributes: List[str], outcome_variable: str, min_group_size: int, previous_hash: str = None):
    df = pd.DataFrame(data)

    for attr in protected_attributes:
        if attr not in df.columns:
            return {"error": f"Column '{attr}' not found"}

    # Create intersectional groups
    df['intersectional_group'] = df[protected_attributes].astype(str).agg(' + '.join, axis=1)

    group_stats = df.groupby('intersectional_group').agg({
        outcome_variable: ['mean', 'count']
    })
    group_stats.columns = ['selection_rate', 'total']
    group_stats = group_stats[group_stats['total'] >= min_group_size]

    if len(group_stats) == 0:
        return {"error": f"No groups with minimum size {min_group_size}"}

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
        "attributes_analyzed": protected_attributes,
        "groups_analyzed": len(results),
        "reference_group": best_group,
        "flags": flags,
        "detailed_analysis": results,
        "previous_hash": previous_hash,
        "audit_hash": generate_audit_hash(results, previous_hash)
    }

def analyze_statistical_significance(data: List[Dict], protected_attribute: str, outcome_variable: str):
    df = pd.DataFrame(data)

    contingency = pd.crosstab(df[protected_attribute], df[outcome_variable])
    chi2_raw, p_raw, dof, expected = stats.chi2_contingency(contingency)
    chi2 = float(chi2_raw)
    p_value = float(p_raw)

    is_significant = bool(p_value < 0.05)
    n = len(df)
    min_dim = min(contingency.shape) - 1
    cramers_v = float(np.sqrt(chi2 / (n * min_dim))) if min_dim > 0 else 0.0

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

def explain_decision(model_type: str, input_features: Dict[str, Any], decision: str, feature_weights: Dict[str, float] = None, confidence: float = None):
    model_descriptions = {
        "credit_scoring": "a credit scoring model that evaluates loan applications",
        "fraud_detection": "a fraud detection system that flags suspicious transactions",
        "hiring": "an applicant screening tool that evaluates job candidates",
        "insurance": "an_insurance risk assessment model",
        "healthcare": "a healthcare decision support system",
        "recommendation": "a recommendation engine that suggests products or content"
    }

    model_desc = model_descriptions.get(model_type, "an automated decision-making system")

    explanation_parts = [
        f"## Decision Explanation",
        f"",
        f"**System:** This decision was made by {model_desc}.",
        f"**Outcome:** {decision}",
    ]

    if confidence:
        explanation_parts.append(f"**Confidence:** {confidence:.1%}")

    # Feature importance
    if feature_weights:
        explanation_parts.append("")
        explanation_parts.append("### Key Factors")
        sorted_features = sorted(feature_weights.items(), key=lambda x: abs(x[1]), reverse=True)[:5]
        for feature, weight in sorted_features:
            direction = "increased" if weight > 0 else "decreased"
            explanation_parts.append(f"- **{feature}**: {direction} the likelihood ({abs(weight):.2f} importance)")

    # Input summary
    explanation_parts.append("")
    explanation_parts.append("### Information Used")
    for feature, value in input_features.items():
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
        "model_type": model_type,
        "decision": decision,
        "explainability_score": 100 if feature_weights else 60,
        "popia_compliant": True,
        "timestamp": datetime.utcnow().isoformat(),
        "audit_hash": generate_audit_hash({"decision": decision, "features": input_features})
    }

def analyze_empathy(text: str, context: str):
    blob = TextBlob(text)

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

    text_lower = text.lower()
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
    if context == "rejection":
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
        "audit_hash": generate_audit_hash({"score": empathy_score, "text_hash": hashlib.md5(text.encode()).hexdigest()})
    }

def validate_correction_process(has_appeal_mechanism: bool, response_time_hours: int, human_reviewer_assigned: bool, clear_instructions: bool, accessible_format: bool):
    score = 0
    max_score = 100
    issues = []
    recommendations = []

    # Has appeal mechanism (30 points)
    if has_appeal_mechanism:
        score += 30
    else:
        issues.append("CRITICAL: No appeal mechanism exists")
        recommendations.append("Implement formal appeal process with human review")

    # Response time (25 points)
    if response_time_hours <= 24:
        score += 25
    elif response_time_hours <= 72:
        score += 15
        issues.append(f"Response time ({response_time_hours}h) exceeds 24h best practice")
    elif response_time_hours <= 168:
        score += 5
        issues.append(f"Response time ({response_time_hours}h) is slow")
    else:
        issues.append(f"CRITICAL: Response time ({response_time_hours}h) is unacceptable")
        recommendations.append("Reduce appeal response time to under 72 hours")

    # Human reviewer (25 points)
    if human_reviewer_assigned:
        score += 25
    else:
        issues.append("No dedicated human reviewer for appeals")
        recommendations.append("Assign trained staff to review appeals")

    # Clear instructions (10 points)
    if clear_instructions:
        score += 10
    else:
        issues.append("Appeal instructions not clear")
        recommendations.append("Provide step-by-step appeal instructions")

    # Accessible format (10 points)
    if accessible_format:
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

def submit_correction_request(decision_id: str, original_decision: str, requested_outcome: str, reason: str, supporting_evidence: Dict[str, Any] = None):
    request_id = str(uuid.uuid4())

    # This would be a database insert in a real application
    correction_requests = {
        "id": request_id,
        "decision_id": decision_id,
        "original_decision": original_decision,
        "requested_outcome": requested_outcome,
        "reason": reason,
        "evidence": supporting_evidence,
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

def analyze_ai_disclosure(interface_text: str, interaction_type: str):
    text_lower = interface_text.lower()

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
        "recommendation": recommendations.get(interaction_type, "Add clear AI disclosure"),
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

def comprehensive_audit(organization_name: str, ai_systems: List[Dict[str, Any]], framework: FrameworkType):
    """
    Run a comprehensive audit across all 5 Algorithmic Rights.
    Aggregates real analysis results from each AI system provided.

    Each system dict may include:
        - data, protected_attribute, outcome_variable (for bias testing)
        - model_type, feature_weights (for explainability scoring)
        - sample_communication, communication_context (for empathy)
        - has_appeal, appeal_response_hours, human_reviewer, etc. (for correction)
        - interface_text, interaction_type (for truth/disclosure)
    """
    results = {
        "organization": organization_name,
        "framework": framework.value,
        "timestamp": datetime.utcnow().isoformat(),
        "systems_audited": len(ai_systems),
        "rights_assessment": {},
        "system_results": [],
        "overall_score": 0,
        "recommendations": []
    }

    agency_scores = []
    explanation_scores = []
    empathy_scores = []
    correction_scores = []
    truth_scores = []

    for system in ai_systems:
        system_name = system.get("name", "Unknown System")
        system_result = {"name": system_name, "findings": []}

        # --- Right to Human Agency ---
        if "data" in system and "protected_attribute" in system and "outcome_variable" in system:
            bias = analyze_disparate_impact(system["data"], system["protected_attribute"], system["outcome_variable"])
            if "error" not in bias:
                score = 100 if bias["overall_status"] == "FAIR" else 50 if bias["overall_status"] == "WARNING" else 20
                agency_scores.append(score)
                system_result["bias_status"] = bias["overall_status"]
                system_result["findings"].extend(bias.get("flags", []))
            else:
                system_result["bias_status"] = "SKIPPED"
        else:
            system_result["bias_status"] = "NO_DATA"

        # --- Right to Explanation ---
        has_weights = "feature_weights" in system and system["feature_weights"]
        has_model_type = "model_type" in system
        if has_weights and has_model_type:
            explanation_scores.append(100)
        elif has_model_type:
            explanation_scores.append(60)
            results["recommendations"].append(f"{system_name}: Provide feature weights for full explainability")
        else:
            explanation_scores.append(30)
            results["recommendations"].append(f"{system_name}: Document model type and feature importance")

        # --- Right to Empathy ---
        if "sample_communication" in system:
            emp = analyze_empathy(system["sample_communication"], system.get("communication_context", "notification"))
            empathy_scores.append(emp["empathy_score"])
            if emp["status"] == "FAIL":
                system_result["findings"].append(f"Empathy: {emp['recommendation']}")

        # --- Right to Correction ---
        if "has_appeal" in system:
            corr = validate_correction_process(
                has_appeal_mechanism=system.get("has_appeal", False),
                response_time_hours=system.get("appeal_response_hours", 168),
                human_reviewer_assigned=system.get("human_reviewer", False),
                clear_instructions=system.get("clear_appeal_instructions", False),
                accessible_format=system.get("accessible_appeal", False),
            )
            correction_scores.append(corr["compliance_score"])
            if corr["status"] != "COMPLIANT":
                system_result["findings"].extend(corr["issues"])

        # --- Right to Truth ---
        if "interface_text" in system:
            disc = analyze_ai_disclosure(system["interface_text"], system.get("interaction_type", "web"))
            truth_scores.append(disc["disclosure_score"])
            if disc["status"] != "FULLY_DISCLOSED":
                system_result["findings"].append(f"Disclosure: {disc['recommendation']}")

        results["system_results"].append(system_result)

    # Aggregate per-right averages
    def _avg(scores, default=50):
        return round(sum(scores) / len(scores), 1) if scores else default

    def _status(score):
        if score >= 80: return "EXCELLENT"
        if score >= 60: return "GOOD"
        if score >= 40: return "PARTIAL"
        return "NEEDS_IMPROVEMENT"

    rights = {
        "human_agency": {"score": _avg(agency_scores), "status": _status(_avg(agency_scores)), "systems_tested": len(agency_scores)},
        "explanation": {"score": _avg(explanation_scores), "status": _status(_avg(explanation_scores)), "systems_tested": len(explanation_scores)},
        "empathy": {"score": _avg(empathy_scores), "status": _status(_avg(empathy_scores)), "systems_tested": len(empathy_scores)},
        "correction": {"score": _avg(correction_scores), "status": _status(_avg(correction_scores)), "systems_tested": len(correction_scores)},
        "truth": {"score": _avg(truth_scores), "status": _status(_avg(truth_scores)), "systems_tested": len(truth_scores)},
    }

    results["rights_assessment"] = rights
    results["overall_score"] = round(sum(r["score"] for r in rights.values()) / len(rights), 1)

    # Flag untested rights
    untested = [name for name, r in rights.items() if r["systems_tested"] == 0]
    if untested:
        results["recommendations"].append(
            f"No data provided for: {', '.join(untested)}. Scores are estimated. "
            "Provide system metadata to get accurate results."
        )

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
        FrameworkType.POPIA: "POPIA Section 71 requires human oversight for automated decisions affecting data subjects",
        FrameworkType.EU_AI_ACT: "High-risk AI systems require conformity assessment and CE marking",
        FrameworkType.EEOC: "Employment decisions subject to Four-Fifths Rule and adverse impact analysis",
        FrameworkType.ISO_42001: "AI management system must demonstrate continuous improvement cycle",
        FrameworkType.NIST_RMF: "Follow Govern-Map-Measure-Manage lifecycle for AI risk",
        FrameworkType.IEEE: "Ethical system design requires value-based engineering approach",
    }
    results["framework_note"] = framework_notes.get(framework, "Apply general AI governance best practices")

    results["audit_hash"] = generate_audit_hash(results)
    return results

def assess_organization(answers: Dict[str, int]):
    """
    Calculate a weighted integrity score from assessment answers.

    Answers should be keyed by question ID with a prefix indicating category:
        e.g., "USAGE_q1": 3, "OVERSIGHT_q1": 2, "TRANSPARENCY_q1": 4, etc.

    Category weights (from PRD):
        OVERSIGHT:      35% — most critical, human oversight is the core value prop
        TRANSPARENCY:   25% — explainability and disclosure
        USAGE:          20% — how the AI system is being used
        INFRASTRUCTURE: 20% — technical safeguards and monitoring
    """
    weights = {
        "USAGE": 0.20,
        "OVERSIGHT": 0.35,
        "TRANSPARENCY": 0.25,
        "INFRASTRUCTURE": 0.20,
    }

    # Bucket answers into categories based on question key prefix
    category_scores: Dict[str, List[int]] = {cat: [] for cat in weights}
    uncategorized = []

    for key, value in answers.items():
        matched = False
        for cat in weights:
            if key.upper().startswith(cat):
                category_scores[cat].append(value)
                matched = True
                break
        if not matched:
            uncategorized.append(value)

    # If no answers matched category prefixes, fall back to equal-weight average
    has_categories = any(len(v) > 0 for v in category_scores.values())

    if has_categories:
        weighted_total = 0.0
        weight_used = 0.0
        breakdown = {}

        for cat, weight in weights.items():
            scores = category_scores[cat]
            if scores:
                cat_avg = sum(scores) / len(scores)
                cat_pct = (cat_avg / 4.0) * 100  # Normalize 0-4 → 0-100
                weighted_total += cat_pct * weight
                weight_used += weight
                breakdown[cat] = {
                    "raw_average": round(cat_avg, 2),
                    "percentage": round(cat_pct, 1),
                    "weight": weight,
                    "weighted_contribution": round(cat_pct * weight, 1),
                    "questions": len(scores),
                }
            else:
                breakdown[cat] = {
                    "raw_average": None,
                    "percentage": None,
                    "weight": weight,
                    "weighted_contribution": 0,
                    "questions": 0,
                }

        # Re-normalize if some categories had no answers
        integrity_score = (weighted_total / weight_used) if weight_used > 0 else 0
    else:
        # Fallback: simple unweighted average for backward compatibility
        total_score = sum(answers.values())
        max_possible = len(answers) * 4
        integrity_score = (total_score / max_possible) * 100 if max_possible > 0 else 0
        breakdown = {"note": "No category prefixes detected — used unweighted average"}

    # Tier determination
    if integrity_score >= 80:
        tier = TierLevel.TIER_3
        tier_desc = "Automated-Permissible (Standard Risk)"
    elif integrity_score >= 50:
        tier = TierLevel.TIER_2
        tier_desc = "Human-Supervised (Elevated Risk)"
    else:
        tier = TierLevel.TIER_1
        tier_desc = "Human-Approved (Critical Risk)"

    return {
        "integrity_score": round(integrity_score, 1),
        "recommended_tier": tier.value,
        "tier_description": tier_desc,
        "scoring_method": "weighted" if has_categories else "unweighted",
        "breakdown": breakdown,
        "questions_answered": len(answers),
        "next_steps": [
            "Schedule consultation with AIC advisor",
            "Prepare documentation for audit",
            "Review tier-specific requirements",
        ],
    }

def assess_tier(ai_affects_rights: int, special_personal_info: int, human_oversight: int):
    score = ai_affects_rights + special_personal_info + human_oversight

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

def list_frameworks():
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

def analyze_differential_fairness(data: List[Dict], protected_attributes: List[str], outcome_variable: str, epsilon: float = 0.1):
    """
    Calculates epsilon-differential fairness.
    The system is fair if for any two intersectional groups s_i, s_j:
    exp(-epsilon) <= P(y=1 | s_i) / P(y=1 | s_j) <= exp(epsilon)
    """
    df = pd.DataFrame(data)
    
    # Create intersectional groups
    df['group'] = df[protected_attributes].astype(str).agg(' + '.join, axis=1)
    
    group_stats = df.groupby('group')[outcome_variable].mean()
    rates = group_stats.values
    
    if len(rates) < 2:
        return {"error": "Insufficient groups for differential analysis"}
        
    max_rate = np.max(rates)
    min_rate = np.min(rates)
    
    # Add small epsilon to avoid division by zero
    if min_rate == 0: min_rate = 0.0001
    
    ratio = max_rate / min_rate
    log_ratio = np.log(ratio)
    
    is_fair = log_ratio <= epsilon
    
    return {
        "metric": "Epsilon-Differential Fairness",
        "epsilon_target": epsilon,
        "observed_log_ratio": round(float(log_ratio), 4),
        "is_fair": bool(is_fair),
        "max_group": group_stats.idxmax(),
        "min_group": group_stats.idxmin(),
        "right_enforced": "Right to Human Agency (Advanced)",
        "recommendation": "Probability bounds are within fair range." if is_fair else f"Intersectional disparity exceeds epsilon bound ({epsilon}). Investigate {group_stats.idxmin()} outcomes."
    }

def get_differential_fairness(data: List[Dict], protected_attributes: List[str], outcome_variable: str):
    return analyze_differential_fairness(data, protected_attributes, outcome_variable)

def analyze_atkinson_index(data: List[Dict], protected_attribute: str, outcome_variable: str, epsilon: float = 0.5):
    """
    Calculates the Atkinson Index for outcome inequality.
    A = 1 - [1/n * sum( (y_i / mean_y)^(1-epsilon) )]^(1/(1-epsilon))
    """
    df = pd.DataFrame(data)
    group_rates = df.groupby(protected_attribute)[outcome_variable].mean()
    y = group_rates.values
    
    # Avoid zero mean
    mean_y = np.mean(y)
    if mean_y == 0: return {"error": "Mean outcome is zero"}
    
    n = len(y)
    
    if epsilon == 1:
        # Special case for epsilon = 1 (logarithmic)
        geometric_mean = np.exp(np.mean(np.log(y + 0.0001)))
        atkinson = 1 - (geometric_mean / mean_y)
    else:
        # Standard power mean
        term = np.mean((y / mean_y)**(1 - epsilon))
        atkinson = 1 - (term**(1 / (1 - epsilon)))
        
    status = "FAIR"
    if atkinson >= 0.2: status = "INEQUITABLE"
    elif atkinson >= 0.1: status = "MARGINAL"
    
    return {
        "metric": "Atkinson Index",
        "value": round(float(atkinson), 4),
        "epsilon": epsilon,
        "status": status,
        "right_enforced": "Right to Human Agency (Economic Fairness)",
        "recommendation": "Outcome distribution is equitable." if atkinson < 0.1 else "Significant inequality detected in group outcomes. Review allocation logic."
    }

def get_atkinson_index(data: List[Dict], protected_attribute: str, outcome_variable: str):
    return analyze_atkinson_index(data, protected_attribute, outcome_variable)

def analyze_theil_index(data: List[Dict], protected_attribute: str, outcome_variable: str):
    """
    Calculates the Theil Index (Generalized Entropy GE(1)).
    T = 1/n * sum( (y_i / mean_y) * ln(y_i / mean_y) )
    """
    df = pd.DataFrame(data)
    group_rates = df.groupby(protected_attribute)[outcome_variable].mean()
    y = group_rates.values
    
    mean_y = np.mean(y)
    if mean_y == 0: return {"error": "Mean outcome is zero"}
    
    # Avoid zero rates for log
    y_adj = np.where(y == 0, 0.0001, y)
    
    theil = np.mean((y_adj / mean_y) * np.log(y_adj / mean_y))
    
    status = "FAIR"
    if theil >= 0.1: status = "BIASED"
    elif theil >= 0.05: status = "WARNING"
    
    return {
        "metric": "Theil Index (GE(1))",
        "value": round(float(theil), 4),
        "status": status,
        "right_enforced": "Right to Human Agency (Systemic Fairness)",
        "recommendation": "Theil index indicates low entropy in outcome distribution." if theil < 0.05 else "Systemic inequality detected. High entropy in group outcomes."
    }

def get_theil_index(data: List[Dict], protected_attribute: str, outcome_variable: str):
    return analyze_theil_index(data, protected_attribute, outcome_variable)
