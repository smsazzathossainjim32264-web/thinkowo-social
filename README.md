# Think OwO

Production-oriented social media monorepo with OwO Coin economy, subscriptions, creator monetization, admin controls, and responsive UI.

## Stack
- Frontend: Next.js 14 + TailwindCSS + PWA manifest
- Backend: Express + Prisma + PostgreSQL + Socket.IO
- Auth: JWT
- Security: Helmet, CORS, rate limit, bcrypt, RBAC

## Project Structure
```
frontend/   # Next.js app
backend/    # Express API, websocket server, Prisma
/docs       # API docs
.env.example
```

## Features Included
- Auth, profiles, follow/unfollow, verified badge field
- Feed posts + comments + hashtags + trending endpoint
- Realtime channel scaffolding (typing/seen/notifications)
- OwO Coin wallet, transfer, rewards, admin mint, transaction history
- Subscription tiers: FREE/PREMIUM/CREATOR_PRO
- Creator monetization data fields: paid posts + tips/subscription tx types
- Admin stats/reports/user verification controls
- Dockerized local deployment and VPS-ready environment setup

## Local Setup
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Start database:
   ```bash
   docker compose up -d db
   ```
3. Backend:
   ```bash
   cd backend && npm install
   npx prisma migrate dev
   npm run seed
   npm run dev
   ```
4. Frontend:
   ```bash
   cd frontend && npm install
   npm run dev
   ```

## Full Docker Run
```bash
docker compose up --build
```

## Deployment (VPS)
- Provision Ubuntu server with Docker + Docker Compose.
- Set production secrets in `.env`.
- Build and launch: `docker compose up -d --build`.
- Put Nginx in front for TLS and CDN/static caching.
- Use managed PostgreSQL for scale.

## Demo Credentials
- `admin@thinkowo.dev / Password123!`
- `alice@thinkowo.dev / Password123!`
- `bob@thinkowo.dev / Password123!`

## Notes on Scalability
- Prisma enables optimized SQL and migration lifecycle.
- Socket.IO can be horizontally scaled with Redis adapter.
- Stateless JWT auth supports multi-instance deployment.
- Add object storage (S3/R2) for media and CDN offload.
