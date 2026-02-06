from app.schemas.integrity import SystemType, UseCaseThresholds

USE_CASE_CONFIGS = {
    SystemType.HIRING: UseCaseThresholds(
        min_selection_rate=0.8,  # EEOC Four-Fifths Rule
        max_false_positive_disparity=0.05,
        required_human_review_percentage=1.0  # Tier 1 requirement often
    ),
    SystemType.FINANCE: UseCaseThresholds(
        min_selection_rate=0.9,  # Stricter for credit
        max_false_positive_disparity=0.02,
        required_human_review_percentage=0.2  # Tier 2 sample
    ),
    SystemType.HEALTHCARE: UseCaseThresholds(
        min_selection_rate=0.95,
        max_false_positive_disparity=0.01,  # Critical for diagnosis
        required_human_review_percentage=1.0
    ),
    SystemType.GOVERNMENT: UseCaseThresholds(
        min_selection_rate=0.9,
        max_false_positive_disparity=0.05,
        required_human_review_percentage=1.0  # Public accountability
    )
}

def get_use_case_thresholds(system_type: SystemType) -> UseCaseThresholds:
    return USE_CASE_CONFIGS.get(system_type, UseCaseThresholds())
