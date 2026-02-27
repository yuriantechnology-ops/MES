# Deployment Guide (Dockerized Production-Ready)

## Services
- `web` (Next.js)
- `api` (NestJS)
- `worker` (NestJS job worker)
- `postgres`
- `redis`
- optional `nginx`

## Environment
Copy `.env.example` and set:
- Database URL
- Redis URL
- JWT secrets
- Provider webhook secrets
- SMTP/SMS credentials
- Storage bucket credentials

## Local Container Run
```bash
cd infra
docker compose up -d --build
```

## Production Checklist
1. Enable TLS/HTTPS.
2. Use managed PostgreSQL with backups and PITR.
3. Configure Redis persistence and eviction policy.
4. Run Prisma migrations in CI/CD.
5. Enable structured logging + metrics.
6. Configure WAF/rate-limits for webhook endpoints.
7. Rotate secrets (Vault/Secrets Manager).
8. Set horizontal autoscaling for API + workers.

## CI/CD Suggested Stages
- Lint
- Unit tests
- Build images
- Security scan
- DB migration
- Deploy (blue/green or rolling)
- Smoke tests
