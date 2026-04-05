import os

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

_is_vercel = os.environ.get("VERCEL", "") == "1"
_default_db = "sqlite:////tmp/signalflow.db" if _is_vercel else "sqlite:///signalflow.db"
DATABASE_URL = os.environ.get("DATABASE_URL", _default_db)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
