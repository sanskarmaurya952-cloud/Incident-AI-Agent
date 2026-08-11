from pydantic import BaseModel
from datetime import datetime


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    status: str
    source: str
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True


class IncidentAnalysis(BaseModel):
    summary: str
    root_cause: str
    recommended_action: list[str]
    prevention: list[str]
    confidence: float