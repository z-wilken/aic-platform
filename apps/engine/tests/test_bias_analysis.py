"""
Tests for the bias analysis service module.
Tests cover the core algorithmic fairness and compliance functions.
"""
import pytest
from app.services.bias_analysis import (
    generate_audit_hash,
    calculate_confusion_metrics,
    analyze_disparate_impact,
    analyze_equalized_odds,
    analyze_intersectional,
    analyze_statistical_significance,
    explain_decision,
    analyze_empathy,
    validate_correction_process,
    submit_correction_request,
    analyze_ai_disclosure,
    comprehensive_audit,
    assess_organization,
    assess_tier,
    list_frameworks,
)
from app.api.v1.schemas.analysis import FrameworkType


class TestGenerateAuditHash:
    """Tests for audit hash generation"""

    def test_hash_is_deterministic(self):
        """Same input should produce same hash"""
        data = {"key": "value", "number": 123}
        hash1 = generate_audit_hash(data)
        hash2 = generate_audit_hash(data)
        assert hash1 == hash2

    def test_hash_is_different_for_different_data(self):
        """Different input should produce different hash"""
        hash1 = generate_audit_hash({"key": "value1"})
        hash2 = generate_audit_hash({"key": "value2"})
        assert hash1 != hash2

    def test_hash_is_sha256_format(self):
        """Hash should be 64 character hex string (SHA-256)"""
        hash_result = generate_audit_hash({"test": "data"})
        assert len(hash_result) == 64
        assert all(c in "0123456789abcdef" for c in hash_result)


class TestCalculateConfusionMetrics:
    """Tests for confusion matrix calculation"""

    def test_perfect_classifier(self):
        """Test with a perfect classifier"""
        import pandas as pd

        df = pd.DataFrame([
            {"group": "A", "actual": 1, "predicted": 1},
            {"group": "A", "actual": 0, "predicted": 0},
            {"group": "B", "actual": 1, "predicted": 1},
            {"group": "B", "actual": 0, "predicted": 0},
        ])
        metrics = calculate_confusion_metrics(df, "actual", "predicted", "group")

        assert metrics["A"]["true_positive_rate"] == 1.0
        assert metrics["A"]["false_positive_rate"] == 0.0
        assert metrics["B"]["true_positive_rate"] == 1.0
        assert metrics["B"]["false_positive_rate"] == 0.0

    def test_biased_classifier(self, sample_prediction_data):
        """Test with a biased classifier"""
        import pandas as pd

        df = pd.DataFrame(sample_prediction_data)
        metrics = calculate_confusion_metrics(df, "actual", "predicted", "group")

        # Group A should have higher TPR
        assert "A" in metrics
        assert "B" in metrics
        assert "true_positive_rate" in metrics["A"]
        assert "false_positive_rate" in metrics["A"]
        assert "sample_size" in metrics["A"]


class TestAnalyzeDisparateImpact:
    """Tests for disparate impact analysis (Four-Fifths Rule)"""

    def test_detects_bias(self, sample_hiring_data):
        """Test that bias is detected in skewed data"""
        result = analyze_disparate_impact(
            sample_hiring_data, "gender", "hired"
        )

        assert result["overall_status"] in ["BIASED", "WARNING", "FAIR"]
        assert "detailed_analysis" in result
        assert "male" in result["detailed_analysis"]
        assert "female" in result["detailed_analysis"]
        assert result["methodology"] == "POPIA Section 71 / EEOC Four-Fifths Rule"

    def test_fair_data_passes(self, sample_fair_data):
        """Test that fair data passes the check"""
        result = analyze_disparate_impact(sample_fair_data, "group", "outcome")

        assert result["overall_status"] == "FAIR"
        assert result["popia_compliance"] is True

    def test_missing_column_returns_error(self, sample_hiring_data):
        """Test that missing column returns error"""
        result = analyze_disparate_impact(
            sample_hiring_data, "nonexistent", "hired"
        )
        assert "error" in result

    def test_missing_outcome_column_returns_error(self, sample_hiring_data):
        """Test that missing outcome column returns error"""
        result = analyze_disparate_impact(
            sample_hiring_data, "gender", "nonexistent"
        )
        assert "error" in result

    def test_includes_audit_hash(self, sample_fair_data):
        """Test that result includes audit hash"""
        result = analyze_disparate_impact(sample_fair_data, "group", "outcome")
        assert "audit_hash" in result
        assert len(result["audit_hash"]) == 64

    def test_reference_group_is_identified(self, sample_fair_data):
        """Test that reference group (best rate) is identified"""
        result = analyze_disparate_impact(sample_fair_data, "group", "outcome")
        assert "reference_group" in result
        assert "reference_rate" in result


class TestAnalyzeEqualizedOdds:
    """Tests for equalized odds analysis"""

    def test_analyzes_tpr_and_fpr_parity(self, sample_prediction_data):
        """Test TPR and FPR parity analysis"""
        result = analyze_equalized_odds(
            sample_prediction_data,
            "group",
            "actual",
            "predicted",
            threshold=0.1
        )

        assert "tpr_parity" in result
        assert "fpr_parity" in result
        assert "tpr_difference" in result
        assert "fpr_difference" in result
        assert result["methodology"] == "Equalized Odds (TPR & FPR Parity)"

    def test_missing_column_returns_error(self, sample_prediction_data):
        """Test that missing column returns error"""
        result = analyze_equalized_odds(
            sample_prediction_data,
            "nonexistent",
            "actual",
            "predicted",
            threshold=0.1
        )
        assert "error" in result

    def test_passes_with_equal_rates(self):
        """Test that equal rates pass"""
        data = [
            {"group": "A", "actual": 1, "predicted": 1},
            {"group": "A", "actual": 0, "predicted": 0},
            {"group": "B", "actual": 1, "predicted": 1},
            {"group": "B", "actual": 0, "predicted": 0},
        ]
        result = analyze_equalized_odds(data, "group", "actual", "predicted", 0.1)
        assert result["overall_status"] == "PASS"


class TestAnalyzeIntersectional:
    """Tests for intersectional bias analysis"""

    def test_analyzes_multiple_attributes(self, sample_hiring_data):
        """Test analysis with multiple protected attributes"""
        result = analyze_intersectional(
            sample_hiring_data,
            ["gender", "age_group"],
            "hired",
            min_group_size=1
        )

        assert "groups_analyzed" in result
        assert "attributes_analyzed" in result
        assert result["methodology"] == "Intersectional Fairness Analysis"

    def test_respects_min_group_size(self, sample_hiring_data):
        """Test that min_group_size is respected"""
        result = analyze_intersectional(
            sample_hiring_data,
            ["gender", "age_group"],
            "hired",
            min_group_size=100  # Very high threshold
        )
        assert "error" in result

    def test_missing_attribute_returns_error(self, sample_hiring_data):
        """Test that missing attribute returns error"""
        result = analyze_intersectional(
            sample_hiring_data,
            ["gender", "nonexistent"],
            "hired",
            min_group_size=1
        )
        assert "error" in result


class TestAnalyzeStatisticalSignificance:
    """Tests for statistical significance analysis"""

    def test_performs_chi_square_test(self, sample_hiring_data):
        """Test chi-square test is performed"""
        result = analyze_statistical_significance(
            sample_hiring_data, "gender", "hired"
        )

        assert "chi_square" in result
        assert "p_value" in result
        assert "is_significant" in result
        assert "effect_size" in result
        assert result["methodology"] == "Chi-Square Test for Independence"

    def test_returns_effect_size_interpretation(self, sample_hiring_data):
        """Test effect size interpretation is included"""
        result = analyze_statistical_significance(
            sample_hiring_data, "gender", "hired"
        )

        assert "interpretation" in result["effect_size"]
        assert result["effect_size"]["interpretation"] in [
            "negligible", "small", "medium", "large"
        ]


class TestExplainDecision:
    """Tests for decision explanation generation"""

    def test_generates_explanation(self):
        """Test explanation generation"""
        result = explain_decision(
            model_type="credit_scoring",
            input_features={"income": 50000, "credit_score": 700},
            decision="APPROVED",
            feature_weights={"income": 0.6, "credit_score": 0.8},
            confidence=0.85
        )

        assert "explanation" in result
        assert "APPROVED" in result["explanation"]
        assert result["right_enforced"] == "Right to Explanation"
        assert result["popia_compliant"] is True

    def test_includes_rights_notice(self):
        """Test that POPIA rights notice is included"""
        result = explain_decision(
            model_type="hiring",
            input_features={"experience": 5},
            decision="REJECTED"
        )

        assert "POPIA Section 71" in result["explanation"]
        assert "Human Review" in result["explanation"]

    def test_handles_different_model_types(self):
        """Test different model types"""
        for model_type in ["credit_scoring", "fraud_detection", "hiring", "unknown"]:
            result = explain_decision(
                model_type=model_type,
                input_features={"test": 1},
                decision="TEST"
            )
            assert "explanation" in result

    def test_explainability_score_with_weights(self):
        """Test explainability score is higher with feature weights"""
        result_with_weights = explain_decision(
            model_type="test",
            input_features={"a": 1},
            decision="TEST",
            feature_weights={"a": 0.5}
        )
        result_without_weights = explain_decision(
            model_type="test",
            input_features={"a": 1},
            decision="TEST"
        )

        assert result_with_weights["explainability_score"] > result_without_weights["explainability_score"]


class TestAnalyzeEmpathy:
    """Tests for empathy analysis"""

    def test_detects_hostile_tone(self, hostile_rejection_text):
        """Test detection of hostile language"""
        result = analyze_empathy(hostile_rejection_text, "rejection")

        assert result["empathy_level"] in ["HOSTILE", "COLD"]
        assert result["status"] == "FAIL"
        assert result["right_enforced"] == "Right to Empathy"

    def test_detects_empathetic_tone(self, empathetic_rejection_text):
        """Test detection of empathetic language"""
        result = analyze_empathy(empathetic_rejection_text, "rejection")

        # Empathetic text should have higher score and not be hostile/cold
        assert result["empathy_score"] >= 50
        assert result["empathy_level"] not in ["HOSTILE", "COLD"]

    def test_provides_specific_feedback_for_rejection(self, hostile_rejection_text):
        """Test that specific feedback is provided for rejections"""
        result = analyze_empathy(hostile_rejection_text, "rejection")

        assert "specific_feedback" in result
        # Should have recommendations for missing elements
        assert len(result["specific_feedback"]) > 0

    def test_sentiment_analysis(self, empathetic_rejection_text):
        """Test sentiment scores are included"""
        result = analyze_empathy(empathetic_rejection_text, "rejection")

        assert "sentiment" in result
        assert "polarity" in result["sentiment"]
        assert "subjectivity" in result["sentiment"]

    def test_pattern_analysis(self, hostile_rejection_text):
        """Test pattern analysis counts"""
        result = analyze_empathy(hostile_rejection_text, "rejection")

        assert "pattern_analysis" in result
        assert "hostile_indicators" in result["pattern_analysis"]
        assert "empathetic_indicators" in result["pattern_analysis"]


class TestValidateCorrectionProcess:
    """Tests for correction process validation"""

    def test_full_compliance(self, sample_correction_params):
        """Test fully compliant correction process"""
        result = validate_correction_process(**sample_correction_params)

        assert result["compliance_score"] == 100
        assert result["status"] == "COMPLIANT"
        assert result["popia_compliant"] is True

    def test_no_appeal_mechanism_fails(self):
        """Test that missing appeal mechanism fails"""
        result = validate_correction_process(
            has_appeal_mechanism=False,
            response_time_hours=24,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True
        )

        assert result["compliance_score"] < 100
        assert "CRITICAL: No appeal mechanism exists" in result["issues"]

    def test_slow_response_time_reduces_score(self):
        """Test that slow response time reduces score"""
        fast = validate_correction_process(
            has_appeal_mechanism=True,
            response_time_hours=24,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True
        )
        slow = validate_correction_process(
            has_appeal_mechanism=True,
            response_time_hours=200,
            human_reviewer_assigned=True,
            clear_instructions=True,
            accessible_format=True
        )

        assert fast["compliance_score"] > slow["compliance_score"]

    def test_includes_tier_requirements(self, sample_correction_params):
        """Test that tier requirements are included"""
        result = validate_correction_process(**sample_correction_params)

        assert "tier_requirement" in result
        assert "TIER_1" in result["tier_requirement"]
        assert "TIER_2" in result["tier_requirement"]
        assert "TIER_3" in result["tier_requirement"]


class TestSubmitCorrectionRequest:
    """Tests for correction request submission"""

    def test_creates_request(self):
        """Test correction request creation"""
        result = submit_correction_request(
            decision_id="DEC-123",
            original_decision="DENIED",
            requested_outcome="APPROVED",
            reason="I believe the decision was based on incorrect information"
        )

        assert result["status"] == "SUBMITTED"
        assert "request_id" in result
        assert result["right_enforced"] == "Right to Correction"

    def test_includes_next_steps(self):
        """Test that next steps are included"""
        result = submit_correction_request(
            decision_id="DEC-123",
            original_decision="DENIED",
            requested_outcome="APPROVED",
            reason="Test reason"
        )

        assert "next_steps" in result
        assert len(result["next_steps"]) > 0


class TestAnalyzeAiDisclosure:
    """Tests for AI disclosure analysis"""

    def test_detects_full_disclosure(self, ai_disclosed_text):
        """Test detection of full AI disclosure"""
        result = analyze_ai_disclosure(ai_disclosed_text, "chatbot")

        assert result["disclosure_score"] >= 70
        assert result["status"] in ["FULLY_DISCLOSED", "PARTIALLY_DISCLOSED"]
        assert result["popia_compliant"] is True

    def test_detects_missing_disclosure(self, ai_hidden_text):
        """Test detection of missing AI disclosure"""
        result = analyze_ai_disclosure(ai_hidden_text, "chatbot")

        assert result["disclosure_score"] < 70
        assert result["popia_compliant"] is False

    def test_detects_deceptive_content(self):
        """Test detection of deceptive content"""
        deceptive_text = "Hi, I am a human named John. I personally reviewed your case and speaking from experience, I think you should apply again."
        result = analyze_ai_disclosure(deceptive_text, "chatbot")

        assert result["status"] == "DECEPTIVE"
        assert result["disclosure_score"] == 0

    def test_provides_recommendations_by_type(self):
        """Test that recommendations are provided for each type"""
        for interaction_type in ["chatbot", "email", "web", "phone"]:
            result = analyze_ai_disclosure("Hello", interaction_type)
            assert "recommendation" in result

    def test_includes_best_practices(self, ai_hidden_text):
        """Test that best practices are included"""
        result = analyze_ai_disclosure(ai_hidden_text, "chatbot")

        assert "best_practices" in result
        assert len(result["best_practices"]) > 0


class TestComprehensiveAudit:
    """Tests for comprehensive audit"""

    def test_performs_audit(self):
        """Test comprehensive audit execution"""
        result = comprehensive_audit(
            organization_name="Test Corp",
            ai_systems=[{"name": "Test System", "type": "credit"}],
            framework=FrameworkType.POPIA
        )

        assert result["organization"] == "Test Corp"
        assert result["framework"] == "popia"
        assert "rights_assessment" in result
        assert "overall_score" in result
        assert "recommended_tier" in result

    def test_tier_recommendations(self):
        """Test tier recommendation based on score"""
        result = comprehensive_audit(
            organization_name="Test",
            ai_systems=[],
            framework=FrameworkType.POPIA
        )

        assert result["recommended_tier"] in ["TIER_1", "TIER_2", "TIER_3"]

    def test_framework_notes(self):
        """Test framework-specific notes are included"""
        for framework in [FrameworkType.POPIA, FrameworkType.EU_AI_ACT, FrameworkType.EEOC]:
            result = comprehensive_audit(
                organization_name="Test",
                ai_systems=[],
                framework=framework
            )
            assert "framework_note" in result


class TestAssessOrganization:
    """Tests for organization assessment"""

    def test_calculates_integrity_score(self):
        """Test integrity score calculation"""
        answers = {"q1": 4, "q2": 4, "q3": 4, "q4": 4, "q5": 4}
        result = assess_organization(answers)

        assert "integrity_score" in result
        assert result["integrity_score"] == 100.0

    def test_determines_tier(self):
        """Test tier determination based on score"""
        high_answers = {"q1": 4, "q2": 4, "q3": 4, "q4": 4}
        low_answers = {"q1": 0, "q2": 0, "q3": 0, "q4": 0}

        high_result = assess_organization(high_answers)
        low_result = assess_organization(low_answers)

        assert high_result["recommended_tier"] == "TIER_3"
        assert low_result["recommended_tier"] == "TIER_1"

    def test_includes_next_steps(self):
        """Test next steps are included"""
        result = assess_organization({"q1": 2})

        assert "next_steps" in result
        assert len(result["next_steps"]) > 0


class TestAssessTier:
    """Tests for quick tier assessment"""

    def test_high_risk_returns_tier_1(self):
        """Test that high risk factors result in Tier 1"""
        result = assess_tier(
            ai_affects_rights=3,
            special_personal_info=3,
            human_oversight=3
        )

        assert result["tier"] == "TIER_1"
        assert "100% human review" in str(result["requirements"])

    def test_low_risk_returns_tier_3(self):
        """Test that low risk factors result in Tier 3"""
        result = assess_tier(
            ai_affects_rights=1,
            special_personal_info=1,
            human_oversight=1
        )

        assert result["tier"] == "TIER_3"

    def test_includes_pricing_estimate(self):
        """Test pricing estimate is included"""
        result = assess_tier(1, 1, 1)

        assert "pricing_estimate" in result
        assert "R" in result["pricing_estimate"]  # South African Rand


class TestListFrameworks:
    """Tests for framework listing"""

    def test_returns_all_frameworks(self):
        """Test all frameworks are returned"""
        result = list_frameworks()

        assert "frameworks" in result
        assert len(result["frameworks"]) >= 6

        framework_ids = [f["id"] for f in result["frameworks"]]
        assert "popia" in framework_ids
        assert "eu_ai_act" in framework_ids
        assert "eeoc" in framework_ids

    def test_framework_structure(self):
        """Test framework structure is correct"""
        result = list_frameworks()

        for framework in result["frameworks"]:
            assert "id" in framework
            assert "name" in framework
            assert "jurisdiction" in framework
            assert "description" in framework
            assert "key_requirements" in framework
