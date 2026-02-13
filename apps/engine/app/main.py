import logging
import time
import os
import secrets
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from starlette.middleware.base import BaseHTTPMiddleware
from datetime import datetime
import jwt
from jwt.exceptions import InvalidTokenError

# Initialize Sentry
SENTRY_DSN = os.environ.get("SENTRY_DSN")
if SENTRY_DSN:
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[FastApiIntegration()],
        traces_sample_rate=1.0,
        profiles_sample_rate=1.0,
        environment=os.environ.get("NODE_ENV", "development"),
    )

# Structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("aic.engine")

# Hardened Internal Identity
PLATFORM_PUBLIC_KEY = os.environ.get("PLATFORM_PUBLIC_KEY", "").replace("\\n", "\n")

# Track boot time for uptime reporting
_boot_time = time.time()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Max request body size: 10 MB
MAX_BODY_SIZE = 10 * 1024 * 1024

# Paths that don't require authentication
PUBLIC_PATHS = {"/", "/health", "/docs", "/redoc", "/openapi.json"}

class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > MAX_BODY_SIZE:
            return JSONResponse(
                status_code=413,
                content={"error": "Request body too large", "max_bytes": MAX_BODY_SIZE},
            )
        return await call_next(request)

class JWTAuthMiddleware(BaseHTTPMiddleware):
    """
    Sovereign Service-to-Service Authentication.
    Verifies RS256-signed tokens from the AIC Platform.
    """
    async def dispatch(self, request: Request, call_next):
        if (
            request.url.path in PUBLIC_PATHS
            or request.method == "OPTIONS"
            or not PLATFORM_PUBLIC_KEY
        ):
            return await call_next(request)

        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={"error": "Missing or invalid Authorization header"},
            )

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(
                token, 
                PLATFORM_PUBLIC_KEY, 
                algorithms=["RS256"], 
                audience="aic-engine"
            )
            request.state.tenant_id = payload.get("orgId")
            return await call_next(request)
        except InvalidTokenError as e:
            logger.warning(f"Sovereign Auth Failure: {str(e)}")
            return JSONResponse(
                status_code=403,
                content={"error": "Cryptographic identity verification failed"},
            )

app = FastAPI(
    title="AIC Audit Engine",
    description="AI Integrity Certification - Enforcing the 5 Algorithmic Rights",
    version="3.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(RequestSizeLimitMiddleware)
app.add_middleware(JWTAuthMiddleware)

allowed_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3004,http://localhost:3005").split(",")
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
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error"},
    )

# Import and register routers
from app.api.v1.endpoints import analysis
app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])

@app.get("/")
def health_check():
    return {"status": "AIC Audit Engine Operational", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
