from langchain_huggingface import HuggingFaceEmbeddings

_embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def get_embeddings():
    return _embedding_model