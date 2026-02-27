# MES - Multi-tenant Education SaaS (Tanzania)

Enterprise-grade implementation blueprint + executable domain engines for a **multi-tenant School Management SaaS** targeting Primary and Secondary schools in Tanzania.

## Stack
- **Frontend:** Next.js (TypeScript)
- **Backend:** NestJS (TypeScript)
- **Database:** PostgreSQL + Prisma ORM
- **Cache/Queue:** Redis
- **Containerization:** Docker + Docker Compose

## What is now implemented (beyond docs)
- Comprehensive Prisma domain schema with normalized relationships and constraints.
- Executable academic result engine (grading, ranking, division, integrity checks).
- Executable payment reconciliation engine (exact/partial/overpayment + provider normalization).
- Executable subscription entitlement and billing logic (tier/per-student).
- Automated Node tests validating core SaaS business logic.

## Monorepo Layout
- `apps/frontend` – Next.js app scaffold
- `apps/backend` – NestJS scaffold + domain engines + tests
- `prisma` – schema + seed SQL for subject bank and default grading policy
- `infra` – Docker setup
- `docs` – architecture/API/deployment/roadmap docs

## Run Domain Logic Tests
```bash
npm run test:engines
```

## Core Docs
- Architecture: `docs/architecture.md`
- API endpoint map: `docs/api-endpoints.md`
- OpenAPI starter: `docs/api/openapi.yaml`
- Database + migration order: `docs/database-schema.md`
- Result algorithm: `docs/result-computation.md`
- Reconciliation flow: `docs/payment-reconciliation.md`
- Subscription logic: `docs/subscription-logic.md`
- Deployment guide: `docs/deployment-guide.md`
