# Oreng Backend

Express + MongoDB API for the Oreng corporate website (leads, admin CMS, public content).

## Quick start

```bash
cp .env.example .env
# Edit MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

npm install
npm run seed    # optional sample games / case study / blog
npm run dev     # http://localhost:5000
```

## Public API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/leads/contact` | Contact / consultation lead |
| POST | `/api/leads/demo` | Demo request lead |
| GET | `/api/games` | Published games (`?category=&featured=true`) |
| GET | `/api/games/:slug` | Game detail |
| GET | `/api/case-studies` | Published case studies |
| GET | `/api/case-studies/:slug` | Case study detail |
| GET | `/api/blog` | Published posts |
| GET | `/api/blog/:slug` | Post detail |

## Admin API (Bearer JWT)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/admin/auth/login` | Login → `{ token, admin }` |
| GET | `/api/admin/dashboard/stats` | KPI counts |
| GET/PATCH/DELETE | `/api/admin/leads` | Lead CRM |
| CRUD | `/api/admin/games` | Games CMS |
| CRUD | `/api/admin/case-studies` | Portfolio CMS |
| CRUD | `/api/admin/blog` | Insights CMS |

Default admin is created on boot from `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
