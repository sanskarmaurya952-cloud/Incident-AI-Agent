from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.services.lesson_service import (
    get_all_lessons,
    search_lessons,
    delete_lesson,
)

router = APIRouter(
    prefix="/api/lessons",
    tags=["Lessons"],
)


@router.get("/")
def list_lessons(
    db: Session = Depends(get_db),
):
    return get_all_lessons(db)


@router.get("/search")
def search(
    keyword: str,
    db: Session = Depends(get_db),
):
    return search_lessons(db, keyword)


@router.delete("/{lesson_id}")
def remove_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_lesson(db, lesson_id)

    if not deleted:
        return {
            "message": "Lesson not found"
        }

    return {
        "message": "Lesson deleted successfully"
    }