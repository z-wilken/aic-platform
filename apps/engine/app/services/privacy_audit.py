from typing import List, Dict, Any
import re

class PrivacyAuditor:
    """Audits AI systems for POPIA Special Personal Information (SPI) compliance."""
    
    SPI_PATTERNS = {
        "religious_beliefs": [r"religion", r"church", r"belief", r"faith"],
        "race_ethnic_origin": [r"race", r"ethnicity", r"origin", r"tribe"],
        "trade_union_membership": [r"union", r"labor group", r"membership"],
        "political_persuasion": [r"politics", r"voter", r"party", r"candidate"],
        "health_biometrics": [r"health", r"medical", r"biometric", r"dna", r"fingerprint"],
        "criminal_behavior": [r"arrest", r"conviction", r"criminal", r"offense"]
    }

    def audit_data_schema(self, columns: List[str]) -> Dict[str, Any]:
        findings = []
        spi_detected = []
        
        for col in columns:
            col_lower = col.lower()
            for spi_type, patterns in self.SPI_PATTERNS.items():
                if any(re.search(p, col_lower) for p in patterns):
                    spi_detected.append({"field": col, "type": spi_type})
                    findings.append(f"CRITICAL: Special Personal Information detected in field '{col}' ({spi_type}).")

        score = max(0, 100 - (len(spi_detected) * 15))
        
        return {
            "right_enforced": "Right to Privacy (POPIA)",
            "integrity_score": score,
            "spi_detected": spi_detected,
            "findings": findings,
            "compliance_status": "FAIL" if len(spi_detected) > 0 else "PASS",
            "recommendation": "Implement de-identification or secure explicit consent for SPI." if spi_detected else "No SPI detected in direct schema."
        }

def audit_privacy(columns: List[str]):
    auditor = PrivacyAuditor()
    return auditor.audit_data_schema(columns)
