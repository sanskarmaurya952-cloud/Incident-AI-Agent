from sqlalchemy.orm import Session
from sqlalchemy import or_

import json

from app.models.lesson import Lesson
from app.embeddings.embedding_service import create_embedding
from app.services.vector_service import search_memory


# =====================================
# SAVE LESSON
# =====================================

def save_lesson(
    db: Session,
    incident_id: int,
    incident_title: str,
    ai_prediction: str,
    actual_resolution: str,
    lesson_learned: str,
    prevention: str,
    confidence_before: float,
    confidence_after: float,
):

    print("========== SAVING LESSON ==========")

    # ---------------------------------
    # Create Embedding
    # ---------------------------------

    try:

        embedding = create_embedding(
            f"""
            {incident_title}

            {actual_resolution}

            {lesson_learned}

            {prevention}
            """
        )

        embedding = json.dumps(embedding)

        print("✅ Embedding Created")

    except Exception as e:

        print("❌ Embedding Error:", e)

        embedding = "[]"

    # ---------------------------------
    # Save Lesson
    # ---------------------------------

    lesson = Lesson(
        incident_id=incident_id,
        incident_title=incident_title,
        ai_prediction=ai_prediction,
        actual_resolution=actual_resolution,
        lesson_learned=lesson_learned,
        prevention=prevention,
        confidence_before=confidence_before,
        confidence_after=confidence_after,
        embedding=embedding,
    )

    db.add(lesson)
    db.commit()
    db.refresh(lesson)

    print("✅ Lesson Saved Successfully")

    return lesson


# =====================================
# GET LESSON
# =====================================

def get_lesson_by_id(
    db: Session,
    lesson_id: int,
):
    return (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id)
        .first()
    )


# =====================================
# GET ALL LESSONS
# =====================================

def get_all_lessons(db: Session):
    return (
        db.query(Lesson)
        .order_by(Lesson.created_at.desc())
        .all()
    )


# =====================================
# SEARCH LESSON
# =====================================

def search_lessons(
    db: Session,
    keyword: str,
):
    return (
        db.query(Lesson)
        .filter(
            or_(
                Lesson.incident_title.ilike(f"%{keyword}%"),
                Lesson.lesson_learned.ilike(f"%{keyword}%"),
                Lesson.actual_resolution.ilike(f"%{keyword}%"),
            )
        )
        .all()
    )


# =====================================
# VECTOR SEARCH
# =====================================

def get_relevant_lessons(
    db: Session,
    title: str,
):
    return search_memory(
        db=db,
        query=title,
        top_k=5,
    )


# =====================================
# DELETE
# =====================================

def delete_lesson(
    db: Session,
    lesson_id: int,
):

    lesson = get_lesson_by_id(
        db,
        lesson_id,
    )

    if lesson is None:
        return False

    db.delete(lesson)
    db.commit()

    return True


# =====================================
# MEMORY CONTEXT
# =====================================

def build_memory_context(
    db: Session,
    title: str,
):

    lessons = get_relevant_lessons(
        db,
        title,
    )

    if not lessons:
        return ""

    context = ""

    for lesson in lessons:

        context += f"""

Previous Incident:
{lesson.incident_title}

Previous AI Prediction:
{lesson.ai_prediction}

Actual Resolution:
{lesson.actual_resolution}

Lesson Learned:
{lesson.lesson_learned}

Prevention:
{lesson.prevention}

-------------------------------------

"""

    return context