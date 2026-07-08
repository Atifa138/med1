"""
routers/upload.py

Upload endpoint that:
    1. Saves an uploaded PDF report to disk.
    2. Stores report information in the database.
    3. Builds the vector database from that PDF via RAGService.
"""

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    Form,
    status,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.report import Report
from app.models.user import User
from app.schemas.upload import UploadReportResponse
from app.services.rag_service import get_rag_service
from app.utils.file_storage import save_upload_file


router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post(
    "/report",
    response_model=UploadReportResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_report(
    file: UploadFile = File(...),
    username: str = Form(...),
    db: Session = Depends(get_db),
):
    """
    Upload a medical report and save it for the logged-in user.
    """

    # ----------------------------------------------------
    # Find logged-in user
    # ----------------------------------------------------
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    # ----------------------------------------------------
    # Validate PDF
    # ----------------------------------------------------
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported.",
        )

    # ----------------------------------------------------
    # Save uploaded PDF
    # ----------------------------------------------------
    try:
        saved_path = save_upload_file(
            file,
            subdirectory="reports",
        )
    except OSError as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save uploaded file: {exc}",
        )

    # ----------------------------------------------------
    # Create database record FIRST
    # ----------------------------------------------------
    report = Report(
        filename=file.filename,
        status="uploaded",
        user_id=user.id,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    # ----------------------------------------------------
    # Index PDF into ChromaDB
    # ----------------------------------------------------
    try:
        rag_service = get_rag_service()
        ingestion_result = rag_service.ingest_pdf(
            file_path=saved_path,
            metadata={
                "report_id": report.id,
                "user_id": user.id,
                "original_filename": file.filename,
            },
        )

    except Exception as exc:

        db.delete(report)
        db.commit()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to index report: {exc}",
        )

    # ----------------------------------------------------
    # Return response
    # ----------------------------------------------------
    return UploadReportResponse(
        report_id=report.id,
        filename=file.filename,
        saved_path=str(saved_path),
        page_count=ingestion_result["page_count"],
        chunk_count=ingestion_result["chunk_count"],
        chunk_ids=ingestion_result["chunk_ids"],
    )