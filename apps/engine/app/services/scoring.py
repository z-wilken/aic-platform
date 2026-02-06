from app.schemas.integrity import IntegrityScoreRequest, IntegrityScoreResponse, TierLevel
from app.use_cases.configs import get_use_case_thresholds
import hashlib
import json

def calculate_integrity_score(request: IntegrityScoreRequest) -> IntegrityScoreResponse:
    thresholds = get_use_case_thresholds(request.system_type)
    
    breakdown = {}
    total_score = 0.0
    
    for name, cat in request.categories.items():
        # Normalize 0-4 scale to 0-100 for each category
        normalized_cat_score = (cat.score / 4.0) * 100
        weighted_score = normalized_cat_score * cat.weight
        breakdown[name] = round(weighted_score, 2)
        total_score += weighted_score
        
    # Apply penalty for open incidents (Citizen Appeals)
    # Each open incident reduces the score by 5 points, up to a max penalty of 25
    penalty = min(request.open_incidents * 5, 25)
    final_score = max(0, round(total_score) - penalty)
    
    # Determine Tier
    if final_score >= 80:
        tier = TierLevel.TIER_3
        status = "Automated-Permissible"
    elif final_score >= 50:
        tier = TierLevel.TIER_2
        status = "Human-Supervised"
    else:
        tier = TierLevel.TIER_1
        status = "Human-Approved"
        
    recommendations = []
    if request.open_incidents > 0:
        recommendations.append(f"Resolve {request.open_incidents} open citizen appeals to improve score.")
    
    if final_score < 80:
        recommendations.append("Enhance human oversight mechanisms to reach Tier 3.")
        
    # Generate audit hash for integrity
    audit_data = {
        "org_id": request.org_id,
        "system_id": request.system_id,
        "score": final_score,
        "breakdown": breakdown
    }
    audit_hash = hashlib.sha256(json.dumps(audit_data, sort_keys=True).encode()).hexdigest()
    
    return IntegrityScoreResponse(
        score=final_score,
        tier=tier,
        status=status,
        breakdown=breakdown,
        penalty_applied=penalty,
        recommendations=recommendations,
        audit_hash=audit_hash
    )
