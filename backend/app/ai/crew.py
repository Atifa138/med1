"""
Runs the medical analysis using the configured LLM.
Executes all AI tasks sequentially and returns structured output.
"""

from app.ai.agents import llm
from app.ai.tasks import create_analysis_tasks


def run_medical_analysis(report_context: str, user_query: str):
    """
    Executes every AI task one by one and returns all outputs.

    Existing fields (answer, risk, explanation) are preserved so the
    frontend continues working without any changes.
    """

    tasks = create_analysis_tasks(report_context, user_query)

    answer = ""
    risk = ""
    explanation = ""
    lifestyle = ""
    summary = ""

    try:

        for task in tasks:

            prompt = f"""
Role:
{task.agent.role}

Goal:
{task.agent.goal}

Instructions:
{task.agent.backstory}

Task:
{task.description}
"""

            response = llm.invoke(prompt)

            content = response.content.strip()

            if task.agent.role == "Medical Report Analyst":
                answer = content

            elif task.agent.role == "Risk Assessment Specialist":
                risk = content

            elif task.agent.role == "Medical Terminology Expert":
                explanation = content

            elif task.agent.role == "Lifestyle Advisor":
                lifestyle = content

            elif task.agent.role == "Medical Summary Generator":
                summary = content

        return {
            "answer": answer,
            "risk": risk,
            "explanation": explanation,
            "lifestyle": lifestyle,
            "summary": summary,
        }

    except Exception as e:

        print("\nAI Error:")
        print(e)

        message = (
        "AI analysis is temporarily unavailable because the AI service has reached its usage limit. "
        "Your medical report has been uploaded successfully. "
        "Please try again after a few minutes."
       )

    return {
        "answer": message,
        "risk": "Unavailable",
        "explanation": message,
        "lifestyle": message,
        "summary": message,
    }