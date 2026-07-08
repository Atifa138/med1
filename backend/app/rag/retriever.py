"""
retriever.py

Provides top-k retrieval of relevant document chunks from the ChromaDB
vector store.
"""

import os
from typing import List, Optional, Tuple

from langchain_chroma import Chroma
from langchain_core.documents import Document

from .vector_store import get_vector_store

DEFAULT_TOP_K = int(os.getenv("RAG_TOP_K", "4"))


def retrieve_relevant_chunks(
    query: str,
    vector_store: Optional[Chroma] = None,
    top_k: int = DEFAULT_TOP_K,
    report_id: Optional[int] = None,
) -> List[Document]:

    store = vector_store or get_vector_store()

    search_kwargs = {
        "k": top_k,
    }

    if report_id is not None:
        search_kwargs["filter"] = {
            "report_id": report_id
        }

    return store.similarity_search(
        query=query,
        **search_kwargs
    )


def retrieve_relevant_chunks_with_scores(
    query: str,
    vector_store: Optional[Chroma] = None,
    top_k: int = DEFAULT_TOP_K,
    report_id: Optional[int] = None,
) -> List[Tuple[Document, float]]:

    store = vector_store or get_vector_store()

    if report_id is not None:
        return store.similarity_search_with_score(
            query=query,
            k=top_k,
            filter={
                "report_id": report_id
            }
        )

    return store.similarity_search_with_score(
        query=query,
        k=top_k,
    )