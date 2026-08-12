from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    severity = Column(
        String(20),
        nullable=False,
    )

    status = Column(
        String(20),
        default="Open",
    )

    source = Column(
        String(100),
        default="Manual",
    )

    created_by = Column(
        Integer,
        ForeignKey("users.id"),
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    # ===========================
    # AI Analysis
    # ===========================

    ai_summary = Column(Text)

    root_cause = Column(Text)

    recommended_action = Column(Text)

    prevention = Column(Text)

    analysis_status = Column(
        String(20),
        default="Pending",
    )

    # ===========================
    # Relationships
    # ===========================

    lessons = relationship(
        "Lesson",
        back_populates="incident",
        cascade="all, delete-orphan",
    )