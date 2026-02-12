from typing import List, Dict, Any
import pandas as pd
import numpy as np

class RedTeamAuditor:
    """Actively discovers hidden proxies and unintended biases in AI datasets."""

    def discover_proxies(self, data: List[Dict], protected_attribute: str, other_columns: List[str]) -> Dict[str, Any]:
        """Identifies columns that are highly correlated with a protected attribute (Hidden Proxies)."""
        df = pd.DataFrame(data)
        
        if protected_attribute not in df.columns:
            return {"error": f"Protected attribute '{protected_attribute}' not found in data."}

        proxies = []
        findings = []
        
        # Convert protected attribute to numeric for correlation if it's categorical
        if df[protected_attribute].dtype == 'object':
            df[f"{protected_attribute}_encoded"] = df[protected_attribute].astype('category').cat.codes
            target_col = f"{protected_attribute}_encoded"
        else:
            target_col = protected_attribute

        for col in other_columns:
            if col == protected_attribute or col == target_col:
                continue
            
            # Simple correlation for numeric, or use Mutual Information/Chi-Square for categorical
            # For the Alpha engine, we use a correlation threshold of 0.7
            try:
                if df[col].dtype == 'object':
                    # Categorical proxy check
                    df[f"{col}_encoded"] = df[col].astype('category').cat.codes
                    correlation = df[f"{col}_encoded"].corr(df[target_col])
                else:
                    correlation = df[col].corr(df[target_col])
                
                abs_corr = abs(correlation)
                
                if abs_corr >= 0.7:
                    proxies.append({
                        "column": col,
                        "correlation_strength": round(abs_corr, 4),
                        "risk": "CRITICAL" if abs_corr >= 0.85 else "HIGH"
                    })
                    findings.append(f"PROXY DETECTED: Column '{col}' is a {proxies[-1]['risk']} proxy for '{protected_attribute}' (Strength: {abs_corr:.2f}).")
            except Exception:  # nosec
                continue

        score = max(0, 100 - (len(proxies) * 20))

        return {
            "right_enforced": "Right to Truth (Proxy Audit)",
            "red_team_score": score,
            "proxies_identified": proxies,
            "findings": findings,
            "recommendation": "Remove identified proxies to ensure POPIA Section 71 compliance." if proxies else "No significant proxies detected in the provided schema."
        }

def red_team_audit(data: List[Dict], protected_attribute: str, other_columns: List[str]):
    auditor = RedTeamAuditor()
    return auditor.discover_proxies(data, protected_attribute, other_columns)
