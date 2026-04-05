from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.models import Outcome, Signal, Strategy, StrategyStatus
from app.schemas import SignalOut, StatsOut, StrategyOut

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SignalFlow API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/signals", response_model=list[SignalOut])
def list_signals(
    asset: str | None = None,
    strategy: str | None = None,
    min_confidence: int | None = None,
    limit: int = Query(default=50, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    q = db.query(Signal)
    if asset:
        q = q.filter(Signal.asset == asset.upper())
    if strategy:
        q = q.filter(Signal.strategy_source == strategy)
    if min_confidence is not None:
        q = q.filter(Signal.confidence >= min_confidence)
    return q.order_by(Signal.timestamp.desc()).offset(offset).limit(limit).all()


@app.get("/api/signals/latest", response_model=list[SignalOut])
def latest_signals(db: Session = Depends(get_db)):
    subq = (
        db.query(
            Signal.strategy_source,
            func.max(Signal.timestamp).label("max_ts"),
        )
        .group_by(Signal.strategy_source)
        .subquery()
    )
    return (
        db.query(Signal)
        .join(
            subq,
            (Signal.strategy_source == subq.c.strategy_source)
            & (Signal.timestamp == subq.c.max_ts),
        )
        .all()
    )


@app.get("/api/signals/{signal_id}", response_model=SignalOut)
def get_signal(signal_id: int, db: Session = Depends(get_db)):
    signal = db.query(Signal).filter(Signal.id == signal_id).first()
    if not signal:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Signal not found")
    return signal


@app.get("/api/strategies", response_model=list[StrategyOut])
def list_strategies(db: Session = Depends(get_db)):
    return db.query(Strategy).order_by(Strategy.hit_rate.desc()).all()


@app.get("/api/stats", response_model=StatsOut)
def dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(func.count(Signal.id)).scalar() or 0
    hits = (
        db.query(func.count(Signal.id))
        .filter(Signal.outcome == Outcome.hit)
        .scalar()
        or 0
    )
    resolved = (
        db.query(func.count(Signal.id))
        .filter(Signal.outcome != Outcome.pending)
        .scalar()
        or 0
    )
    accuracy = round(hits / resolved, 4) if resolved > 0 else 0.0
    assets = db.query(func.count(func.distinct(Signal.asset))).scalar() or 0
    active = (
        db.query(func.count(Strategy.id))
        .filter(Strategy.status == StrategyStatus.active)
        .scalar()
        or 0
    )
    pending = (
        db.query(func.count(Signal.id))
        .filter(Signal.outcome == Outcome.pending)
        .scalar()
        or 0
    )
    return StatsOut(
        total_signals=total,
        accuracy=accuracy,
        assets_tracked=assets,
        active_strategies=active,
        pending_signals=pending,
    )
