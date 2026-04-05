import pytest
import pytest_asyncio


@pytest.mark.asyncio
async def test_list_signals(client):
    async with client:
        resp = await client.get("/api/signals")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 3
    assert all("asset" in s for s in data)


@pytest.mark.asyncio
async def test_list_signals_filter_asset(client):
    async with client:
        resp = await client.get("/api/signals", params={"asset": "BTC"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 2
    assert all(s["asset"] == "BTC" for s in data)


@pytest.mark.asyncio
async def test_list_signals_filter_strategy(client):
    async with client:
        resp = await client.get("/api/signals", params={"strategy": "RSI Reversal"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    assert data[0]["strategy_source"] == "RSI Reversal"


@pytest.mark.asyncio
async def test_list_signals_filter_confidence(client):
    async with client:
        resp = await client.get("/api/signals", params={"min_confidence": 80})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 1
    assert data[0]["confidence"] >= 80


@pytest.mark.asyncio
async def test_latest_signals(client):
    async with client:
        resp = await client.get("/api/signals/latest")
    assert resp.status_code == 200
    data = resp.json()
    strategies = {s["strategy_source"] for s in data}
    assert "SMA Crossover" in strategies
    assert "RSI Reversal" in strategies


@pytest.mark.asyncio
async def test_get_signal(client):
    async with client:
        # Get list first to find an ID
        list_resp = await client.get("/api/signals")
        signal_id = list_resp.json()[0]["id"]
        resp = await client.get(f"/api/signals/{signal_id}")
    assert resp.status_code == 200
    assert resp.json()["id"] == signal_id


@pytest.mark.asyncio
async def test_get_signal_not_found(client):
    async with client:
        resp = await client.get("/api/signals/99999")
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_list_strategies(client):
    async with client:
        resp = await client.get("/api/strategies")
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) == 2
    # Should be ordered by hit_rate desc
    assert data[0]["hit_rate"] >= data[1]["hit_rate"]


@pytest.mark.asyncio
async def test_dashboard_stats(client):
    async with client:
        resp = await client.get("/api/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_signals"] == 3
    assert data["assets_tracked"] == 2  # BTC, ETH
    assert data["active_strategies"] == 2
    assert data["pending_signals"] == 1
    # 1 hit out of 2 resolved = 0.5
    assert data["accuracy"] == 0.5
