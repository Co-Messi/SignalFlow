from datetime import datetime

from pydantic import BaseModel


class SignalOut(BaseModel):
    id: int
    asset: str
    direction: str
    confidence: int
    strategy_source: str
    reasoning: str
    timestamp: datetime
    outcome: str
    entry_price: float
    target_price: float
    stop_loss: float

    model_config = {"from_attributes": True}


class StrategyOut(BaseModel):
    id: int
    name: str
    description: str
    type: str
    hit_rate: float
    total_signals: int
    status: str

    model_config = {"from_attributes": True}


class StatsOut(BaseModel):
    total_signals: int
    accuracy: float
    assets_tracked: int
    active_strategies: int
    pending_signals: int
