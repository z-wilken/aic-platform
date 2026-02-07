"""
Drift Monitoring Service
Detects distribution shifts between baseline and current data populations.
Implements PSI, Jensen-Shannon Divergence, and basic KS testing.
"""

import numpy as np
from scipy import stats
from typing import List, Dict, Any, Optional
import hashlib
import json
from datetime import datetime


def _to_bins(baseline: List[float], current: List[float], n_bins: int = 10) -> tuple:
    """Bin two distributions using shared bin edges from the baseline."""
    combined_min = min(min(baseline), min(current))
    combined_max = max(max(baseline), max(current))
    bin_edges = np.linspace(combined_min, combined_max, n_bins + 1)

    baseline_counts, _ = np.histogram(baseline, bins=bin_edges)
    current_counts, _ = np.histogram(current, bins=bin_edges)

    # Add small epsilon to avoid division by zero / log(0)
    eps = 1e-8
    baseline_pct = (baseline_counts + eps) / (sum(baseline_counts) + eps * n_bins)
    current_pct = (current_counts + eps) / (sum(current_counts) + eps * n_bins)

    return baseline_pct, current_pct, bin_edges


def calculate_psi(baseline: List[float], current: List[float], n_bins: int = 10) -> Dict[str, Any]:
    """
    Population Stability Index.
    PSI < 0.1  => No significant shift
    PSI 0.1-0.25 => Moderate shift (investigate)
    PSI > 0.25 => Significant shift (action required)
    """
    baseline_pct, current_pct, _ = _to_bins(baseline, current, n_bins)

    psi_values = (current_pct - baseline_pct) * np.log(current_pct / baseline_pct)
    psi = float(np.sum(psi_values))

    if psi < 0.1:
        status = "STABLE"
        recommendation = "No significant distribution shift detected."
    elif psi < 0.25:
        status = "WARNING"
        recommendation = "Moderate distribution shift. Investigate data pipeline and feature changes."
    else:
        status = "DRIFT_DETECTED"
        recommendation = "Significant distribution shift. Retrain model or audit data source immediately."

    return {
        "metric": "Population Stability Index (PSI)",
        "value": round(psi, 6),
        "status": status,
        "thresholds": {"stable": "<0.10", "warning": "0.10-0.25", "critical": ">0.25"},
        "recommendation": recommendation,
        "baseline_size": len(baseline),
        "current_size": len(current),
    }


def calculate_jensen_shannon(baseline: List[float], current: List[float], n_bins: int = 10) -> Dict[str, Any]:
    """
    Jensen-Shannon Divergence (symmetric variant of KL divergence).
    Range: 0 (identical) to ln(2) ≈ 0.693 (maximally different).
    Threshold: >0.1 is typically concerning.
    """
    baseline_pct, current_pct, _ = _to_bins(baseline, current, n_bins)

    # M = average of the two distributions
    m = 0.5 * (baseline_pct + current_pct)

    kl_baseline_m = float(np.sum(baseline_pct * np.log(baseline_pct / m)))
    kl_current_m = float(np.sum(current_pct * np.log(current_pct / m)))

    jsd = 0.5 * kl_baseline_m + 0.5 * kl_current_m

    if jsd < 0.05:
        status = "STABLE"
        recommendation = "Distributions are effectively identical."
    elif jsd < 0.1:
        status = "WARNING"
        recommendation = "Minor divergence detected. Monitor closely."
    else:
        status = "DRIFT_DETECTED"
        recommendation = "Significant divergence. Investigate root cause and consider retraining."

    return {
        "metric": "Jensen-Shannon Divergence",
        "value": round(jsd, 6),
        "status": status,
        "thresholds": {"stable": "<0.05", "warning": "0.05-0.10", "critical": ">0.10"},
        "recommendation": recommendation,
    }


def calculate_ks_test(baseline: List[float], current: List[float]) -> Dict[str, Any]:
    """
    Kolmogorov-Smirnov two-sample test.
    Tests whether two samples come from the same distribution.
    """
    ks_stat, p_value = stats.ks_2samp(baseline, current)

    is_significant = p_value < 0.05

    return {
        "metric": "Kolmogorov-Smirnov Test",
        "ks_statistic": round(float(ks_stat), 6),
        "p_value": round(float(p_value), 6),
        "is_significant": is_significant,
        "status": "DRIFT_DETECTED" if is_significant else "STABLE",
        "recommendation": (
            "Statistically significant distribution shift detected (p < 0.05)."
            if is_significant
            else "No statistically significant shift detected."
        ),
    }


def _generate_hash(data: Dict) -> str:
    json_str = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(json_str.encode()).hexdigest()


def analyze_drift(
    baseline_data: List[float],
    current_data: List[float],
    feature_name: str,
    n_bins: int = 10,
) -> Dict[str, Any]:
    """
    Run full drift analysis on a single feature: PSI + JSD + KS test.
    """
    if len(baseline_data) < 2 or len(current_data) < 2:
        return {"error": "Both baseline and current data must have at least 2 observations."}

    psi_result = calculate_psi(baseline_data, current_data, n_bins)
    jsd_result = calculate_jensen_shannon(baseline_data, current_data, n_bins)
    ks_result = calculate_ks_test(baseline_data, current_data)

    # Overall drift verdict
    drift_signals = sum(
        1
        for r in [psi_result, jsd_result, ks_result]
        if r.get("status") == "DRIFT_DETECTED"
    )

    if drift_signals >= 2:
        overall = "DRIFT_CONFIRMED"
        recommendation = "Multiple metrics confirm distribution drift. Immediate investigation required."
    elif drift_signals == 1:
        overall = "DRIFT_POSSIBLE"
        recommendation = "One metric indicates drift. Monitor closely and investigate if trend continues."
    else:
        overall = "STABLE"
        recommendation = "No drift detected across all metrics."

    result = {
        "feature": feature_name,
        "overall_status": overall,
        "recommendation": recommendation,
        "timestamp": datetime.utcnow().isoformat(),
        "metrics": {
            "psi": psi_result,
            "jensen_shannon": jsd_result,
            "kolmogorov_smirnov": ks_result,
        },
        "summary": {
            "baseline_mean": round(float(np.mean(baseline_data)), 4),
            "current_mean": round(float(np.mean(current_data)), 4),
            "baseline_std": round(float(np.std(baseline_data)), 4),
            "current_std": round(float(np.std(current_data)), 4),
            "mean_shift": round(float(np.mean(current_data) - np.mean(baseline_data)), 4),
        },
    }

    result["audit_hash"] = _generate_hash(result)
    return result
