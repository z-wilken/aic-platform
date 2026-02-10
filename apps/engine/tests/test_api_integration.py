"""
Integration tests for API endpoints using FastAPI TestClient.
Tests request validation, response shapes, and error handling.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app, ENGINE_API_KEY

client = TestClient(app)
client.headers["X-API-Key"] = ENGINE_API_KEY or ""


class TestHealthCheck:

    def test_health_returns_200(self):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "AIC Audit Engine Operational"
        assert "version" in data
        assert "timestamp" in data


class TestDisparateImpactEndpoint:

    def test_valid_request(self):
        payload = {
            "data": [
                {"gender": "M", "hired": 1}, {"gender": "M", "hired": 1},
                {"gender": "M", "hired": 0}, {"gender": "M", "hired": 0},
                {"gender": "F", "hired": 1}, {"gender": "F", "hired": 1},
                {"gender": "F", "hired": 0}, {"gender": "F", "hired": 0},
            ],
            "protected_attribute": "gender",
            "outcome_variable": "hired",
        }
        response = client.post("/api/v1/analyze", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "overall_status" in data
        assert "audit_hash" in data
        assert data["right_enforced"] == "Right to Human Agency"

    def test_missing_column_returns_400(self):
        payload = {
            "data": [{"gender": "M", "hired": 1}],
            "protected_attribute": "race",
            "outcome_variable": "hired",
        }
        response = client.post("/api/v1/analyze", json=payload)
        assert response.status_code == 400

    def test_missing_fields_returns_422(self):
        payload = {"data": [{"a": 1}]}
        response = client.post("/api/v1/analyze", json=payload)
        assert response.status_code == 422

    def test_empty_body_returns_422(self):
        response = client.post("/api/v1/analyze", json={})
        assert response.status_code == 422


class TestEqualizedOddsEndpoint:

    def test_valid_request(self):
        payload = {
            "data": [
                {"group": "A", "actual": 1, "predicted": 1},
                {"group": "A", "actual": 0, "predicted": 0},
                {"group": "B", "actual": 1, "predicted": 1},
                {"group": "B", "actual": 0, "predicted": 0},
            ],
            "protected_attribute": "group",
            "actual_outcome": "actual",
            "predicted_outcome": "predicted",
            "threshold": 0.1,
        }
        response = client.post("/api/v1/analyze/equalized-odds", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "tpr_parity" in data
        assert "fpr_parity" in data


class TestStatisticalParityEndpoint:

    def test_valid_request(self):
        payload = {
            "data": [
                {"group": "A", "outcome": 1}, {"group": "A", "outcome": 0},
                {"group": "B", "outcome": 1}, {"group": "B", "outcome": 0},
            ],
            "protected_attribute": "group",
            "outcome_variable": "outcome",
        }
        response = client.post("/api/v1/analyze/statistical-parity", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["methodology"] == "Statistical Parity Difference"


class TestDriftEndpoint:

    def test_valid_request(self):
        import numpy as np
        np.random.seed(42)
        payload = {
            "baseline_data": list(np.random.normal(0, 1, 100).astype(float)),
            "current_data": list(np.random.normal(0, 1, 100).astype(float)),
            "feature_name": "income",
        }
        response = client.post("/api/v1/analyze/drift", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert "psi" in data
        assert "js_divergence" in data
        assert "ks_test" in data
        assert data["feature"] == "income"


class TestExplainEndpoint:

    def test_valid_request(self):
        payload = {
            "model_type": "credit_scoring",
            "input_features": {"income": 50000, "credit_score": 720},
            "decision": "APPROVED",
            "feature_weights": {"income": 0.6, "credit_score": 0.8},
            "confidence": 0.92,
        }
        response = client.post("/api/v1/explain", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["right_enforced"] == "Right to Explanation"
        assert data["popia_compliant"] is True


class TestEmpathyEndpoint:

    def test_valid_request(self):
        payload = {"text": "We regret to inform you that your application was unsuccessful.", "context": "rejection"}
        response = client.post("/api/v1/analyze/empathy", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "empathy_score" in data
        assert "empathy_level" in data


class TestCorrectionEndpoints:

    def test_validate_correction(self):
        payload = {
            "has_appeal_mechanism": True,
            "response_time_hours": 24,
            "human_reviewer_assigned": True,
            "clear_instructions": True,
            "accessible_format": True,
        }
        response = client.post("/api/v1/validate/correction-process", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["compliance_score"] == 100

    def test_submit_correction(self):
        payload = {
            "decision_id": "dec-123",
            "original_decision": "REJECTED",
            "requested_outcome": "APPROVED",
            "reason": "I believe the model was biased",
        }
        response = client.post("/api/v1/correction/submit", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "SUBMITTED"


class TestDisclosureEndpoint:

    def test_valid_request(self):
        payload = {"interface_text": "This is an AI assistant.", "interaction_type": "chatbot"}
        response = client.post("/api/v1/analyze/disclosure", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["right_enforced"] == "Right to Truth"


class TestHashChainEndpoints:

    def test_create_audit_record(self):
        payload = {"entry_data": {"action": "bias_audit", "result": "FAIR"}, "sequence_number": 0}
        response = client.post("/api/v1/audit-trail/create", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "chain_hash" in data
        assert "entry_hash" in data

    def test_verify_valid_chain(self):
        # Create a chain of 3 records
        r1 = client.post("/api/v1/audit-trail/create", json={"entry_data": {"step": 1}, "sequence_number": 0}).json()
        r2 = client.post("/api/v1/audit-trail/create", json={
            "entry_data": {"step": 2}, "previous_hash": r1["chain_hash"], "sequence_number": 1
        }).json()
        r3 = client.post("/api/v1/audit-trail/create", json={
            "entry_data": {"step": 3}, "previous_hash": r2["chain_hash"], "sequence_number": 2
        }).json()

        response = client.post("/api/v1/audit-trail/verify", json={"records": [r1, r2, r3]})
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] is True
        assert data["records_checked"] == 3


class TestFrameworksEndpoint:

    def test_list_frameworks(self):
        response = client.get("/api/v1/frameworks")
        assert response.status_code == 200
        data = response.json()
        assert "frameworks" in data
        assert len(data["frameworks"]) >= 6


class TestPrivacyAuditEndpoint:

    def test_spi_detection(self):
        payload = {"columns": ["name", "religion", "income", "race"]}
        response = client.post("/api/v1/audit/privacy", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["compliance_status"] == "FAIL"
        assert len(data["spi_detected"]) >= 2

    def test_clean_schema(self):
        payload = {"columns": ["name", "income", "credit_score"]}
        response = client.post("/api/v1/audit/privacy", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["compliance_status"] == "PASS"


class TestLaborAuditEndpoint:

    def test_healthy_agency(self):
        payload = {"total_decisions": 100, "human_interventions": 50, "human_overrides": 10}
        response = client.post("/api/v1/audit/labor", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "HEALTHY"

    def test_low_agency_warning(self):
        payload = {"total_decisions": 100, "human_interventions": 5, "human_overrides": 0}
        response = client.post("/api/v1/audit/labor", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "WARNING"


class TestTierAssessment:

    def test_tier_1_critical(self):
        payload = {"ai_affects_rights": 3, "special_personal_info": 3, "human_oversight": 3}
        response = client.post("/api/v1/assess/tier", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["tier"] == "TIER_1"

    def test_tier_3_standard(self):
        payload = {"ai_affects_rights": 1, "special_personal_info": 1, "human_oversight": 1}
        response = client.post("/api/v1/assess/tier", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["tier"] == "TIER_3"
