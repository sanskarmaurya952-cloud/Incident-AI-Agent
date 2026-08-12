from app.agents.memory_agent import MemoryAgent
from app.agents.incident_agent import IncidentAgent


class OrchestratorAgent:

    def analyze_incident(
        self,
        db,
        incident,
    ):

        # Step 1
        memory_agent = MemoryAgent()

        memory_context = memory_agent.get_memory(
            db=db,
            query=incident.title,
        )

        # Step 2
        incident_agent = IncidentAgent()

        analysis = incident_agent.analyze(
            incident=incident,
            memory_context=memory_context,
        )

        return {
            "analysis": analysis,
            "memory_used": bool(memory_context),
        }