"""
Unit tests for drift monitoring service.
"""

import pytest
import numpy as np
from app.services.drift_monitoring import (
    calculate_psi,
    calculate_jensen_shannon,
    calculate_ks_test,
    analyze_drift,
)


class TestPSI:

    def test_identical_distributions_stable(self):
        data = list(np.random.normal(0, 1, 1000))
        result = calculate_psi(data, data)
        assert result["status"] == "STABLE"
        assert result["value"] < 0.1

    def test_shifted_distribution_detects_drift(self):
        baseline = list(np.random.normal(0, 1, 1000))
        shifted = list(np.random.normal(3, 1, 1000))  # Large shift
        result = calculate_psi(baseline, shifted)
        assert result["status"] == "DRIFT_DETECTED"
        assert result["value"] > 0.25


class TestJensenShannon:

    def test_identical_distributions(self):
        data = list(np.random.normal(0, 1, 500))
        result = calculate_jensen_shannon(data, data)
        assert result["status"] == "STABLE"
        assert result["value"] < 0.05

    def test_different_distributions(self):
        baseline = list(np.random.normal(0, 1, 500))
        shifted = list(np.random.normal(5, 1, 500))
        result = calculate_jensen_shannon(baseline, shifted)
        assert result["status"] == "DRIFT_DETECTED"


class TestKSTest:

    def test_same_distribution_not_significant(self):
        np.random.seed(42)
        data = list(np.random.normal(0, 1, 500))
        result = calculate_ks_test(data, data)
        assert result["is_significant"] is False

    def test_different_distribution_significant(self):
        np.random.seed(42)
        baseline = list(np.random.normal(0, 1, 500))
        shifted = list(np.random.normal(2, 1, 500))
        result = calculate_ks_test(baseline, shifted)
        assert result["is_significant"] is True


class TestFullDriftAnalysis:

    def test_stable_data(self):
        np.random.seed(42)
        data = list(np.random.normal(0, 1, 500))
        result = analyze_drift(data, data, "test_feature")
        assert result["overall_status"] == "STABLE"
        assert "audit_hash" in result

    def test_drifted_data(self):
        np.random.seed(42)
        baseline = list(np.random.normal(0, 1, 500))
        shifted = list(np.random.normal(3, 1, 500))
        result = analyze_drift(baseline, shifted, "income")
        assert result["overall_status"] == "DRIFT_CONFIRMED"
        assert result["feature"] == "income"

    def test_insufficient_data_returns_error(self):
        result = analyze_drift([1.0], [], "x")
        assert "error" in result

    def test_summary_statistics(self):
        np.random.seed(42)
        baseline = list(np.random.normal(0, 1, 100))
        current = list(np.random.normal(1, 1, 100))
        result = analyze_drift(baseline, current, "feature_x")
        assert "summary" in result
        assert "mean_shift" in result["summary"]
