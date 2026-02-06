from typing import Dict, Any

class LaborImpactAuditor:
    """Measures the degree of human displacement vs agency in automated systems."""

    def calculate_agency_ratio(self, total_decisions: int, human_interventions: int, human_overrides: int) -> Dict[str, Any]:
        if total_decisions == 0:
            return {"error": "Total decisions cannot be zero"}

        # Agency Ratio: How much of the process is human-steered
        agency_ratio = (human_interventions / total_decisions) * 100
        
        # Automation Density: Inverse of agency
        automation_density = 100 - agency_ratio

        tier_recommendation = "TIER_1" if automation_density > 80 else "TIER_2" if automation_density > 40 else "TIER_3"

        findings = []
        if automation_density > 90:
            findings.append("DANGER: High automation density detected. Significant risk of total human displacement.")
        elif agency_ratio > 50:
            findings.append("Positive: Strong human agency maintained in the decision loop.")

        return {
            "right_enforced": "Right to Human Agency",
            "agency_ratio": round(agency_ratio, 2),
            "automation_density": round(automation_density, 2),
            "human_overrides": human_overrides,
            "findings": findings,
            "recommended_risk_tier": tier_recommendation,
            "status": "HEALTHY" if agency_ratio > 20 else "WARNING"
        }

def audit_labor(total_decisions: int, human_interventions: int, human_overrides: int):
    auditor = LaborImpactAuditor()
    return auditor.calculate_agency_ratio(total_decisions, human_interventions, human_overrides)
