from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.report import Report
from app.models.user import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/{user_id}")
def get_dashboard(
    user_id: int,
    db: Session = Depends(get_db),
):

    reports = (
        db.query(Report)
        .filter(Report.user_id == user_id)
        .order_by(Report.created_at.desc())
        .all()
    )

    total_reports = len(reports)

    low = 0
    moderate = 0
    high = 0

    for report in reports:

        if report.risk:

            risk = report.risk.lower()

            if "high" in risk:
                high += 1

            elif "moderate" in risk:
                moderate += 1

            else:
                low += 1

        else:
            low += 1

    recent_reports = []

    for report in reports[:3]:

        recent_reports.append({
            "id": report.id,
            "filename": report.filename,
            "status": report.status,
            "created_at": report.created_at,
            "answer": report.answer,
            "risk": report.risk,
            "explanation": report.explanation,
        })

    return {
        "total_reports": total_reports,
        "low_risk": low,
        "moderate_risk": moderate,
        "high_risk": high,
        "recent_reports": recent_reports,
    }