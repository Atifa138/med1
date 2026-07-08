"""
vector_store.py

Wraps a ChromaDB-backed LangChain vector store for storing and persisting
document embeddings. This module handles collection creation, document
insertion, and persistence only — retrieval logic lives in retriever.py.
"""

import os
from typing import List, Optional

from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings

from .embeddings import get_embeddings

# Defaults, overridable via environment variables.
DEFAULT_PERSIST_DIRECTORY = os.getenv("RAG_CHROMA_PERSIST_DIR", "backend/app/rag/chroma_store")
DEFAULT_COLLECTION_NAME = os.getenv("RAG_CHROMA_COLLECTION", "mediguide_reports")


def get_vector_store(
    collection_name: str = DEFAULT_COLLECTION_NAME,
    persist_directory: str = DEFAULT_PERSIST_DIRECTORY,
    embedding_function: Optional[Embeddings] = None,
) -> Chroma:
    """Get (or create) a ChromaDB-backed vector store instance.

    Args:
        collection_name: Name of the Chroma collection to use.
        persist_directory: Filesystem path where Chroma persists its data.
        embedding_function: An embeddings client to use. Defaults to
            `embeddings.get_embeddings()` if not provided.

    Returns:
        A `Chroma` vector store instance bound to the given collection.
    """
    os.makedirs(persist_directory, exist_ok=True)

    return Chroma(
        collection_name=collection_name,
        embedding_function=embedding_function or get_embeddings(),
        persist_directory=persist_directory,
    )


def add_documents(
    documents: List[Document],
    vector_store: Optional[Chroma] = None,
) -> List[str]:
    """Embed and store document chunks in the vector store.

    Args:
        documents: Chunked `Document` objects to embed and store, typically
            the output of `text_splitter.split_documents`.
        vector_store: An existing `Chroma` instance to add to. Defaults to
            `get_vector_store()` if not provided.

    Returns:
        A list of the IDs assigned to the newly added documents.
    """
    store = vector_store or get_vector_store()
    return store.add_documents(documents)


def delete_collection(
    collection_name: str = DEFAULT_COLLECTION_NAME,
    persist_directory: str = DEFAULT_PERSIST_DIRECTORY,
) -> None:
    """Delete an entire Chroma collection.

    Args:
        collection_name: Name of the collection to delete.
        persist_directory: Filesystem path where Chroma persists its data.
    """
    store = get_vector_store(
        collection_name=collection_name,
        persist_directory=persist_directory,
    )
    store.delete_collection()
