import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from datetime import datetime

# Structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("aic.engine")

# Install PII redaction on all log output
from app.core.pii_filter import install_pii_filter  # noqa: E402
install_pii_filter()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="AIC Audit Engine",
    description="AI Integrity Certification - Enforcing the 5 Algorithmic Rights",
    version="3.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware — restricted to known origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3004",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": "An unexpected error occurred. This incident has been logged.",
        },
    )


# Import and register routers
from app.api.v1.endpoints import analysis  # noqa: E402

app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])


@app.get("/")
def health_check():
    """Health check with capabilities listing"""
    return {
        "status": "AIC Audit Engine Operational",
        "version": "3.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "capabilities": [
            "disparate_impact",
            "equalized_odds",
            "intersectional_analysis",
            "statistical_parity_difference",
            "epsilon_differential_fairness",
            "drift_monitoring",
            "decision_explanation",
            "empathy_analysis",
            "correction_validation",
            "disclosure_analysis",
            "hash_chain_verification",
            "privacy_audit",
            "labor_audit",
            "red_team_audit",
            "integrity_scoring",
        ],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
