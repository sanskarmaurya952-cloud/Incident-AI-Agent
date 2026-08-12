from pydantic import BaseModel


class LessonCreate(BaseModel):

    actual_resolution: str


class LessonResponse(BaseModel):

    lesson_learned: str

    prevention: list[str]

    confidence_after: float