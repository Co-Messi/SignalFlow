# SignalFlow API

FastAPI backend for the SignalFlow AI trading signal dashboard. Serves strategy signals, performance stats, and analytics.

## Quick Start

```bash
# Install
pip install -e ".[dev]"

# Seed the database with sample data
python -m app.seed

# Run the server
uvicorn app.main:app --reload

# Run tests
pytest tests/ -v
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/signals` | List signals (filterable: `asset`, `strategy`, `min_confidence`, `limit`, `offset`) |
| GET | `/api/signals/latest` | Latest signal per strategy |
| GET | `/api/signals/{id}` | Single signal detail |
| GET | `/api/strategies` | List active strategies with hit rates |
| GET | `/api/stats` | Dashboard summary stats |

## Tech Stack

- Python 3.11+
- FastAPI + Uvicorn
- SQLAlchemy 2.0 (SQLite for MVP)
- Pydantic v2

## Project Structure

```
app/
  main.py       # FastAPI app + routes
  models.py     # SQLAlchemy models (Signal, Strategy)
  schemas.py    # Pydantic response schemas
  database.py   # DB engine + session
  seed.py       # Migration + sample data seeder
tests/
  conftest.py   # Test fixtures
  test_api.py   # API endpoint tests
```
