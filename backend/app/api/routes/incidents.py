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
    get_incidents_by_status,
    get_incidents_by_severity,
    get_dashboard_stats,
)

from app.agents.incident_agent import IncidentAgent
from app.agents.memory_agent import MemoryAgent

router = APIRouter(
    prefix="/api/incidents",
    tags=["Incidents"],
)


# ======================================================
# Create Incident
# ======================================================

@router.post("/")
def add_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
):
    return create_incident(
        db=db,
        incident=incident,
        user_id=1,      # JWT ke baad replace hoga
    )


# ======================================================
# Dashboard
# ======================================================

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
):
    return get_dashboard_stats(db)


# ======================================================
# Get Incidents by Status
# ======================================================

@router.get("/status/{status}")
def incidents_by_status(
    status: str,
    db: Session = Depends(get_db),
):
    return get_incidents_by_status(
        db,
        status,
    )


# ======================================================
# Get Incidents by Severity
# ======================================================

@router.get("/severity/{severity}")
def incidents_by_severity(
    severity: str,
    db: Session = Depends(get_db),
):
    return get_incidents_by_severity(
        db,
        severity,
    )


# ======================================================
# Get All Incidents
# ======================================================

@router.get("/")
def list_incidents(
    db: Session = Depends(get_db),
):
    return get_all_incidents(db)


# ======================================================
# Get Single Incident
# ======================================================

@router.get("/{incident_id}")
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):

    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    return incident


# ======================================================
# AI Analyze Incident
# ======================================================

@router.post("/{incident_id}/analyze")
def analyze_incident(
    incident_id: int,
    db: Session = Depends(get_db),
):

    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found",
        )

    try:

        # -----------------------------
        # Hindsight Memory
        # -----------------------------

        memory_agent = MemoryAgent()

        memory_context = memory_agent.get_memory(
            db=db,
            query=incident.title,
        )

        # -----------------------------
        # AI Agent
        # -----------------------------

        incident_agent = IncidentAgent()

        analysis = incident_agent.analyze(
            incident=incident,
            memory_context=memory_context,
        )

        # -----------------------------
        # Save Analysis
        # -----------------------------

        save_ai_analysis(
            db=db,
            incident=incident,
            analysis=analysis,
        )

        return {
            "success": True,
            "message": "Incident analyzed successfully",
            "memory_used": bool(memory_context),
            "analysis": analysis,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ======================================================
# Update Status
# ======================================================

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


# ======================================================
# Delete Incident
# ======================================================

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
        "success": True,
        "message": "Incident deleted successfully",
    }