"""
Edge case tests for bias analysis.
Ensures robustness against empty datasets, missing features, and division by zero.
"""

import pytest
from app.services.bias_analysis import (
    analyze_disparate_impact,
    analyze_equalized_odds,
    explain_decision,
)

def test_disparate_impact_empty_data():
    """Empty data should return an error or handle gracefully."""
    # Current implementation uses pandas groupby which might fail on empty
    result = analyze_disparate_impact([], "gender", "hired")
    assert "error" in result

def test_disparate_impact_zero_selection_rate():
    """Test when the reference group has a zero selection rate (division by zero)."""
    data = [
        {"gender": "M", "hired": 0},
        {"gender": "F", "hired": 1},
    ]
    result = analyze_disparate_impact(data, "gender", "hired")
    # Reference group (F) has 100%, M has 0%. Ratio should be 0.
    assert result["reference_group"] == "F"
    assert result["detailed_analysis"]["M"]["disparate_impact_ratio"] == 0.0

def test_equalized_odds_empty_groups():
    """Test equalized odds with groups that have no positive or negative outcomes."""
    data = [
        {"group": "A", "actual": 1, "predicted": 1},
        {"group": "B", "actual": 0, "predicted": 0},
    ]
    result = analyze_equalized_odds(data, "group", "actual", "predicted", 0.1)
    # Group A has no negative cases (cannot compute FPR)
    # Group B has no positive cases (cannot compute TPR)
    # Metrics should be 0 or handle gracefully
    assert "detailed_analysis" in result
    assert result["detailed_analysis"]["A"]["false_positive_rate"] == 0.0
    assert result["detailed_analysis"]["B"]["true_positive_rate"] == 0.0

def test_explain_decision_missing_weights():
    """Explanation should work even if feature weights are missing."""
    result = explain_decision(
        model_type="credit_scoring",
        input_features={"income": 50000},
        decision="APPROVED",
        feature_weights=None
    )
    assert result["explainability_score"] == 60
    assert "Key Factors" not in result["explanation"]
    assert "APPROVED" in result["explanation"]

def test_explain_decision_empty_features():
    """Explanation should work with no input features."""
    result = explain_decision(
        model_type="generic",
        input_features={},
        decision="YES",
    )
    assert "YES" in result["explanation"]
