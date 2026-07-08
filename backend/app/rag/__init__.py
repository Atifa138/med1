"""
MediGuide AI — RAG module.

Provides PDF loading, chunking, embedding, ChromaDB storage, and top-k
retrieval. No FastAPI routes, authentication, or CrewAI agents live in
this package — see backend/app/ai and the FastAPI route layer for those.
"""

from .document_loader import load_pdf, load_pdfs, load_pdfs_from_directory
from .text_splitter import split_documents, split_text
from .embeddings import get_embeddings
from .vector_store import get_vector_store, add_documents, delete_collection
from .retriever import (
    retrieve_relevant_chunks,
    retrieve_relevant_chunks_with_scores,
)

__all__ = [
    "load_pdf",
    "load_pdfs",
    "load_pdfs_from_directory",
    "split_documents",
    "split_text",
    "get_embeddings",
    "get_vector_store",
    "add_documents",
    "delete_collection",
    "get_retriever",
    "retrieve_relevant_chunks",
    "retrieve_relevant_chunks_with_scores",
]
