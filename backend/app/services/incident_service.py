from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.schemas.incident import IncidentCreate


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


def get_all_incidents(db: Session):
    return db.query(Incident).all()


def get_incident_by_id(db: Session, incident_id: int):
    return (
        db.query(Incident)
        .filter(Incident.id == incident_id)
        .first()
    )


def save_ai_analysis(db: Session, incident: Incident, analysis: dict):
    incident.ai_summary = analysis["summary"]
    incident.root_cause = analysis["root_cause"]

    # List ko string me convert karke store kar rahe hain
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


def update_incident_status(
    db: Session,
    incident_id: int,
    status: str,
):
    incident = get_incident_by_id(db, incident_id)

    if incident is None:
        return None

    incident.status = status

    db.commit()
    db.refresh(incident)

    return incident


def delete_incident(
    db: Session,
    incident_id: int,
):
    incident = get_incident_by_id(db, incident_id)

    if incident is None:
        return False

    db.delete(incident)
    db.commit()

    return True