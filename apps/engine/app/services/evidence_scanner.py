from typing import List, Dict, Any
import re

class EvidenceScanner:
    """Scans organization evidence (policies, specs) for POPIA Section 71 compliance markers."""

    # Markers required for meaningful human intervention
    POPIA_SECTION_71_MARKERS = {
        "human_intervention": [
            r"human intervention", r"manual override", r"human review", 
            r"human-in-the-loop", r"person shall review"
        ],
        "recourse_mechanism": [
            r"appeal", r"contest", r"representation", r"reconsider", 
            r"right to be heard"
        ],
        "explanation_logic": [
            r"logic involved", r"explanation", r"how the decision", 
            r"interpretable", r"transparency"
        ],
        "data_minimization": [
            r"minimization", r"special personal information", r"de-identified",
            r"anonymized"
        ]
    }

    def scan_text(self, text: str) -> Dict[str, Any]:
        results = {}
        findings = []
        missing = []
        total_score = 0
        
        text_lower = text.lower()

        for category, patterns in self.POPIA_SECTION_71_MARKERS.items():
            found_in_cat = []
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    found_in_cat.append(pattern)
            
            if found_in_cat:
                results[category] = {"status": "FOUND", "matches": found_in_cat}
                total_score += 25
                findings.append(f"Compliance marker found for {category.replace('_', ' ')}.")
            else:
                results[category] = {"status": "MISSING"}
                missing.append(category.replace('_', ' '))
                findings.append(f"WARNING: No markers found for {category.replace('_', ' ')}.")

        return {
            "right_enforced": "Regulatory Verification",
            "verification_score": total_score,
            "status": "VERIFIED" if total_score >= 75 else "REMEDIATION_REQUIRED",
            "categories": results,
            "findings": findings,
            "missing_elements": missing,
            "recommendation": "Document meets technical compliance standards." if total_score >= 75 else "Document lacks specific legal language required for POPIA Section 71."
        }

def scan_evidence(text: str):
    scanner = EvidenceScanner()
    return scanner.scan_text(text)
