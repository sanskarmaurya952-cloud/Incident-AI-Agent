import json

from app.services.groq_service import client


class ReflectionAgent:

    def generate_lesson(
        self,
        incident,
        ai_analysis,
        actual_resolution,
    ):

        prompt = f"""
You are an Expert Incident Response Reviewer.

Your job is to compare the AI recommendation with the actual engineer resolution.

Current Incident

Title:
{incident.title}

Description:
{incident.description}

Severity:
{incident.severity}

------------------------------------

AI Analysis

Summary:
{ai_analysis.get("summary")}

Root Cause:
{ai_analysis.get("root_cause")}

Recommended Actions:
{ai_analysis.get("recommended_action")}

------------------------------------

Actual Resolution

{actual_resolution}

------------------------------------

Generate ONLY valid JSON.

{{
    "lesson_learned": "",
    "prevention": [
        "",
        ""
    ],
    "confidence_after": 0.97
}}

Rules

1. Compare AI recommendation with actual resolution.

2. Explain what AI should remember next time.

3. If AI was wrong, improve future recommendation.

4. Return ONLY JSON.
"""

        try:

            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                temperature=0.2,
                response_format={
                    "type": "json_object"
                },
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            content = response.choices[0].message.content

            return json.loads(content)

        except Exception as e:

            return {

                "lesson_learned": f"Reflection failed: {e}",

                "prevention": [
                    "Manual review required"
                ],

                "confidence_after": 0.0
            }