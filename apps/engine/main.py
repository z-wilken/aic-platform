from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd

app = FastAPI()

class AuditRequest(BaseModel):
    # The client sends us a list of decisions
    # e.g. [{"gender": "male", "outcome": 1}, {"gender": "female", "outcome": 0}]
    data: List[Dict]
    protected_attribute: str # e.g. "gender"
    outcome_variable: str # e.g. "approved"

@app.get("/")
def health_check():
    return {"status": "AIC Audit Engine Operational", "version": "1.0.0"}

@app.post("/analyze")
def analyze_bias(request: AuditRequest):
    df = pd.DataFrame(request.data)
    
    if request.protected_attribute not in df.columns:
        raise HTTPException(status_code=400, detail=f"Column {request.protected_attribute} missing")
    
    # 1. Calculate Selection Rates per Group
    # e.g. % of Men approved vs % of Women approved
    group_stats = df.groupby(request.protected_attribute)[request.outcome_variable].mean()
    
    # 2. Find the "Privileged" Group (Highest approval rate)
    best_group = group_stats.idxmax()
    best_rate = group_stats.max()
    
    # 3. Calculate Disparate Impact Ratio for each group
    # Ratio = Minority Rate / Best Rate
    # If Ratio < 0.80, it's a flag (Four-Fifths Rule)
    report = {}
    flags = []
    
    for group, rate in group_stats.items():
        impact_ratio = rate / best_rate if best_rate > 0 else 0
        status = "PASS" if impact_ratio >= 0.8 else "FAIL"
        
        if status == "FAIL":
            flags.append(f"Bias detected against {group}. Impact Ratio: {impact_ratio:.2f}")
            
        report[group] = {
            "approval_rate": round(rate, 3),
            "disparate_impact": round(impact_ratio, 3),
            "status": status
        }
        
    return {
        "overall_status": "BIASED" if flags else "FAIR",
        "methodology": "POPIA Section 71 / Four-Fifths Rule",
        "flags": flags,
        "detailed_analysis": report
    }
