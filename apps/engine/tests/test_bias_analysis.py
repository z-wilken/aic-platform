"""
Unit tests for bias analysis calculations.
Known-answer tests ensure mathematical correctness of fairness metrics.
"""

import pytest
from app.services.bias_analysis import (
    analyze_disparate_impact,
    analyze_equalized_odds,
    analyze_intersectional,
    analyze_statistical_significance,
    explain_decision,
    analyze_empathy,
    validate_correction_process,
    analyze_ai_disclosure,
    comprehensive_audit,
    assess_organization,
    generate_audit_hash,
    calculate_confusion_metrics,
)
from app.api.v1.schemas.analysis import FrameworkType


# ============================================================
# Test Data Fixtures
# ============================================================

def make_fair_data():
    """Dataset where both groups have equal selection rates."""
    return [
        {"gender": "M", "hired": 1}, {"gender": "M", "hired": 1},
        {"gender": "M", "hired": 0}, {"gender": "M", "hired": 0},
        {"gender": "F", "hired": 1}, {"gender": "F", "hired": 1},
        {"gender": "F", "hired": 0}, {"gender": "F", "hired": 0},
    ]


def make_biased_data():
    """Dataset with clear bias — males hired at 80%, females at 20%."""
    data = []
    for _ in range(80):
        data.append({"gender": "M", "hired": 1})
    for _ in range(20):
        data.append({"gender": "M", "hired": 0})
    for _ in range(20):
        data.append({"gender": "F", "hired": 1})
    for _ in range(80):
        data.append({"gender": "F", "hired": 0})
    return data


def make_marginal_data():
    """Dataset near the Four-Fifths threshold — 75% vs 100%."""
    data = []
    for _ in range(100):
        data.append({"gender": "M", "hired": 1})
    for _ in range(75):
        data.append({"gender": "F", "hired": 1})
    for _ in range(25):
        data.append({"gender": "F", "hired": 0})
    return data


def make_equalized_odds_data():
    """Dataset with actual and predicted outcomes for equalized odds testing."""
    return [
        {"group": "A", "actual": 1, "predicted": 1},
        {"group": "A", "actual": 1, "predicted": 1},
        {"group": "A", "actual": 1, "predicted": 0},
        {"group": "A", "actual": 0, "predicted": 0},
        {"group": "A", "actual": 0, "predicted": 0},
        {"group": "B", "actual": 1, "predicted": 1},
        {"group": "B", "actual": 1, "predicted": 0},
        {"group": "B", "actual": 1, "predicted": 0},
        {"group": "B", "actual": 0, "predicted": 0},
        {"group": "B", "actual": 0, "predicted": 1},
    ]


# ============================================================
# Disparate Impact Tests
# ============================================================

class TestDisparateImpact:

    def test_fair_data_passes(self):
        result = analyze_disparate_impact(make_fair_data(), "gender", "hired")
        assert result["overall_status"] == "FAIR"
        assert result["popia_compliance"] is True

    def test_biased_data_fails(self):
        result = analyze_disparate_impact(make_biased_data(), "gender", "hired")
        assert result["overall_status"] == "BIASED"
        assert result["popia_compliance"] is False
        assert len(result["flags"]) > 0

    def test_impact_ratio_calculation(self):
        """Four-Fifths Rule: 20% / 80% = 0.25, well below 0.80 threshold."""
        result = analyze_disparate_impact(make_biased_data(), "gender", "hired")
        female_analysis = result["detailed_analysis"]["F"]
        assert female_analysis["disparate_impact_ratio"] == 0.25
        assert female_analysis["status"] == "FAIL"

    def test_marginal_data_warns(self):
        """75% / 100% = 0.75, which is between 0.70 and 0.80 — should be WARNING."""
        result = analyze_disparate_impact(make_marginal_data(), "gender", "hired")
        assert result["overall_status"] == "WARNING"

    def test_missing_column_returns_error(self):
        result = analyze_disparate_impact(make_fair_data(), "race", "hired")
        assert "error" in result

    def test_missing_outcome_returns_error(self):
        result = analyze_disparate_impact(make_fair_data(), "gender", "approved")
        assert "error" in result

    def test_audit_hash_present(self):
        result = analyze_disparate_impact(make_fair_data(), "gender", "hired")
        assert "audit_hash" in result
        assert len(result["audit_hash"]) == 64  # SHA-256 hex length

    def test_reference_group_is_highest(self):
        result = analyze_disparate_impact(make_biased_data(), "gender", "hired")
        assert result["reference_group"] == "M"
        assert result["reference_rate"] == 0.8


# ============================================================
# Equalized Odds Tests
# ============================================================

class TestEqualizedOdds:

    def test_basic_execution(self):
        result = analyze_equalized_odds(
            make_equalized_odds_data(), "group", "actual", "predicted", 0.1
        )
        assert "overall_status" in result
        assert "tpr_difference" in result
        assert "fpr_difference" in result

    def test_tpr_calculation(self):
        """Group A: TPR = 2/3 ≈ 0.667, Group B: TPR = 1/3 ≈ 0.333."""
        result = analyze_equalized_odds(
            make_equalized_odds_data(), "group", "actual", "predicted", 0.1
        )
        assert result["tpr_difference"] > 0.3  # Large TPR gap
        assert result["tpr_parity"] is False

    def test_missing_column_returns_error(self):
        result = analyze_equalized_odds(
            make_equalized_odds_data(), "race", "actual", "predicted", 0.1
        )
        assert "error" in result

    def test_lenient_threshold_passes(self):
        """With a very high threshold, even disparate rates should pass."""
        result = analyze_equalized_odds(
            make_equalized_odds_data(), "group", "actual", "predicted", 0.5
        )
        assert result["tpr_parity"] is True


# ============================================================
# Intersectional Analysis Tests
# ============================================================

class TestIntersectional:

    def test_basic_execution(self):
        data = [
            {"gender": "M", "race": "A", "hired": 1},
            {"gender": "M", "race": "A", "hired": 1},
            {"gender": "M", "race": "B", "hired": 1},
            {"gender": "F", "race": "A", "hired": 0},
            {"gender": "F", "race": "A", "hired": 0},
            {"gender": "F", "race": "B", "hired": 0},
        ]
        result = analyze_intersectional(data, ["gender", "race"], "hired", min_group_size=1)
        assert "overall_status" in result
        assert result["groups_analyzed"] > 0

    def test_min_group_size_filters(self):
        data = [{"gender": "M", "hired": 1}]  # Only 1 record
        result = analyze_intersectional(data, ["gender"], "hired", min_group_size=10)
        assert "error" in result


# ============================================================
# Statistical Significance Tests
# ============================================================

class TestStatisticalSignificance:

    def test_significant_bias_detected(self):
        result = analyze_statistical_significance(make_biased_data(), "gender", "hired")
        assert result["is_significant"] is True
        assert result["overall_status"] == "SIGNIFICANT_BIAS"

    def test_no_bias_in_fair_data(self):
        result = analyze_statistical_significance(make_fair_data(), "gender", "hired")
        assert result["is_significant"] is False

    def test_cramers_v_present(self):
        result = analyze_statistical_significance(make_biased_data(), "gender", "hired")
        assert "effect_size" in result
        assert result["effect_size"]["cramers_v"] > 0


# ============================================================
# Empathy Analysis Tests
# ============================================================

class TestEmpathyAnalysis:

    def test_hostile_text_fails(self):
        text = "Your application has been denied. You are ineligible and cannot reapply."
        result = analyze_empathy(text, "rejection")
        assert result["status"] == "FAIL"

    def test_empathetic_text_passes(self):
        text = "We understand this may be disappointing. We appreciate your application and would like to help you explore alternative options."
        result = analyze_empathy(text, "rejection")
        assert result["status"] == "PASS"

    def test_rejection_feedback(self):
        text = "Your application has been denied."
        result = analyze_empathy(text, "rejection")
        assert len(result["specific_feedback"]) > 0

    def test_score_range(self):
        result = analyze_empathy("Test message", "notification")
        assert 0 <= result["empathy_score"] <= 100


# ============================================================
# Correction Process Tests
# ============================================================

class TestCorrectionProcess:

    def test_full_compliance(self):
        result = validate_correction_process(
            has_appeal_mechanism=True,
            response_time_hours=24,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True,
        )
        assert result["compliance_score"] == 100
        assert result["status"] == "COMPLIANT"

    def test_no_appeal_is_critical(self):
        result = validate_correction_process(
            has_appeal_mechanism=False,
            response_time_hours=24,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True,
        )
        assert result["compliance_score"] == 70
        assert any("CRITICAL" in issue for issue in result["issues"])

    def test_slow_response_penalized(self):
        result = validate_correction_process(
            has_appeal_mechanism=True,
            response_time_hours=200,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True,
        )
        assert result["compliance_score"] < 100
        assert any("unacceptable" in issue for issue in result["issues"])


# ============================================================
# AI Disclosure Tests
# ============================================================

class TestAIDisclosure:

    def test_clear_disclosure_passes(self):
        result = analyze_ai_disclosure("This is an AI assistant here to help you.", "chatbot")
        assert result["status"] == "FULLY_DISCLOSED"
        assert result["disclosure_score"] == 100

    def test_no_disclosure_fails(self):
        result = analyze_ai_disclosure("Hello, how can I help you today?", "chatbot")
        assert result["status"] == "NOT_DISCLOSED"
        assert result["disclosure_score"] == 30

    def test_deceptive_text_critical(self):
        result = analyze_ai_disclosure("I am a human agent speaking from experience.", "chatbot")
        assert result["status"] == "DECEPTIVE"
        assert result["disclosure_score"] == 0


# ============================================================
# Decision Explanation Tests
# ============================================================

class TestDecisionExplanation:

    def test_basic_explanation(self):
        result = explain_decision(
            model_type="credit_scoring",
            input_features={"income": 50000, "credit_score": 720},
            decision="APPROVED",
            feature_weights={"income": 0.6, "credit_score": 0.8},
            confidence=0.92,
        )
        assert result["right_enforced"] == "Right to Explanation"
        assert result["popia_compliant"] is True
        assert "POPIA Section 71" in result["explanation"]

    def test_without_weights_lower_score(self):
        result = explain_decision(
            model_type="hiring",
            input_features={"experience": 5},
            decision="REJECTED",
        )
        assert result["explainability_score"] == 60  # No weights = lower score


# ============================================================
# Utility Tests
# ============================================================

# ============================================================
# Comprehensive Audit Tests
# ============================================================

class TestComprehensiveAudit:

    def test_with_full_system_data(self):
        """Systems with full metadata should produce real scores."""
        systems = [{
            "name": "Loan Approver",
            "data": make_fair_data(),
            "protected_attribute": "gender",
            "outcome_variable": "hired",
            "model_type": "credit_scoring",
            "feature_weights": {"income": 0.6},
            "sample_communication": "We appreciate your application and would like to help you explore options.",
            "communication_context": "rejection",
            "has_appeal": True,
            "appeal_response_hours": 24,
            "human_reviewer": True,
            "clear_appeal_instructions": True,
            "accessible_appeal": True,
            "interface_text": "This is an AI assistant.",
            "interaction_type": "chatbot",
        }]
        result = comprehensive_audit("TestCorp", systems, FrameworkType.POPIA)
        assert result["systems_audited"] == 1
        assert result["overall_score"] > 0
        assert result["rights_assessment"]["human_agency"]["systems_tested"] == 1
        assert result["rights_assessment"]["explanation"]["systems_tested"] == 1
        assert result["rights_assessment"]["truth"]["systems_tested"] == 1
        assert "audit_hash" in result

    def test_with_minimal_system_data(self):
        """Systems with no metadata should still return a result with defaults."""
        systems = [{"name": "Mystery Box"}]
        result = comprehensive_audit("TestCorp", systems, FrameworkType.POPIA)
        assert result["systems_audited"] == 1
        # No bias data provided, so agency should be untested
        assert result["rights_assessment"]["human_agency"]["systems_tested"] == 0
        # Should recommend providing data
        assert any("No data provided" in r for r in result["recommendations"])

    def test_biased_system_lowers_score(self):
        systems = [{
            "name": "Biased Screener",
            "data": make_biased_data(),
            "protected_attribute": "gender",
            "outcome_variable": "hired",
        }]
        result = comprehensive_audit("TestCorp", systems, FrameworkType.POPIA)
        assert result["rights_assessment"]["human_agency"]["score"] <= 50

    def test_framework_note_present(self):
        result = comprehensive_audit("X", [{"name": "A"}], FrameworkType.EU_AI_ACT)
        assert "EU" in result["framework_note"] or "conformity" in result["framework_note"]


# ============================================================
# Organization Assessment (Weighted Scoring) Tests
# ============================================================

class TestAssessOrganization:

    def test_weighted_scoring(self):
        """OVERSIGHT questions should weigh 35% of the final score."""
        answers = {
            "OVERSIGHT_q1": 4,
            "OVERSIGHT_q2": 4,
            "TRANSPARENCY_q1": 4,
            "USAGE_q1": 4,
            "INFRASTRUCTURE_q1": 4,
        }
        result = assess_organization(answers)
        assert result["scoring_method"] == "weighted"
        assert result["integrity_score"] == 100.0
        assert result["recommended_tier"] == "TIER_3"

    def test_weak_oversight_penalized_more(self):
        """Low oversight score should hurt more than low usage score."""
        weak_oversight = {
            "OVERSIGHT_q1": 1, "OVERSIGHT_q2": 1,
            "TRANSPARENCY_q1": 4,
            "USAGE_q1": 4,
            "INFRASTRUCTURE_q1": 4,
        }
        weak_usage = {
            "OVERSIGHT_q1": 4, "OVERSIGHT_q2": 4,
            "TRANSPARENCY_q1": 4,
            "USAGE_q1": 1,
            "INFRASTRUCTURE_q1": 4,
        }
        r1 = assess_organization(weak_oversight)
        r2 = assess_organization(weak_usage)
        # Weak oversight should produce a lower score than weak usage
        assert r1["integrity_score"] < r2["integrity_score"]

    def test_fallback_unweighted(self):
        """Answers without category prefixes should use unweighted fallback."""
        answers = {"q1": 3, "q2": 4, "q3": 2}
        result = assess_organization(answers)
        assert result["scoring_method"] == "unweighted"
        # (3+4+2) / (3*4) * 100 = 75.0
        assert result["integrity_score"] == 75.0

    def test_tier_1_for_low_scores(self):
        answers = {"OVERSIGHT_q1": 1, "TRANSPARENCY_q1": 1}
        result = assess_organization(answers)
        assert result["recommended_tier"] == "TIER_1"

    def test_breakdown_includes_weights(self):
        answers = {"OVERSIGHT_q1": 3, "USAGE_q1": 2}
        result = assess_organization(answers)
        assert "OVERSIGHT" in result["breakdown"]
        assert result["breakdown"]["OVERSIGHT"]["weight"] == 0.35
        assert result["breakdown"]["USAGE"]["weight"] == 0.20


# ============================================================
# Utility Tests
# ============================================================

class TestAuditHash:

    def test_deterministic(self):
        data = {"key": "value", "number": 42}
        h1 = generate_audit_hash(data)
        h2 = generate_audit_hash(data)
        assert h1 == h2

    def test_different_data_different_hash(self):
        h1 = generate_audit_hash({"a": 1})
        h2 = generate_audit_hash({"a": 2})
        assert h1 != h2

    def test_sha256_length(self):
        h = generate_audit_hash({"test": True})
        assert len(h) == 64
