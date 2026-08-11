from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.incident import IncidentCreate

from app.services.incident_service import (
    create_incident,
    get_all_incidents,
    get_incident_by_id,
    save_ai_analysis,
    update_incident_status,
    delete_incident,
)

from app.agents.incident_agent import IncidentAgent

router = APIRouter(
    prefix="/api/incidents",
    tags=["Incidents"],
)


# -----------------------------
# Create Incident
# -----------------------------
@router.post("/")
def add_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
):
    # JWT integration ke baad yaha logged-in user ka ID aayega
    return create_incident(db, incident, user_id=1)


# -----------------------------
# Get All Incidents
# -----------------------------
@router.get("/")
def list_incidents(
    db: Session = Depends(get_db),
):
    return get_all_incidents(db)


# -----------------------------
# Get Single Incident
# -----------------------------
@router.get("/{incident_id}")
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):
    incident = get_incident_by_id(db, incident_id)

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


# -----------------------------
# AI Analyze Incident
# -----------------------------
@router.post("/{incident_id}/analyze")
def analyze_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):
    incident = get_incident_by_id(db, incident_id)

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    agent = IncidentAgent()

    analysis = agent.analyze(incident)

    save_ai_analysis(db, incident, analysis)

    return {
        "message": "Incident analyzed successfully",
        "analysis": analysis,
    }


# -----------------------------
# Update Incident Status
# -----------------------------
@router.put("/{incident_id}/status/{status}")
def update_status(
    incident_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    incident = update_incident_status(
        db,
        incident_id,
        status,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


# -----------------------------
# Delete Incident
# -----------------------------
@router.delete("/{incident_id}")
def remove_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_incident(
        db,
        incident_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return {
        "message": "Incident deleted successfully"
    }