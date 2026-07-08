from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.report import Report
from app.schemas.report import AnalyzeRequest, AnalyzeResponse
from app.services.rag_service import rag_service
from app.ai.crew import run_medical_analysis

router = APIRouter(
    prefix="/analyze",
    tags=["Analyze"],
)


@router.post("/", response_model=AnalyzeResponse)
async def analyze_report(
    request: AnalyzeRequest,
    db: Session = Depends(get_db),
):

    documents = rag_service.query(
    query="""
Analyze the complete uploaded medical report.

Retrieve:
- All laboratory values
- Abnormal findings
- Normal findings
- Clinical impressions
- Diagnoses
- Reference ranges
- Doctor observations

Return the complete report context.
""",
    top_k=8,
    report_id=request.report_id,
)

    if not documents:
        return AnalyzeResponse(
            report_id=request.report_id,
            status="failed",
            analysis={
                "answer": "No relevant information found.",
                "risk": "",
                "explanation": "",
            },
        )

    seen = set()
    unique_chunks = []

    for doc in documents:
        text = doc.page_content.strip()
        if text not in seen:
            seen.add(text)
            unique_chunks.append(text)

    report_context = "\n\n".join(unique_chunks)
    MAX_CONTEXT = 12000

    if len(report_context) > MAX_CONTEXT:
      report_context = report_context[:MAX_CONTEXT]
    print("=" * 80)
    print("REPORT CONTEXT SENT TO AI")
    print(report_context)
    print("=" * 80)

    analysis = run_medical_analysis(
        report_context,
        request.query,
    )

    # -----------------------------
    # Save analysis into database
    # -----------------------------
    report = db.query(Report).filter(
        Report.id == request.report_id
    ).first()

    if report:
        report.answer = analysis["answer"]
        report.risk = analysis["risk"]
        report.explanation = analysis["explanation"]
        report.status = "completed"

        db.commit()

    return AnalyzeResponse(
        report_id=request.report_id,
        status="completed",
        analysis=analysis,
    )