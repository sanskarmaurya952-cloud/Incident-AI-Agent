import json

from app.services.groq_service import client


class IncidentAgent:

    def analyze(
        self,
        incident,
        memory_context="",
    ):

        prompt = f"""
You are an Expert Cybersecurity Incident Response Engineer.

Your responsibility is to analyze security incidents accurately.

If previous lessons are available, use them to improve your analysis.

=================================================
PREVIOUS LESSONS
=================================================

{memory_context}

=================================================
CURRENT INCIDENT
=================================================

Title:
{incident.title}

Description:
{incident.description}

Severity:
{incident.severity}

=================================================
INSTRUCTIONS
=================================================

Analyze the incident carefully.

Use previous lessons only if they are relevant.

Return ONLY valid JSON.

JSON Format:

{{
    "summary": "",
    "root_cause": "",
    "recommended_action": [
        "",
        ""
    ],
    "prevention": [
        "",
        ""
    ],
    "confidence": 0.95
}}

Rules:
- Do not return Markdown.
- Do not explain anything.
- Do not add extra text.
- Return only valid JSON.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.2,
            response_format={
                "type": "json_object"
            },
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        content = response.choices[0].message.content

        try:
            return json.loads(content)

        except Exception:

            return {
                "summary": "Unable to parse AI response.",
                "root_cause": "",
                "recommended_action": [],
                "prevention": [],
                "confidence": 0.0,
            }