from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.report import Report
from app.schemas.report import HistoryItem

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get("/", response_model=List[HistoryItem])
async def get_history(
    user_id: int = Query(...),
    db: Session = Depends(get_db),
):
    """
    Return history only for the logged-in user.
    """

    reports = (
        db.query(Report)
        .filter(Report.user_id == user_id)
        .order_by(Report.created_at.desc())
        .all()
    )

    history = []

    for report in reports:
        history.append(
            HistoryItem(
                id=report.id,
                filename=report.filename,
                status=report.status,
                created_at=report.created_at,
                answer=report.answer,
                risk=report.risk,
                explanation=report.explanation,
            )
        )

    return history