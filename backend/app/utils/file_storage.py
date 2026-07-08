"""
utils/file_storage.py

Small helper for persisting uploaded files to disk. Kept separate from
the RAG service so "where files live on disk" stays a storage concern,
not a RAG concern.
"""

import os
import uuid
from pathlib import Path

from fastapi import UploadFile

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "backend/app/uploads"))


def save_upload_file(upload_file: UploadFile, subdirectory: str = "reports") -> Path:
    """Save an uploaded file to disk under `UPLOAD_DIR/subdirectory`.

    The stored filename is prefixed with a UUID to avoid collisions while
    preserving the original filename for traceability.

    Args:
        upload_file: The incoming FastAPI `UploadFile`.
        subdirectory: Subfolder under `UPLOAD_DIR` to store the file in.

    Returns:
        The `Path` to the saved file on disk.
    """
    target_dir = UPLOAD_DIR / subdirectory
    target_dir.mkdir(parents=True, exist_ok=True)

    safe_name = f"{uuid.uuid4().hex}_{upload_file.filename}"
    destination = target_dir / safe_name

    with destination.open("wb") as buffer:
        buffer.write(upload_file.file.read())

    return destination
