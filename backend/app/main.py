from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.api.routes.incidents import router as incident_router
from app.api.routes.lessons import router as lesson_router

app = FastAPI(
    title="IncidentPilot AI",
    version="1.0.0",
)

# ==========================
# CORS
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Routes
# ==========================

app.include_router(auth_router)
app.include_router(incident_router)
app.include_router(lesson_router)

@app.get("/")
def home():
    return {
        "message": "IncidentPilot AI Running"
    }