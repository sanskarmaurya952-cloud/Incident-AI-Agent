from app.services.vector_service import search_memory


class MemoryAgent:

    def get_memory(
        self,
        db,
        query: str,
    ):

        lessons = search_memory(
            db=db,
            query=query,
            top_k=5,
        )

        if not lessons:
            return ""

        context = "PREVIOUS INCIDENT KNOWLEDGE\n\n"

        for index, lesson in enumerate(lessons, start=1):

            context += f"""
==========================
Previous Incident #{index}
==========================

Title:
{lesson.incident_title}

Resolution:
{lesson.actual_resolution}

Lesson Learned:
{lesson.lesson_learned}

Prevention:
{lesson.prevention}

--------------------------------

"""

        return context