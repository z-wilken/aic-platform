from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import analysis
from datetime import datetime

app = FastAPI(
    title="AIC Audit Engine",
    description="AI Integrity Certification - Enforcing the 5 Algorithmic Rights",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])

@app.get("/")
def health_check():
    """Health check with capabilities"""
    return {
        "status": "AIC Audit Engine Operational",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
