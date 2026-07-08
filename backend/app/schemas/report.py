"""
schemas/report.py

Pydantic models (schemas) defining request and response shapes for the
upload, analyze, and history endpoints.

These are placeholder contracts intended to keep the API stable while the
underlying business logic is implemented later.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class UploadResponse(BaseModel):
    """Response returned after an upload request is received."""

    filename: Optional[str] = Field(
        default=None, description="Name of the uploaded file, if provided."
    )
    message: str = Field(
        description="Human-readable status message about the upload."
    )


class AnalyzeRequest(BaseModel):
    report_id: int
    query: str


class AnalysisResult(BaseModel):
    answer: str
    risk: str
    explanation: str

    
    # NEW
    lifestyle: str
    summary: str


class AnalyzeResponse(BaseModel):
    """Response returned after an analyze request is received."""

    report_id: int
    status: str
    analysis: AnalysisResult


class HistoryItem(BaseModel):
    """Represents a single entry in a user's report history."""

    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="Unique identifier of the report.")
    filename: str = Field(description="Name of the uploaded file.")
    status: str = Field(description="Current status of the report.")
    created_at: datetime = Field(description="Timestamp when the report was created.")

    answer: Optional[str] = None
    risk: Optional[str] = None
    explanation: Optional[str] = None
