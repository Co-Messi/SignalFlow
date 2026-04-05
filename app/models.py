import enum
from datetime import datetime, timezone

from sqlalchemy import DateTime, Enum, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Direction(str, enum.Enum):
    long = "long"
    short = "short"
    neutral = "neutral"


class Outcome(str, enum.Enum):
    pending = "pending"
    hit = "hit"
    miss = "miss"


class StrategyStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"


class Signal(Base):
    __tablename__ = "signals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    asset: Mapped[str] = mapped_column(String(20), index=True)
    direction: Mapped[Direction] = mapped_column(Enum(Direction))
    confidence: Mapped[int] = mapped_column(Integer)
    strategy_source: Mapped[str] = mapped_column(String(50), index=True)
    reasoning: Mapped[str] = mapped_column(Text)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    outcome: Mapped[Outcome] = mapped_column(Enum(Outcome), default=Outcome.pending)
    entry_price: Mapped[float] = mapped_column(Float)
    target_price: Mapped[float] = mapped_column(Float)
    stop_loss: Mapped[float] = mapped_column(Float)


class Strategy(Base):
    __tablename__ = "strategies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    description: Mapped[str] = mapped_column(Text)
    type: Mapped[str] = mapped_column(String(30))
    hit_rate: Mapped[float] = mapped_column(Float, default=0.0)
    total_signals: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[StrategyStatus] = mapped_column(
        Enum(StrategyStatus), default=StrategyStatus.active
    )
