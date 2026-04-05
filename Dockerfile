FROM python:3.12-slim

WORKDIR /app

RUN pip install --no-cache-dir uvicorn[standard] fastapi sqlalchemy pydantic

COPY app/ ./app/
COPY pyproject.toml ./

ENV DATABASE_URL="sqlite:///signalflow.db"

EXPOSE 8000

CMD ["sh", "-c", "cd /app && python -c \"from app.database import Base, engine; Base.metadata.create_all(bind=engine)\" && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
