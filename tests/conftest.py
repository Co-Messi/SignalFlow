import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app
from app.models import Direction, Outcome, Signal, Strategy, StrategyStatus

from datetime import datetime, timezone
from httpx import ASGITransport, AsyncClient

TEST_DB = "sqlite:///test_signalflow.db"
test_engine = create_engine(TEST_DB, connect_args={"check_same_thread": False})
TestSession = sessionmaker(bind=test_engine)


def override_get_db():
    db = TestSession()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=test_engine)
    db = TestSession()

    # Seed minimal test data
    db.query(Signal).delete()
    db.query(Strategy).delete()

    s1 = Strategy(
        name="SMA Crossover", description="Test strategy", type="trend",
        hit_rate=0.62, total_signals=10, status=StrategyStatus.active,
    )
    s2 = Strategy(
        name="RSI Reversal", description="Test strategy 2", type="mean_reversion",
        hit_rate=0.58, total_signals=5, status=StrategyStatus.active,
    )
    db.add_all([s1, s2])
    db.flush()

    now = datetime.now(timezone.utc)
    signals = [
        Signal(
            asset="BTC", direction=Direction.long, confidence=85,
            strategy_source="SMA Crossover", reasoning="Golden cross on BTC",
            timestamp=now, outcome=Outcome.pending,
            entry_price=67000, target_price=70000, stop_loss=65000,
        ),
        Signal(
            asset="ETH", direction=Direction.short, confidence=60,
            strategy_source="RSI Reversal", reasoning="RSI overbought on ETH",
            timestamp=now, outcome=Outcome.hit,
            entry_price=3400, target_price=3200, stop_loss=3500,
        ),
        Signal(
            asset="BTC", direction=Direction.long, confidence=72,
            strategy_source="SMA Crossover", reasoning="SMA test signal",
            timestamp=now, outcome=Outcome.miss,
            entry_price=66000, target_price=69000, stop_loss=64000,
        ),
    ]
    db.add_all(signals)
    db.commit()
    db.close()
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def client():
    from httpx import AsyncClient, ASGITransport
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")
