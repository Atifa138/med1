"""
text_splitter.py

Splits loaded documents into smaller overlapping chunks suitable for
embedding and retrieval. Wraps LangChain's `RecursiveCharacterTextSplitter`
with sensible defaults for medical report text.
"""

import os
from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Defaults, overridable via environment variables so chunking behavior can
# be tuned without code changes.
DEFAULT_CHUNK_SIZE = int(os.getenv("RAG_CHUNK_SIZE", "1000"))
DEFAULT_CHUNK_OVERLAP = int(os.getenv("RAG_CHUNK_OVERLAP", "150"))


def get_text_splitter(
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
) -> RecursiveCharacterTextSplitter:
    """Build a configured `RecursiveCharacterTextSplitter`.

    Args:
        chunk_size: Maximum number of characters per chunk.
        chunk_overlap: Number of overlapping characters between consecutive
            chunks, used to preserve context across chunk boundaries.

    Returns:
        A configured `RecursiveCharacterTextSplitter` instance.
    """
    return RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", ". ", " ", ""],
    )


def split_documents(
    documents: List[Document],
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
) -> List[Document]:
    """Split a list of documents into smaller chunked `Document` objects.

    Original metadata (e.g. source file, page number) is preserved and
    carried over onto each resulting chunk.

    Args:
        documents: Documents to split, typically the output of
            `document_loader.load_pdf` / `load_pdfs`.
        chunk_size: Maximum number of characters per chunk.
        chunk_overlap: Number of overlapping characters between chunks.

    Returns:
        A list of chunked `Document` objects.
    """
    splitter = get_text_splitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(documents)


def split_text(
    text: str,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
) -> List[str]:
    """Split a raw text string into chunks without document metadata.

    Useful for ad-hoc text (not yet wrapped in a `Document`) that needs
    chunking before embedding.

    Args:
        text: Raw text content to split.
        chunk_size: Maximum number of characters per chunk.
        chunk_overlap: Number of overlapping characters between chunks.

    Returns:
        A list of text chunks.
    """
    splitter = get_text_splitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_text(text)
