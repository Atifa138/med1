"""
schemas/upload.py

Response schema for the PDF upload + ingestion endpoint.
"""

from typing import List

from pydantic import BaseModel


class UploadReportResponse(BaseModel):
    """Response returned after a PDF report has been saved and ingested
    into the vector database."""

    report_id: int
    filename: str
    saved_path: str
    page_count: int
    chunk_count: int
    chunk_ids: List[str]
    message: str = "Report uploaded and indexed successfully."