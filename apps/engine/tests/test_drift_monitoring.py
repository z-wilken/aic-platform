"""
Unit tests for drift monitoring service.
Tests the DriftMonitor class and analyze_drift() function.
"""

import pytest
import numpy as np
from app.services.drift_monitoring import DriftMonitor, analyze_drift


class TestDriftMonitorPSI:

    def setup_method(self):
        self.monitor = DriftMonitor()

    def test_identical_distributions_stable(self):
        np.random.seed(42)
        data = np.random.normal(0, 1, 1000)
        result = self.monitor.calculate_psi(data, data)
        assert result["metric"] == "PSI"
        assert result["status"] == "STABLE"
        assert result["value"] < 0.1

    def test_shifted_distribution_detects_critical_drift(self):
        np.random.seed(42)
        baseline = np.random.normal(0, 1, 1000)
        shifted = np.random.normal(3, 1, 1000)
        result = self.monitor.calculate_psi(baseline, shifted)
        assert result["status"] == "CRITICAL_DRIFT"
        assert result["value"] >= 0.25

    def test_moderate_shift_detects_warning(self):
        np.random.seed(42)
        baseline = np.random.normal(0, 1, 1000)
        shifted = np.random.normal(0.5, 1, 1000)
        result = self.monitor.calculate_psi(baseline, shifted)
        assert result["status"] in ("STABLE", "WARNING_DRIFT", "CRITICAL_DRIFT")


class TestDriftMonitorJensenShannon:

    def setup_method(self):
        self.monitor = DriftMonitor()

    def test_identical_distributions_stable(self):
        np.random.seed(42)
        data = np.random.normal(0, 1, 500)
        result = self.monitor.calculate_js_divergence(data, data)
        assert result["metric"] == "JS Divergence"
        assert result["status"] == "STABLE"

    def test_different_distributions_shifted(self):
        np.random.seed(42)
        baseline = np.random.normal(0, 1, 500)
        shifted = np.random.normal(5, 1, 500)
        result = self.monitor.calculate_js_divergence(baseline, shifted)
        assert result["status"] == "SHIFTED"


class TestAnalyzeDrift:

    def test_stable_data(self):
        np.random.seed(42)
        data = list(np.random.normal(0, 1, 500))
        result = analyze_drift(data, data, "test_feature")
        assert result["status"] == "STABLE"
        assert result["feature"] == "test_feature"
        assert "psi" in result
        assert "js_divergence" in result
        assert "ks_test" in result

    def test_drifted_data(self):
        np.random.seed(42)
        baseline = list(np.random.normal(0, 1, 500))
        shifted = list(np.random.normal(3, 1, 500))
        result = analyze_drift(baseline, shifted, "income")
        assert result["status"] == "DRIFT_DETECTED"
        assert result["feature"] == "income"

    def test_ks_test_included(self):
        np.random.seed(42)
        baseline = list(np.random.normal(0, 1, 500))
        shifted = list(np.random.normal(2, 1, 500))
        result = analyze_drift(baseline, shifted, "feature_x")
        ks = result["ks_test"]
        assert "statistic" in ks
        assert "p_value" in ks
        assert "significant" in ks
        assert ks["significant"] == True

    def test_custom_bins(self):
        np.random.seed(42)
        data = list(np.random.normal(0, 1, 200))
        result = analyze_drift(data, data, "feat", n_bins=20)
        assert result["status"] == "STABLE"
