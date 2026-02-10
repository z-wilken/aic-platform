"""
Advanced Fairness Metrics Service
Implements Statistical Parity Difference and epsilon-Differential Fairness.
Supplements the core Four-Fifths Rule in bias_analysis.py.
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Any
import hashlib
import json
from itertools import combinations


def _generate_hash(data: Dict) -> str:
    json_str = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(json_str.encode()).hexdigest()


def statistical_parity_difference(
    data: List[Dict],
    protected_attribute: str,
    outcome_variable: str,
) -> Dict[str, Any]:
    """
    Statistical Parity Difference (SPD).
    Measures the absolute difference in positive outcome rates between groups.
    SPD = P(Y=1 | G=privileged) - P(Y=1 | G=unprivileged)

    Thresholds:
        |SPD| < 0.05 => FAIR
        |SPD| 0.05-0.10 => WARNING
        |SPD| > 0.10 => BIASED
    """
    df = pd.DataFrame(data)

    if protected_attribute not in df.columns:
        return {"error": f"Column '{protected_attribute}' not found"}
    if outcome_variable not in df.columns:
        return {"error": f"Column '{outcome_variable}' not found"}

    group_rates = df.groupby(protected_attribute)[outcome_variable].mean()

    if len(group_rates) < 2:
        return {"error": "Need at least 2 groups for comparison"}

    # Compare all pairs
    pairwise_results = {}
    flags = []
    max_spd = 0.0

    groups = list(group_rates.index)
    for g1, g2 in combinations(groups, 2):
        spd = float(group_rates[g1] - group_rates[g2])
        abs_spd = abs(spd)
        max_spd = max(max_spd, abs_spd)

        if abs_spd > 0.10:
            status = "BIASED"
            flags.append(f"Significant parity gap between {g1} and {g2}: {spd:+.4f}")
        elif abs_spd > 0.05:
            status = "WARNING"
            flags.append(f"Marginal parity gap between {g1} and {g2}: {spd:+.4f}")
        else:
            status = "FAIR"

        pair_key = f"{g1} vs {g2}"
        pairwise_results[pair_key] = {
            "spd": round(spd, 4),
            "abs_spd": round(abs_spd, 4),
            "status": status,
            "group_rates": {
                str(g1): round(float(group_rates[g1]), 4),
                str(g2): round(float(group_rates[g2]), 4),
            },
        }

    overall = "BIASED" if max_spd > 0.10 else "WARNING" if max_spd > 0.05 else "FAIR"

    result = {
        "right_enforced": "Right to Human Agency",
        "overall_status": overall,
        "methodology": "Statistical Parity Difference",
        "max_absolute_spd": round(max_spd, 4),
        "thresholds": {"fair": "<0.05", "warning": "0.05-0.10", "biased": ">0.10"},
        "flags": flags,
        "pairwise_analysis": pairwise_results,
        "group_positive_rates": {str(k): round(float(v), 4) for k, v in group_rates.items()},
        "recommendations": (
            flags if flags else ["No significant parity differences detected. Continue monitoring."]
        ),
    }
    result["audit_hash"] = _generate_hash(result)
    return result


def epsilon_differential_fairness(
    data: List[Dict],
    protected_attributes: List[str],
    outcome_variable: str,
    epsilon: float = 0.8,
    min_group_size: int = 10,
) -> Dict[str, Any]:
    """
    ε-Differential Fairness for intersectional subgroups.
    For all subgroups S_i, S_j:
        e^{-ε} <= P(Y=1|S_i) / P(Y=1|S_j) <= e^{ε}

    A smaller epsilon means stricter fairness.
    Default ε=0.8 corresponds roughly to the Four-Fifths Rule.
    """
    df = pd.DataFrame(data)

    for attr in protected_attributes:
        if attr not in df.columns:
            return {"error": f"Column '{attr}' not found"}

    df["_subgroup"] = df[protected_attributes].astype(str).agg(" + ".join, axis=1)

    group_stats = df.groupby("_subgroup")[outcome_variable].agg(["mean", "count"])
    group_stats.columns = ["rate", "count"]
    group_stats = group_stats[group_stats["count"] >= min_group_size]

    if len(group_stats) < 2:
        return {"error": f"Fewer than 2 subgroups with minimum size {min_group_size}"}

    lower_bound = np.exp(-epsilon)
    upper_bound = np.exp(epsilon)

    violations = []
    groups = list(group_stats.index)

    for g1, g2 in combinations(groups, 2):
        r1 = float(group_stats.loc[g1, "rate"])
        r2 = float(group_stats.loc[g2, "rate"])

        if r2 > 0:
            ratio = r1 / r2
        else:
            ratio = float("inf") if r1 > 0 else 1.0

        if ratio < lower_bound or ratio > upper_bound:
            violations.append({
                "group_1": g1,
                "group_2": g2,
                "rate_1": round(r1, 4),
                "rate_2": round(r2, 4),
                "ratio": round(ratio, 4),
                "bounds": {"lower": round(lower_bound, 4), "upper": round(upper_bound, 4)},
            })

    is_fair = len(violations) == 0

    result = {
        "right_enforced": "Right to Human Agency",
        "overall_status": "FAIR" if is_fair else "BIASED",
        "methodology": f"ε-Differential Fairness (ε={epsilon})",
        "epsilon": epsilon,
        "bounds": {"lower": round(lower_bound, 4), "upper": round(upper_bound, 4)},
        "subgroups_analyzed": len(group_stats),
        "violations": violations,
        "violation_count": len(violations),
        "group_rates": {
            str(k): {"rate": round(float(v["rate"]), 4), "count": int(v["count"])}
            for k, v in group_stats.iterrows()
        },
        "flags": [
            f"ε-fairness violation: {v['group_1']} vs {v['group_2']} (ratio: {v['ratio']})"
            for v in violations
        ],
    }
    result["audit_hash"] = _generate_hash(result)
    return result
