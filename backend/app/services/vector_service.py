import json
import numpy as np

from app.embeddings.embedding_service import create_embedding

from app.models.lesson import Lesson


def cosine_similarity(a, b):

    a = np.array(a)

    b = np.array(b)

    return np.dot(a, b) / (
        np.linalg.norm(a)
        *
        np.linalg.norm(b)
    )


def search_memory(

    db,

    query,

    top_k=5,
):

    query_vector = create_embedding(query)

    lessons = db.query(Lesson).all()

    scores = []

    for lesson in lessons:

        if lesson.embedding is None:
            continue

        vector = json.loads(
            lesson.embedding
        )

        score = cosine_similarity(
            query_vector,
            vector,
        )

        scores.append(
            (
                score,
                lesson,
            )
        )

    scores.sort(
        reverse=True,
        key=lambda x: x[0]
    )

    return [
        lesson
        for score, lesson in scores[:top_k]
    ]