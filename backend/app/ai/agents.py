"""
agents.py

Defines all CrewAI agents used by MediGuide AI.
Each agent has a specialized responsibility.
"""

import os

from dotenv import load_dotenv
from crewai import Agent
from langchain_groq import ChatGroq

from .prompts import (
    LIFESTYLE_PROMPT,
    MEDICAL_ANALYST_PROMPT,
    RISK_PROMPT,
    SIMPLIFIER_PROMPT,
    SUMMARY_PROMPT,
)

from .tools import (
    medical_report_tool,
    terminology_lookup_tool,
    risk_assessment_tool,
    lifestyle_tool,
)

load_dotenv()

print("=" * 60)
print("MODEL =", os.getenv("GROQ_MODEL"))
print("API KEY FOUND =", bool(os.getenv("GROQ_API_KEY")))
print("=" * 60)

# Default model (can be overridden in .env)
MODEL_NAME = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

llm = ChatGroq(
    model=MODEL_NAME,
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


medical_analyst = Agent(
    role="Medical Report Analyst",
    goal="Analyze uploaded medical reports and identify important medical findings.",
    backstory=MEDICAL_ANALYST_PROMPT,
    llm=llm,
    tools=[medical_report_tool],
    verbose=True,
)


simplifier = Agent(
    role="Medical Terminology Expert",
    goal="Explain difficult medical terminology in simple language.",
    backstory=SIMPLIFIER_PROMPT,
    llm=llm,
    tools=[terminology_lookup_tool],
    verbose=True,
)


risk_assessor = Agent(
    role="Risk Assessment Specialist",
    goal="Identify health risks and abnormal findings from the report.",
    backstory=RISK_PROMPT,
    llm=llm,
    tools=[risk_assessment_tool],
    verbose=True,
)


lifestyle_advisor = Agent(
    role="Lifestyle Advisor",
    goal="Provide safe diet and lifestyle recommendations.",
    backstory=LIFESTYLE_PROMPT,
    llm=llm,
    tools=[lifestyle_tool],
    verbose=True,
)


summary_agent = Agent(
    role="Medical Summary Generator",
    goal="Generate one clear final report for the patient.",
    backstory=SUMMARY_PROMPT,
    llm=llm,
    verbose=True,
)