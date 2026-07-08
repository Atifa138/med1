# MediGuide AI — Backend Foundation

Backend scaffolding for **MediGuide AI: Multi-Agent Medical Report Navigator**.

> **Scope of this build:** this is only the backend *foundation*. It sets up
> the FastAPI app, folder structure, database layer, and placeholder API
> endpoints. It intentionally does **not** include AI agents, CrewAI, RAG,
> Firebase Authentication, or a frontend — those will be built on top of this
> foundation later.

## Project Structure

```
backend/
│── app/
│   │── main.py            # FastAPI app instance, routers, CORS, health check
│   │── config.py          # Environment-based settings (pydantic-settings)
│   │── database.py        # SQLAlchemy engine, session, Base, init_db()
│   │
│   ├── routers/
│   │      upload.py       # POST /upload — placeholder
│   │      analyze.py      # POST /analyze — placeholder
│   │      history.py      # GET  /history — placeholder
│   │
│   ├── services/          # Business logic layer (empty, for future use)
│   ├── models/            # SQLAlchemy ORM models (placeholder Report model)
│   ├── schemas/           # Pydantic request/response schemas
│   ├── utils/             # Shared helper utilities (empty, for future use)
│   └── __init__.py
│
│── uploads/                # Local storage target for uploaded files
│── requirements.txt
│── .env.example
│── README.md
```

## Getting Started

### 1. Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Adjust values in `.env` as needed (database URL, CORS origins, etc.).

### 4. Run the development server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`, with interactive docs
at `http://localhost:8000/docs`.

## Available Endpoints

| Method | Path        | Description                                  |
|--------|-------------|-----------------------------------------------|
| GET    | `/`         | Root — confirms the API is running            |
| GET    | `/health`   | Health check                                  |
| POST   | `/upload/`  | Placeholder for uploading a medical report    |
| POST   | `/analyze/` | Placeholder for triggering report analysis    |
| GET    | `/history/` | Placeholder for retrieving report history     |

All three feature endpoints currently return static placeholder responses
and do not implement any business logic, file storage, or AI processing yet.

## Database

- Uses **SQLite** via SQLAlchemy for simplicity in local/hackathon
  development (see `DATABASE_URL` in `.env`).
- Tables are created automatically on startup via `init_db()` in
  `app/main.py`'s lifespan handler.
- A minimal placeholder `Report` model (`app/models/report.py`) exists to
  validate the database wiring end-to-end.

## Next Steps (Not Included in This Build)

- Implement real business logic in `services/` for upload, analysis, and
  history.
- Integrate multi-agent orchestration (e.g. CrewAI) and RAG pipelines.
- Add Firebase Authentication and protect routes accordingly.
- Build the frontend client.
- Replace `Base.metadata.create_all()` with a proper migration tool (e.g.
  Alembic) as the schema evolves.
