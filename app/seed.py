"""Create tables and seed sample data."""

import random
from datetime import datetime, timedelta, timezone

from app.database import Base, SessionLocal, engine
from app.models import Direction, Outcome, Signal, Strategy, StrategyStatus

STRATEGIES = [
    {
        "name": "SMA Crossover",
        "description": "Simple moving average crossover strategy using 50/200 day windows",
        "type": "trend",
        "hit_rate": 0.62,
        "total_signals": 148,
    },
    {
        "name": "RSI Reversal",
        "description": "Mean reversion signals based on RSI overbought/oversold levels",
        "type": "mean_reversion",
        "hit_rate": 0.58,
        "total_signals": 203,
    },
    {
        "name": "MACD Momentum",
        "description": "Momentum signals from MACD histogram divergence",
        "type": "momentum",
        "hit_rate": 0.55,
        "total_signals": 175,
    },
    {
        "name": "Bollinger Squeeze",
        "description": "Volatility breakout signals from Bollinger Band compression",
        "type": "volatility",
        "hit_rate": 0.60,
        "total_signals": 112,
    },
    {
        "name": "Sentiment Alpha",
        "description": "NLP-driven signals from social media and news sentiment analysis",
        "type": "sentiment",
        "hit_rate": 0.53,
        "total_signals": 89,
    },
    {
        "name": "Whale Tracker",
        "description": "On-chain whale wallet movement detection for crypto assets",
        "type": "on_chain",
        "hit_rate": 0.67,
        "total_signals": 64,
    },
    {
        "name": "Correlation Arb",
        "description": "Cross-asset correlation breakdown detection for pair trades",
        "type": "statistical_arb",
        "hit_rate": 0.61,
        "total_signals": 97,
    },
]

ASSETS = ["BTC", "ETH", "SOL", "AAPL", "TSLA", "NVDA", "SPY", "QQQ", "AVAX", "LINK"]

REASONING_TEMPLATES = {
    "SMA Crossover": [
        "50-day SMA crossed above 200-day SMA — golden cross confirmed on {asset}",
        "Death cross forming on {asset} as 50-day SMA breaks below 200-day",
        "{asset} price reclaimed both moving averages with strong volume",
    ],
    "RSI Reversal": [
        "RSI dropped to {rsi} on {asset} — deeply oversold, expecting bounce",
        "{asset} RSI at {rsi}, overbought territory — reversal likely",
        "RSI divergence detected on {asset} daily chart",
    ],
    "MACD Momentum": [
        "MACD histogram turning positive on {asset} — momentum shifting bullish",
        "Bearish MACD crossover on {asset} with increasing histogram",
        "{asset} MACD signal line cross with volume confirmation",
    ],
    "Bollinger Squeeze": [
        "Bollinger bandwidth at 6-month low on {asset} — breakout imminent",
        "{asset} broke above upper Bollinger band with expanding bandwidth",
        "Squeeze released on {asset} — directional move underway",
    ],
    "Sentiment Alpha": [
        "Twitter sentiment for {asset} shifted +2σ in 4 hours — bullish surge",
        "Negative news cluster detected for {asset} — risk-off signal",
        "Sentiment momentum diverging from price action on {asset}",
    ],
    "Whale Tracker": [
        "Large wallet moved 5,000 {asset} to exchange — potential sell pressure",
        "Whale accumulation detected: 12,000 {asset} moved to cold storage",
        "Smart money flowing into {asset} — 3 whale wallets added positions",
    ],
    "Correlation Arb": [
        "{asset}/ETH correlation broke down from 0.85 to 0.42 — pair trade opportunity",
        "Cross-asset correlation spike between {asset} and SPY — reversion expected",
        "{asset} decorrelating from sector — independent momentum signal",
    ],
}


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing data
    db.query(Signal).delete()
    db.query(Strategy).delete()

    # Insert strategies
    strategy_objs = []
    for s in STRATEGIES:
        obj = Strategy(**s, status=StrategyStatus.active)
        db.add(obj)
        strategy_objs.append(obj)

    db.flush()

    # Generate signals
    now = datetime.now(timezone.utc)
    random.seed(42)

    for i in range(120):
        strategy = random.choice(STRATEGIES)
        asset = random.choice(ASSETS)
        direction = random.choice(list(Direction))
        confidence = random.randint(35, 95)

        # Pick a reasoning template
        templates = REASONING_TEMPLATES[strategy["name"]]
        reasoning = random.choice(templates).format(
            asset=asset, rsi=random.randint(15, 85)
        )

        # Generate realistic prices
        base_price = {
            "BTC": 67000, "ETH": 3400, "SOL": 145, "AAPL": 195,
            "TSLA": 175, "NVDA": 880, "SPY": 520, "QQQ": 450,
            "AVAX": 38, "LINK": 15,
        }[asset]

        noise = base_price * random.uniform(-0.05, 0.05)
        entry = round(base_price + noise, 2)

        if direction == Direction.long:
            target = round(entry * random.uniform(1.02, 1.08), 2)
            stop = round(entry * random.uniform(0.95, 0.98), 2)
        elif direction == Direction.short:
            target = round(entry * random.uniform(0.92, 0.98), 2)
            stop = round(entry * random.uniform(1.02, 1.05), 2)
        else:
            target = round(entry * random.uniform(0.99, 1.01), 2)
            stop = round(entry * random.uniform(0.97, 1.03), 2)

        # Older signals have outcomes, recent ones are pending
        hours_ago = random.randint(0, 720)
        ts = now - timedelta(hours=hours_ago)

        if hours_ago > 48:
            outcome = random.choices(
                [Outcome.hit, Outcome.miss],
                weights=[strategy["hit_rate"], 1 - strategy["hit_rate"]],
            )[0]
        else:
            outcome = Outcome.pending

        signal = Signal(
            asset=asset,
            direction=direction,
            confidence=confidence,
            strategy_source=strategy["name"],
            reasoning=reasoning,
            timestamp=ts,
            outcome=outcome,
            entry_price=entry,
            target_price=target,
            stop_loss=stop,
        )
        db.add(signal)

    db.commit()
    db.close()
    print("Database seeded with 7 strategies and 120 signals.")


if __name__ == "__main__":
    seed()
