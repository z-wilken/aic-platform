from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import pandas as pd
from textblob import TextBlob # Added for Empathy Analysis

app = FastAPI()

class EmpathyRequest(BaseModel):
    text: str # The rejection letter or chatbot response

@app.post("/analyze/empathy")
def analyze_empathy(request: EmpathyRequest):
    blob = TextBlob(request.text)
    sentiment = blob.sentiment.polarity # -1.0 to 1.0
    
    # Simple Heuristic: Rejections must not be negative/hostile
    score = (sentiment + 1) * 50 # Scale to 0-100
    
    return {
        "empathy_score": round(score, 2),
        "sentiment": "HOSTILE" if score < 40 else "NEUTRAL" if score < 60 else "EMPATHETIC",
        "analysis": "Tone analysis completed."
    }

# ... (Original Bias Code remains below)
