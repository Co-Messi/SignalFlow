# SignalFlow Frontend

AI-powered trading signal dashboard and landing page.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Recharts** for data visualization
- **TypeScript**

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Landing page with hero, features, pricing, and newsletter signup
- `/dashboard` — Real-time signal dashboard with filters, strategy overview, and accuracy charts

## Connecting to the API

Set the `NEXT_PUBLIC_API_URL` environment variable to point at the SignalFlow API:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000 npm run dev
```

Without it, the frontend uses built-in mock data.

## API Endpoints Consumed

| Endpoint | Description |
|---|---|
| `GET /api/signals` | Paginated, filterable signal list |
| `GET /api/signals/latest` | Latest signal per strategy |
| `GET /api/strategies` | Strategy list with hit rates |
| `GET /api/stats` | Dashboard summary stats |

## Deploy

Deploy to Vercel:

```bash
npx vercel
```
