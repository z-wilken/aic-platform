"""
Unit tests for advanced fairness metrics.
"""

import pytest
from app.services.fairness_metrics import (
    statistical_parity_difference,
    epsilon_differential_fairness,
)


def make_equal_data():
    """Both groups have 50% positive rate."""
    return [
        {"group": "A", "outcome": 1}, {"group": "A", "outcome": 0},
        {"group": "A", "outcome": 1}, {"group": "A", "outcome": 0},
        {"group": "B", "outcome": 1}, {"group": "B", "outcome": 0},
        {"group": "B", "outcome": 1}, {"group": "B", "outcome": 0},
    ]


def make_unequal_data():
    """Group A: 90% positive, Group B: 30% positive."""
    data = []
    for _ in range(90):
        data.append({"group": "A", "outcome": 1})
    for _ in range(10):
        data.append({"group": "A", "outcome": 0})
    for _ in range(30):
        data.append({"group": "B", "outcome": 1})
    for _ in range(70):
        data.append({"group": "B", "outcome": 0})
    return data


class TestStatisticalParityDifference:

    def test_fair_data(self):
        result = statistical_parity_difference(make_equal_data(), "group", "outcome")
        assert result["overall_status"] == "FAIR"
        assert result["max_absolute_spd"] < 0.05

    def test_biased_data(self):
        result = statistical_parity_difference(make_unequal_data(), "group", "outcome")
        assert result["overall_status"] == "BIASED"
        assert result["max_absolute_spd"] > 0.10

    def test_missing_column(self):
        result = statistical_parity_difference(make_equal_data(), "nonexistent", "outcome")
        assert "error" in result

    def test_pairwise_analysis_present(self):
        result = statistical_parity_difference(make_unequal_data(), "group", "outcome")
        assert len(result["pairwise_analysis"]) > 0

    def test_audit_hash(self):
        result = statistical_parity_difference(make_equal_data(), "group", "outcome")
        assert "audit_hash" in result
        assert len(result["audit_hash"]) == 64


class TestEpsilonDifferentialFairness:

    def test_fair_data(self):
        result = epsilon_differential_fairness(
            make_equal_data(), ["group"], "outcome", epsilon=0.8, min_group_size=2
        )
        assert result["overall_status"] == "FAIR"
        assert result["violation_count"] == 0

    def test_biased_data(self):
        result = epsilon_differential_fairness(
            make_unequal_data(), ["group"], "outcome", epsilon=0.8, min_group_size=2
        )
        assert result["overall_status"] == "BIASED"
        assert result["violation_count"] > 0

    def test_strict_epsilon(self):
        """With very strict epsilon, even small differences become violations."""
        result = epsilon_differential_fairness(
            make_unequal_data(), ["group"], "outcome", epsilon=0.1, min_group_size=2
        )
        assert result["violation_count"] > 0

    def test_min_group_size_filters(self):
        small_data = [{"group": "A", "outcome": 1}]
        result = epsilon_differential_fairness(
            small_data, ["group"], "outcome", min_group_size=10
        )
        assert "error" in result
