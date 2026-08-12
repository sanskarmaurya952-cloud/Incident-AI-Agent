from sqlalchemy import Column, Integer, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.connection import Base


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)

    incident_id = Column(
        Integer,
        ForeignKey("incidents.id", ondelete="CASCADE"),
        nullable=False,
    )

    incident_title = Column(Text, nullable=False)

    ai_prediction = Column(Text, nullable=False)

    actual_resolution = Column(Text, nullable=False)

    lesson_learned = Column(Text, nullable=False)

    prevention = Column(Text, nullable=True)

    confidence_before = Column(Float, default=0.0)

    confidence_after = Column(Float, default=0.0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # Relationship
    incident = relationship(
        "Incident",
        back_populates="lessons",
    )
    embedding=Column(Text,nullable=True)