"""
Shared fixtures for AIC Engine tests
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app, ENGINE_API_KEY


@pytest.fixture
def client():
    """Create a test client for the FastAPI app with auth headers."""
    c = TestClient(app)
    c.headers["X-API-Key"] = ENGINE_API_KEY or ""
    return c


@pytest.fixture
def unauthenticated_client():
    """Client without API key for testing auth rejection."""
    return TestClient(app)


@pytest.fixture
def sample_hiring_data():
    """Sample hiring decision data with potential bias"""
    return [
        {"gender": "male", "age_group": "young", "hired": 1},
        {"gender": "male", "age_group": "young", "hired": 1},
        {"gender": "male", "age_group": "middle", "hired": 1},
        {"gender": "male", "age_group": "middle", "hired": 1},
        {"gender": "male", "age_group": "senior", "hired": 0},
        {"gender": "female", "age_group": "young", "hired": 1},
        {"gender": "female", "age_group": "young", "hired": 0},
        {"gender": "female", "age_group": "middle", "hired": 0},
        {"gender": "female", "age_group": "middle", "hired": 0},
        {"gender": "female", "age_group": "senior", "hired": 0},
    ]


@pytest.fixture
def sample_fair_data():
    """Sample data with no significant bias"""
    return [
        {"group": "A", "outcome": 1},
        {"group": "A", "outcome": 1},
        {"group": "A", "outcome": 1},
        {"group": "A", "outcome": 0},
        {"group": "B", "outcome": 1},
        {"group": "B", "outcome": 1},
        {"group": "B", "outcome": 1},
        {"group": "B", "outcome": 0},
    ]


@pytest.fixture
def sample_prediction_data():
    """Sample data for equalized odds analysis"""
    return [
        {"group": "A", "actual": 1, "predicted": 1},
        {"group": "A", "actual": 1, "predicted": 1},
        {"group": "A", "actual": 1, "predicted": 0},
        {"group": "A", "actual": 0, "predicted": 0},
        {"group": "A", "actual": 0, "predicted": 0},
        {"group": "B", "actual": 1, "predicted": 1},
        {"group": "B", "actual": 1, "predicted": 0},
        {"group": "B", "actual": 0, "predicted": 0},
        {"group": "B", "actual": 0, "predicted": 1},
        {"group": "B", "actual": 0, "predicted": 0},
    ]


@pytest.fixture
def sample_correction_params():
    """Sample correction process validation parameters"""
    return {
        "has_appeal_mechanism": True,
        "response_time_hours": 24,
        "human_reviewer_assigned": True,
        "clear_instructions": True,
        "accessible_format": True,
    }


@pytest.fixture
def hostile_rejection_text():
    """Sample hostile rejection text"""
    return "Your application has been denied. You failed to meet our requirements. Unfortunately, you are ineligible for this service. We cannot help you."


@pytest.fixture
def empathetic_rejection_text():
    """Sample empathetic rejection text"""
    return "Thank you for your application. We understand this may be disappointing, but we are unable to approve your request at this time. We appreciate your effort and would like to help you explore alternative options. You may appeal this decision or speak with a support representative."


@pytest.fixture
def ai_disclosed_text():
    """Sample text with clear AI disclosure"""
    return "You are chatting with an AI assistant. I am powered by AI and can help answer your questions. If you prefer, you can request to speak with a human agent."


@pytest.fixture
def ai_hidden_text():
    """Sample text without AI disclosure"""
    return "Hello! How can I help you today? I'm here to answer any questions you might have about our services."
