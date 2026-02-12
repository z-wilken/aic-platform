import logging
import time
import os
import secrets
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
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

# Track boot time for uptime reporting
_boot_time = time.time()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Max request body size: 10 MB
MAX_BODY_SIZE = 10 * 1024 * 1024

# Engine API key — loaded from env, or auto-generated in development
ENGINE_API_KEY = os.environ.get("ENGINE_API_KEY")
if not ENGINE_API_KEY and os.environ.get("NODE_ENV") != "production":
    ENGINE_API_KEY = f"dev_{secrets.token_hex(16)}"
    logger.info(f"Auto-generated ENGINE_API_KEY for development: {ENGINE_API_KEY[:12]}...")

# Paths that don't require authentication
PUBLIC_PATHS = {"/", "/health", "/docs", "/redoc", "/openapi.json"}


class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """Reject requests with bodies larger than MAX_BODY_SIZE to prevent DoS."""

    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > MAX_BODY_SIZE:
            return JSONResponse(
                status_code=413,
                content={"error": "Request body too large", "max_bytes": MAX_BODY_SIZE},
            )
        return await call_next(request)


class APIKeyAuthMiddleware(BaseHTTPMiddleware):
    """
    Validates X-API-Key header on protected endpoints.
    Health checks, docs, and OPTIONS requests are exempt.
    """

    async def dispatch(self, request: Request, call_next):
        # Skip auth for public paths, OPTIONS, and when no key is configured
        if (
            request.url.path in PUBLIC_PATHS
            or request.method == "OPTIONS"
            or ENGINE_API_KEY is None
        ):
            return await call_next(request)

        api_key = request.headers.get("X-API-Key") or request.headers.get("x-api-key")
        if not api_key:
            return JSONResponse(
                status_code=401,
                content={"error": "Missing X-API-Key header"},
            )

        if not secrets.compare_digest(api_key, ENGINE_API_KEY):
            logger.warning(f"Invalid API key attempt from {request.client.host}")
            return JSONResponse(
                status_code=403,
                content={"error": "Invalid API key"},
            )

        return await call_next(request)


app = FastAPI(
    title="AIC Audit Engine",
    description="AI Integrity Certification - Enforcing the 5 Algorithmic Rights",
    version="3.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Request size limit — must be added before CORS
app.add_middleware(RequestSizeLimitMiddleware)

# API key authentication — must be added after CORS to not block preflight
app.add_middleware(APIKeyAuthMiddleware)

# CORS middleware — restricted to known origins and methods
allowed_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3004").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-API-Key"],
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
    """Basic health check — used by Docker HEALTHCHECK and load balancers."""
    return {
        "status": "AIC Audit Engine Operational",
        "version": "3.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/health")
def detailed_health():
    """
    Detailed health check with dependency verification.
    Use this for monitoring dashboards and readiness probes.
    """
    checks = {}

    # 1. Core library availability
    try:
        import pandas
        import scipy
        import numpy
        checks["libraries"] = {
            "status": "ok",
            "pandas": pandas.__version__,
            "scipy": scipy.__version__,
            "numpy": numpy.__version__,
        }
    except ImportError as e:
        checks["libraries"] = {"status": "error", "detail": str(e)}

    # 2. TextBlob availability (used for empathy analysis)
    try:
        from textblob import TextBlob
        TextBlob("test").sentiment
        checks["textblob"] = {"status": "ok"}
    except Exception as e:
        checks["textblob"] = {"status": "error", "detail": str(e)}

    # 3. Uptime
    uptime_seconds = round(time.time() - _boot_time, 1)

    all_ok = all(c.get("status") == "ok" for c in checks.values())

    return {
        "status": "healthy" if all_ok else "degraded",
        "version": "3.0.0",
        "timestamp": datetime.utcnow().isoformat(),
        "uptime_seconds": uptime_seconds,
        "checks": checks,
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
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)  # nosec
