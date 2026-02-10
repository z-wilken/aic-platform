import numpy as np
import pandas as pd
from typing import List, Dict, Any

class DriftMonitor:
    """Calculates distributional drift metrics like PSI and Jensen-Shannon Divergence."""

    def calculate_psi(self, expected: np.ndarray, actual: np.ndarray, buckets: int = 10) -> Dict[str, Any]:
        """
        Calculates the Population Stability Index (PSI).
        PSI = sum((Actual % - Expected %) * ln(Actual % / Expected %))
        """
        
        def scale_range(input_array, min_val, max_array):
            return (input_array - min_val) / (max_array - min_val)

        min_val = min(expected.min(), actual.min())
        max_val = max(expected.max(), actual.max())
        
        expected_scaled = scale_range(expected, min_val, max_val)
        actual_scaled = scale_range(actual, min_val, max_val)

        expected_percents = np.histogram(expected_scaled, bins=buckets, range=(0, 1))[0] / len(expected)
        actual_percents = np.histogram(actual_scaled, bins=buckets, range=(0, 1))[0] / len(actual)

        # Add small constant to avoid division by zero
        expected_percents = np.where(expected_percents == 0, 0.0001, expected_percents)
        actual_percents = np.where(actual_percents == 0, 0.0001, actual_percents)

        psi_value = np.sum((actual_percents - expected_percents) * np.log(actual_percents / expected_percents))
        
        status = "STABLE"
        if psi_value >= 0.25:
            status = "CRITICAL_DRIFT"
        elif psi_value >= 0.1:
            status = "WARNING_DRIFT"

        return {
            "metric": "Population Stability Index (PSI)",
            "value": round(float(psi_value), 4),
            "status": status,
            "buckets": buckets,
            "recommendation": "Investigate model drift and consider retraining." if psi_value >= 0.1 else "Model distribution is stable."
        }

def get_psi_drift(expected_data: List[float], actual_data: List[float]):
    monitor = DriftMonitor()
    return monitor.calculate_psi(np.array(expected_data), np.array(actual_data))
