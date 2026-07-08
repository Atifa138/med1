"""
tools.py

Specialized CrewAI tools for MediGuide AI.
"""

from crewai.tools import tool

from app.rag.retriever import retrieve_relevant_chunks


def _retrieve(query: str):
    docs = retrieve_relevant_chunks(query)

    if not docs:
        return "No relevant information was found in the uploaded report."

    return "\n\n".join(doc.page_content for doc in docs)


@tool("Medical Report Analysis Tool")
def medical_report_tool(query: str) -> str:
    """
    Retrieves report findings needed for medical analysis.
    """
    return _retrieve(query)


@tool("Medical Terminology Lookup Tool")
def terminology_lookup_tool(query: str) -> str:
    """
    Retrieves medical terminology explanations.
    """
    return _retrieve(query)


@tool("Clinical Risk Assessment Tool")
def risk_assessment_tool(query: str) -> str:
    """
    Retrieves information useful for identifying medical risks.
    """
    return _retrieve(query)


@tool("Lifestyle Recommendation Tool")
def lifestyle_tool(query: str) -> str:
    """
    Retrieves lifestyle and health guidance.
    """
    return _retrieve(query)