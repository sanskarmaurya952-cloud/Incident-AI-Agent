from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def create_embedding(text: str):

    vector = model.encode(
        text,
        normalize_embeddings=True
    )

    return vector.tolist()