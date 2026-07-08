"""
document_loader.py

Loads uploaded PDF files and extracts their text content into LangChain
`Document` objects. This module is intentionally limited to loading and
extraction — chunking, embedding, and storage happen in their own modules.
"""

from pathlib import Path
from typing import List, Union

from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader


def load_pdf(file_path: Union[str, Path]) -> List[Document]:
    """Load a single PDF file and return one `Document` per page.

    Args:
        file_path: Path to a `.pdf` file on disk.

    Returns:
        A list of LangChain `Document` objects (one per page), each with
        `page_content` (extracted text) and `metadata` (source path, page
        number) populated by `PyPDFLoader`.

    Raises:
        FileNotFoundError: If `file_path` does not exist.
        ValueError: If `file_path` does not have a `.pdf` extension.
    """
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"PDF file not found: {path}")

    if path.suffix.lower() != ".pdf":
        raise ValueError(f"Expected a .pdf file, got: {path.suffix}")

    loader = PyPDFLoader(str(path))
    return loader.load()


def load_pdfs(file_paths: List[Union[str, Path]]) -> List[Document]:
    """Load multiple PDF files and return their combined pages as
    `Document` objects.

    Args:
        file_paths: A list of paths to `.pdf` files.

    Returns:
        A flattened list of `Document` objects across all provided files.
    """
    documents: List[Document] = []
    for file_path in file_paths:
        documents.extend(load_pdf(file_path))
    return documents


def load_pdfs_from_directory(directory_path: Union[str, Path]) -> List[Document]:
    """Load every PDF file found in a directory (non-recursive).

    Args:
        directory_path: Path to a directory containing `.pdf` files.

    Returns:
        A flattened list of `Document` objects across all PDFs found.

    Raises:
        NotADirectoryError: If `directory_path` is not a valid directory.
    """
    directory = Path(directory_path)

    if not directory.is_dir():
        raise NotADirectoryError(f"Not a directory: {directory}")

    pdf_paths = sorted(directory.glob("*.pdf"))
    return load_pdfs(pdf_paths)
