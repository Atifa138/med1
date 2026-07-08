"""
services/rag_service.py

Orchestrates the existing backend/app/rag module: loads a PDF, splits it
into chunks, embeds those chunks, and stores them in ChromaDB. Also
exposes a thin query method for top-k retrieval.

This service contains no CrewAI logic and no route handling — it is the
single integration point between the RAG module and the rest of the
backend (routers call into this, not into app/rag directly).
"""

from pathlib import Path
from typing import List, Optional, Union

from langchain_core.documents import Document

from app.rag.document_loader import load_pdf
from app.rag.text_splitter import split_documents
from app.rag.vector_store import add_documents, get_vector_store
from app.rag.retriever import retrieve_relevant_chunks, retrieve_relevant_chunks_with_scores


class RAGService:
    """Coordinates the RAG pipeline: load -> split -> embed -> store -> retrieve.

    A single `Chroma` vector store instance is created once and reused
    across ingestion and retrieval calls to avoid re-opening the
    persisted collection on every request.
    """

    def __init__(self, collection_name: Optional[str] = None):
        self._vector_store = get_vector_store(
            **({"collection_name": collection_name} if collection_name else {})
        )

    def ingest_pdf(
        self,
        file_path: Union[str, Path],
        metadata: Optional[dict] = None,
    ) -> dict:
        """Ingest a single PDF report into the vector database.

        Steps:
            1. Load the PDF and extract per-page text (document_loader).
            2. Split pages into overlapping chunks (text_splitter).
            3. Embed and store the chunks in ChromaDB (embeddings +
               vector_store — embedding happens internally in
               `add_documents` via the store's configured embedding
               function).

        Args:
            file_path: Path to the saved PDF file on disk.
            metadata: Optional extra metadata (e.g. user_id, report_id) to
                attach to every chunk produced from this file, useful for
                later filtering retrieval by owner/report.

        Returns:
            A dict summarizing the ingestion: page count, chunk count, and
            the vector store IDs assigned to the stored chunks.
        """
        pages: List[Document] = load_pdf(file_path)

        if metadata:
            for page in pages:
                page.metadata.update(metadata)

        chunks: List[Document] = split_documents(pages)

        chunk_ids: List[str] = add_documents(chunks, vector_store=self._vector_store)

        return {
            "source_file": str(file_path),
            "page_count": len(pages),
            "chunk_count": len(chunks),
            "chunk_ids": chunk_ids,
        }

    def query(
    self,
    query: str,
    top_k: int = 4,
    report_id: int | None = None,
    ) -> List[Document]:
        return retrieve_relevant_chunks(
        query=query,
        vector_store=self._vector_store,
        top_k=top_k,
        report_id=report_id,
    )

    def query_with_scores(self, query: str, top_k: int = 4):
        """Retrieve the top-k most relevant chunks along with similarity scores.

        Args:
            query: Natural-language query text.
            top_k: Number of chunks to return.

        Returns:
            A list of `(Document, score)` tuples, ordered by relevance.
        """
        return retrieve_relevant_chunks_with_scores(
            query, vector_store=self._vector_store, top_k=top_k
        )


# Module-level singleton so routers/other services can share one vector
# store connection instead of each opening their own.
_rag_service = None

def get_rag_service():
    global _rag_service

    if _rag_service is None:
        _rag_service = RAGService()

    return _rag_service
