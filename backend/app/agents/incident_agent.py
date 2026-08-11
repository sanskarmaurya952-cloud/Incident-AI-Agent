import json

from app.services.groq_service import client


class IncidentAgent:

    def analyze(self, incident):

        prompt = f"""
You are an expert Incident Response Engineer.

Analyze the following incident.

Title:
{incident.title}

Description:
{incident.description}

Severity:
{incident.severity}

Return ONLY valid JSON.

Format:

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

Do not write markdown.
Do not explain.
Return only JSON.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.2,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        return json.loads(content)