import numpy as np
import pandas as pd
from typing import List, Dict, Any
from scipy.spatial import distance
from scipy import stats
from app.core.config import MAX_DATA_ROWS

class DriftMonitor:
    """Calculates distributional drift metrics like PSI, Jensen-Shannon, and KS Test."""

    def calculate_psi(self, expected: np.ndarray, actual: np.ndarray, buckets: int = 10) -> Dict[str, Any]:
        """Calculates the Population Stability Index (PSI)."""
        min_val = min(expected.min(), actual.min())
        max_val = max(expected.max(), actual.max())
        
        expected_percents = np.histogram(expected, bins=buckets, range=(min_val, max_val))[0] / len(expected)
        actual_percents = np.histogram(actual, bins=buckets, range=(min_val, max_val))[0] / len(actual)

        expected_percents = np.where(expected_percents == 0, 0.0001, expected_percents)
        actual_percents = np.where(actual_percents == 0, 0.0001, actual_percents)

        psi_value = np.sum((actual_percents - expected_percents) * np.log(actual_percents / expected_percents))
        
        status = "STABLE"
        if psi_value >= 0.25: status = "CRITICAL_DRIFT"
        elif psi_value >= 0.1: status = "WARNING_DRIFT"

        return {"metric": "PSI", "value": round(float(psi_value), 4), "status": status}

    def calculate_js_divergence(self, expected: np.ndarray, actual: np.ndarray, buckets: int = 10) -> Dict[str, Any]:
        """Calculates the Jensen-Shannon Divergence."""
        min_val = min(expected.min(), actual.min())
        max_val = max(expected.max(), actual.max())
        
        p = np.histogram(expected, bins=buckets, range=(min_val, max_val))[0] / len(expected)
        q = np.histogram(actual, bins=buckets, range=(min_val, max_val))[0] / len(actual)
        
        js_dist = distance.jensenshannon(p, q, base=2)
        js_div = js_dist ** 2
        
        return {"metric": "JS Divergence", "value": round(float(js_div), 4), "status": "STABLE" if js_div < 0.1 else "SHIFTED"}

def analyze_drift(baseline: List[float], current: List[float], feature_name: str, n_bins: int = 10):
    if len(baseline) > MAX_DATA_ROWS or len(current) > MAX_DATA_ROWS:
        return {"error": f"Data too large. Maximum is {MAX_DATA_ROWS} rows."}
        
    monitor = DriftMonitor()
    e = np.array(baseline)
    a = np.array(current)
    
    psi = monitor.calculate_psi(e, a, n_bins)
    js = monitor.calculate_js_divergence(e, a, n_bins)
    ks_stat, p_val = stats.ks_2samp(e, a)
    
    return {
        "feature": feature_name,
        "psi": psi,
        "js_divergence": js,
        "ks_test": {"statistic": round(float(ks_stat), 4), "p_value": round(float(p_val), 4), "significant": bool(p_val < 0.05)},
        "status": "STABLE" if (psi["status"] == "STABLE" and p_val > 0.05) else "DRIFT_DETECTED"
    }