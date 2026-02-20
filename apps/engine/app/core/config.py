# AIC Engine - Global Configuration

# Task 8: DataFrame and Data Input Limits
# Prevents memory exhaustion/OOM from unbounded payloads
MAX_DATA_ROWS = 10_000
MAX_FEATURES = 500
MAX_BATCH_SIZE = 100
MAX_TEXT_LENGTH = 1_000_000 # 1MB of text

# Task 6: SHAP/LIME Model Cache configuration
MAX_CACHE_ENTRIES = 20
CACHE_TTL_SECONDS = 3600 # 1 hour

# Task 5: Middleware limits
MAX_BODY_SIZE = 10 * 1024 * 1024 # 10MB
