from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


# ==============================
# CREATE INCIDENT
# ==============================

def create_incident(db: Session, incident: IncidentCreate, user_id: int):
    new_incident = Incident(
        title=incident.title,
        description=incident.description,
        severity=incident.severity,
        created_by=user_id,
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident


# ==============================
# GET ALL INCIDENTS
# ==============================

def get_all_incidents(db: Session):
    return (
        db.query(Incident)
        .order_by(Incident.created_at.desc())
        .all()
    )


# ==============================
# GET INCIDENT BY ID
# ==============================

def get_incident_by_id(db: Session, incident_id: int):
    return (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )


# ==============================
# FIND SIMILAR INCIDENTS
# ==============================

def find_similar_incidents(db: Session, title: str):
    return (
        db.query(Incident)
        .filter(
            Incident.title.ilike(f"%{title}%")
        )
        .all()
    )


# ==============================
# SAVE AI ANALYSIS
# ==============================

def save_ai_analysis(db: Session, incident: Incident, analysis: dict):

    incident.ai_summary = analysis["summary"]
    incident.root_cause = analysis["root_cause"]

    incident.recommended_action = "\n".join(
        analysis["recommended_action"]
    )

    incident.prevention = "\n".join(
        analysis["prevention"]
    )

    incident.analysis_status = "Completed"

    db.commit()
    db.refresh(incident)

    return incident


# ==============================
# UPDATE STATUS
# ==============================

def update_incident_status(
    db: Session,
    incident_id: int,
    status: str,
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        return None

    incident.status = status

    db.commit()
    db.refresh(incident)

    return incident


# ==============================
# DELETE INCIDENT
# ==============================

def delete_incident(
    db: Session,
    incident_id: int,
):
    incident = get_incident_by_id(
        db,
        incident_id,
    )

    if incident is None:
        return False

    db.delete(incident)
    db.commit()

    return True


# ==============================
# FILTER BY STATUS
# ==============================

def get_incidents_by_status(
    db: Session,
    status: str,
):
    return (
        db.query(Incident)
        .filter(Incident.status == status)
        .all()
    )


# ==============================
# FILTER BY SEVERITY
# ==============================

def get_incidents_by_severity(
    db: Session,
    severity: str,
):
    return (
        db.query(Incident)
        .filter(Incident.severity == severity)
        .all()
    )


# ==============================
# DASHBOARD STATS
# ==============================

def get_dashboard_stats(db: Session):

    total = db.query(func.count(Incident.id)).scalar()

    open_count = (
        db.query(func.count(Incident.id))
        .filter(Incident.status == "Open")
        .scalar()
    )

    resolved = (
        db.query(func.count(Incident.id))
        .filter(Incident.status == "Resolved")
        .scalar()
    )

    critical = (
        db.query(func.count(Incident.id))
        .filter(Incident.severity == "Critical")
        .scalar()
    )

    return {
        "total_incidents": total,
        "open_incidents": open_count,
        "resolved_incidents": resolved,
        "critical_incidents": critical,
    }