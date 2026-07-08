"""
Defines CrewAI tasks for analyzing medical reports.
"""

from crewai import Task

from app.ai.agents import (
    medical_analyst,
    simplifier,
    risk_assessor,
    lifestyle_advisor,
    summary_agent,
)


def create_analysis_tasks(report_context: str, user_query: str):

    medical_analysis = Task(
    description=f"""
You are given the following medical report:

{report_context}

Patient Question:

"{user_query}"

Analyze the COMPLETE uploaded medical report.

First answer the patient's question.

Then provide a concise overview of the report.

Include:

• Important normal findings
• Important abnormal findings
• Laboratory values that are outside reference range
• Doctor impressions (if present)
• Diagnosis (only if written in the report)

If the answer is not present in the report, state:

"The report does not contain this information."

Never invent information.

Never use outside medical knowledge.

Only use the uploaded report.
""",
    expected_output="""
Medical Report Overview

Patient Question Answer

Key Findings

Abnormal Findings

Doctor Impression (if available)

Missing Information (if applicable)
""",
    agent=medical_analyst,
)

    risk_analysis = Task(
        description=f"""
Medical Report:

{report_context}

Patient Question:

"{user_query}"

Your responsibility is to ALWAYS perform a risk assessment for this report,
regardless of whether the patient explicitly asked about risk.

Carefully examine every laboratory value, observation, clinical note,
impression, diagnosis, and reference range contained in the report.

Determine ONE overall risk category:

• LOW
• MODERATE
• HIGH

Guidelines:

LOW
- Nearly all values are within reference ranges.
- No significant abnormalities are reported.

MODERATE
- One or more abnormal findings exist.
- Follow-up is recommended.
- Findings are mildly or moderately abnormal.

HIGH
- Multiple abnormal findings exist.
- Critical laboratory values are present.
- Significant abnormalities are reported.
- Serious clinical impressions are documented.
- Findings indicate possible major organ dysfunction or uncontrolled disease.

Do NOT automatically choose LOW.

Every conclusion MUST be supported by the uploaded report.

For every abnormal finding include:

• Test name
• Reported value
• Reference range (if available)
• Why it contributes to the overall risk

If the report is completely normal,
explain WHY the overall risk is LOW.

If there is insufficient information,
state that clearly.

Never invent diseases.
Never diagnose.
Never use outside medical knowledge.
Only use the uploaded medical report.

IMPORTANT

Return your answer ONLY in the following format.

Overall Risk:
LOW / MODERATE / HIGH

Reasoning:
• ...
• ...
• ...

Abnormal Findings:
• Test Name
  Patient Value:
  Reference Range:
  Explanation:

Recommendation:
A short recommendation encouraging discussion with the treating physician.
""",
        expected_output="""
Return the response EXACTLY in this format.

Overall Risk:
LOW
OR
MODERATE
OR
HIGH

Reasoning:
• Point 1
• Point 2
• Point 3

Abnormal Findings:

• Test Name
  Patient Value:
  Reference Range:
  Explanation:

• Test Name
  Patient Value:
  Reference Range:
  Explanation:

Recommendation:
One short paragraph explaining what the patient should discuss with their doctor.

Do NOT write one long paragraph.
Use the exact section headings.
""",
        agent=risk_assessor,
    )

    patient_explanation = Task(
    description=f"""
Medical Report:

{report_context}

Patient Question:

"{user_query}"

Explain ONLY the findings present in the uploaded report.

For every important finding include:

Finding:

Patient Value:

Reference Range:

Simple Explanation:

Explain in everyday English.

Do NOT invent diseases.

Do NOT explain anything not present in the report.

Use only the uploaded report.
""",
    expected_output="""
Finding

Patient Value

Reference Range

Simple Explanation
""",
    agent=simplifier,
)

    lifestyle_recommendation = Task(
    description=f"""
Medical Report:

{report_context}

Provide lifestyle recommendations ONLY for abnormalities found in this report.

For every abnormal finding provide:

Finding:

Recommendation:

Reason:

If the report is completely normal, write:

"No specific lifestyle modifications are required beyond maintaining healthy habits."

Never recommend medicines.

Never prescribe treatment.

Never invent diseases.

Only use the uploaded report.
""",
    expected_output="""
Finding

Recommendation

Reason
""",
    agent=lifestyle_advisor,
)

    final_summary = Task(
    description=f"""
Medical Report:

{report_context}

Create a structured patient-friendly summary.

Return EXACTLY these sections.

Report Summary

Important Findings

Abnormal Findings

Overall Risk

Lifestyle Advice

Questions to Ask Your Doctor

If a section has no information, write:

"No significant findings."

Do not omit any section.

Only use information from the uploaded report.

Never invent information.
""",
    expected_output="""
Report Summary

Important Findings

Abnormal Findings

Overall Risk

Lifestyle Advice

Questions to Ask Your Doctor
""",
    agent=summary_agent,
)

    return [
        medical_analysis,
        risk_analysis,
        patient_explanation,
        lifestyle_recommendation,
        final_summary,
    ]