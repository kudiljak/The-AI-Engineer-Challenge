from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from pathlib import Path
from dotenv import load_dotenv
from mangum import Mangum

# Load .env file from project root (parent of api directory)
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
# Also load from current directory as fallback
load_dotenv()

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Create ASGI handler for Vercel
handler = Mangum(app, lifespan="off")

# Initialize OpenAI client lazily - will be created when needed if API key is available
def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    return OpenAI(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/api/health")
def health():
    """Health check endpoint that also shows if API key is configured"""
    api_key = os.getenv("OPENAI_API_KEY")
    return {
        "status": "ok",
        "api_key_configured": bool(api_key),
        "api_key_length": len(api_key) if api_key else 0
    }

@app.post("/api/chat")
def chat(request: ChatRequest):
    client = get_openai_client()
    if not client:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured. Please set the OPENAI_API_KEY environment variable.")
    
    try:
        user_message = request.message
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Changed from gpt-5 to a valid model
            messages=[
                {"role": "system", "content": "You are a supportive mental coach."},
                {"role": "user", "content": user_message}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling OpenAI API: {str(e)}")
