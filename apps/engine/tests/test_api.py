"""
Tests for the API endpoints.
Tests cover all FastAPI routes for the AIC Audit Engine.
"""
import pytest
from fastapi.testclient import TestClient


class TestHealthCheck:
    """Tests for the health check endpoint"""

    def test_health_check_returns_200(self, client):
        """Test health check returns success"""
        response = client.get("/")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "AIC Audit Engine Operational"
        assert "version" in data
        assert "timestamp" in data


class TestDisparateImpactEndpoint:
    """Tests for /api/v1/analyze endpoint"""

    def test_analyze_returns_results(self, client, sample_fair_data):
        """Test disparate impact analysis endpoint"""
        response = client.post(
            "/api/v1/analyze",
            json={
                "data": sample_fair_data,
                "protected_attribute": "group",
                "outcome_variable": "outcome"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "overall_status" in data
        assert "detailed_analysis" in data

    def test_analyze_returns_400_for_missing_column(self, client, sample_fair_data):
        """Test error handling for missing column"""
        response = client.post(
            "/api/v1/analyze",
            json={
                "data": sample_fair_data,
                "protected_attribute": "nonexistent",
                "outcome_variable": "outcome"
            }
        )

        assert response.status_code == 400

    def test_analyze_validates_request_body(self, client):
        """Test request validation"""
        response = client.post(
            "/api/v1/analyze",
            json={"data": []}  # Missing required fields
        )

        assert response.status_code == 422  # Validation error


class TestEqualizedOddsEndpoint:
    """Tests for /api/v1/analyze/equalized-odds endpoint"""

    def test_equalized_odds_returns_results(self, client, sample_prediction_data):
        """Test equalized odds analysis endpoint"""
        response = client.post(
            "/api/v1/analyze/equalized-odds",
            json={
                "data": sample_prediction_data,
                "protected_attribute": "group",
                "actual_outcome": "actual",
                "predicted_outcome": "predicted",
                "threshold": 0.1
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "tpr_parity" in data
        assert "fpr_parity" in data

    def test_equalized_odds_uses_default_threshold(self, client, sample_prediction_data):
        """Test that default threshold is applied"""
        response = client.post(
            "/api/v1/analyze/equalized-odds",
            json={
                "data": sample_prediction_data,
                "protected_attribute": "group",
                "actual_outcome": "actual",
                "predicted_outcome": "predicted"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert data["threshold"] == 0.1  # Default


class TestIntersectionalEndpoint:
    """Tests for /api/v1/analyze/intersectional endpoint"""

    def test_intersectional_returns_results(self, client, sample_hiring_data):
        """Test intersectional analysis endpoint"""
        response = client.post(
            "/api/v1/analyze/intersectional",
            json={
                "data": sample_hiring_data,
                "protected_attributes": ["gender", "age_group"],
                "outcome_variable": "hired",
                "min_group_size": 1
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "groups_analyzed" in data

    def test_intersectional_returns_400_for_small_groups(self, client, sample_hiring_data):
        """Test error when no groups meet minimum size"""
        response = client.post(
            "/api/v1/analyze/intersectional",
            json={
                "data": sample_hiring_data,
                "protected_attributes": ["gender", "age_group"],
                "outcome_variable": "hired",
                "min_group_size": 1000
            }
        )

        assert response.status_code == 400


class TestStatisticalEndpoint:
    """Tests for /api/v1/analyze/statistical endpoint"""

    def test_statistical_returns_results(self, client, sample_hiring_data):
        """Test statistical significance endpoint"""
        response = client.post(
            "/api/v1/analyze/statistical",
            json={
                "data": sample_hiring_data,
                "protected_attribute": "gender",
                "outcome_variable": "hired"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "chi_square" in data
        assert "p_value" in data


class TestExplainEndpoint:
    """Tests for /api/v1/explain endpoint"""

    def test_explain_returns_explanation(self, client):
        """Test decision explanation endpoint"""
        response = client.post(
            "/api/v1/explain",
            json={
                "model_type": "credit_scoring",
                "input_features": {"income": 50000, "credit_score": 700},
                "decision": "APPROVED",
                "feature_weights": {"income": 0.6, "credit_score": 0.8},
                "confidence": 0.85
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "explanation" in data
        assert "APPROVED" in data["explanation"]

    def test_explain_works_without_optional_fields(self, client):
        """Test explanation without optional fields"""
        response = client.post(
            "/api/v1/explain",
            json={
                "model_type": "hiring",
                "input_features": {"experience": 5},
                "decision": "REJECTED"
            }
        )

        assert response.status_code == 200


class TestEmpathyEndpoint:
    """Tests for /api/v1/analyze/empathy endpoint"""

    def test_empathy_returns_analysis(self, client, hostile_rejection_text):
        """Test empathy analysis endpoint"""
        response = client.post(
            "/api/v1/analyze/empathy",
            json={
                "text": hostile_rejection_text,
                "context": "rejection"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "empathy_score" in data
        assert "empathy_level" in data

    def test_empathy_uses_default_context(self, client):
        """Test default context is applied"""
        response = client.post(
            "/api/v1/analyze/empathy",
            json={"text": "Your application was denied."}
        )

        assert response.status_code == 200


class TestCorrectionValidationEndpoint:
    """Tests for /api/v1/validate/correction-process endpoint"""

    def test_validation_returns_score(self, client, sample_correction_params):
        """Test correction process validation endpoint"""
        response = client.post(
            "/api/v1/validate/correction-process",
            json=sample_correction_params
        )

        assert response.status_code == 200
        data = response.json()
        assert "compliance_score" in data
        assert "status" in data


class TestCorrectionSubmitEndpoint:
    """Tests for /api/v1/correction/submit endpoint"""

    def test_submit_creates_request(self, client):
        """Test correction submission endpoint"""
        response = client.post(
            "/api/v1/correction/submit",
            json={
                "decision_id": "DEC-123",
                "original_decision": "DENIED",
                "requested_outcome": "APPROVED",
                "reason": "I believe there was an error"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "SUBMITTED"
        assert "request_id" in data


class TestDisclosureEndpoint:
    """Tests for /api/v1/analyze/disclosure endpoint"""

    def test_disclosure_returns_analysis(self, client, ai_disclosed_text):
        """Test AI disclosure analysis endpoint"""
        response = client.post(
            "/api/v1/analyze/disclosure",
            json={
                "interface_text": ai_disclosed_text,
                "interaction_type": "chatbot"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "disclosure_score" in data
        assert "status" in data


class TestComprehensiveAuditEndpoint:
    """Tests for /api/v1/audit/comprehensive endpoint"""

    def test_audit_returns_results(self, client):
        """Test comprehensive audit endpoint"""
        response = client.post(
            "/api/v1/audit/comprehensive",
            json={
                "organization_name": "Test Corp",
                "ai_systems": [{"name": "System A", "type": "credit"}],
                "framework": "popia"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert data["organization"] == "Test Corp"
        assert "overall_score" in data
        assert "recommended_tier" in data


class TestAssessmentEndpoint:
    """Tests for /api/v1/assess endpoint"""

    def test_assess_returns_score(self, client):
        """Test organization assessment endpoint"""
        response = client.post(
            "/api/v1/assess",
            json={"answers": {"q1": 4, "q2": 3, "q3": 4}}
        )

        assert response.status_code == 200
        data = response.json()
        assert "integrity_score" in data
        assert "recommended_tier" in data


class TestTierAssessmentEndpoint:
    """Tests for /api/v1/assess/tier endpoint"""

    def test_tier_assessment_returns_tier(self, client):
        """Test tier assessment endpoint"""
        response = client.post(
            "/api/v1/assess/tier",
            json={
                "ai_affects_rights": 2,
                "special_personal_info": 2,
                "human_oversight": 2
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "tier" in data
        assert "requirements" in data

    def test_tier_assessment_validates_range(self, client):
        """Test validation of input ranges"""
        response = client.post(
            "/api/v1/assess/tier",
            json={
                "ai_affects_rights": 5,  # Out of range (1-3)
                "special_personal_info": 2,
                "human_oversight": 2
            }
        )

        assert response.status_code == 422  # Validation error


class TestFrameworksEndpoint:
    """Tests for /api/v1/frameworks endpoint"""

    def test_frameworks_returns_list(self, client):
        """Test frameworks listing endpoint"""
        response = client.get("/api/v1/frameworks")

        assert response.status_code == 200
        data = response.json()
        assert "frameworks" in data
        assert len(data["frameworks"]) >= 6
