from fastapi import FastAPI

from app.api.routes.auth import router as auth_router

app = FastAPI(
    title="IncidentPilot AI",
    version="1.0.0"
)

app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "IncidentPilot AI Running"
    }
from app.api.routes.auth import router as auth_router
from app.api.routes.incidents import router as incident_router

app.include_router(auth_router)
app.include_router(incident_router)