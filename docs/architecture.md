# Enterprise System Architecture

## 1. Multi-tenant Model
- **Logical isolation** by `tenant_id` on every tenant-owned table.
- Row-level guards in backend middleware/interceptors.
- Global tables (`master_subjects`, plans, permissions catalog) separated from tenant-bound data.

## 2. High-Level Components

### Frontend (Next.js)
- Portal shells:
  - SaaS Owner Console
  - School Admin Console
  - Teacher Workspace
  - Accountant Workspace
  - Parent/Student Portal
- BFF-style API client with tenant-aware headers.
- Real-time notifications via WebSocket/SSE.

### Backend (NestJS)
- Modular monolith with microservice-ready boundaries:
  - `auth`
  - `tenant-core`
  - `academic`
  - `results`
  - `finance`
  - `reporting`
  - `notifications`
  - `analytics`
  - `audit-security`
- API Gateway-ready route grouping under `/api/v1`.
- Background workers for heavy jobs (PDF, reconciliation, analytics scoring).

### Data Layer
- PostgreSQL primary datastore.
- Prisma ORM for schema + typed query layer.
- Redis for:
  - Session/token blacklists
  - Cached dashboards
  - Queue broker backing (BullMQ or equivalent)

## 3. Request Flow
1. User authenticates (`/auth/login`).
2. JWT includes `tenant_id`, role claims, and feature flags.
3. TenantGuard resolves active tenant and enforces row filters.
4. RBAC + permissions gate endpoint access.
5. Domain services persist, log audits, emit domain events.

## 4. Security & Compliance
- JWT rotation + refresh tokens.
- Optional TOTP-based 2FA.
- Audit trail on critical entities (marks, invoices, payments, policies).
- Mark tamper detection and suspicious score jump checks.
- PII encryption-at-rest for sensitive columns (where required).

## 5. Integration Architecture
- Provider adapters for:
  - NMB, NBC, CRDB
  - M-Pesa, Airtel Money, Tigo Pesa
- Normalized payment event model -> reconciliation engine.
- Idempotent webhook handlers with signature verification.

## 6. Scale Strategy
- Read replicas for analytics/reporting workload.
- Redis cache warming for dashboards.
- Horizontal scaling for API pods and workers.
- Object storage for generated PDFs.

## 7. Target Production Topology
- `api` (NestJS)
- `web` (Next.js)
- `worker` (NestJS worker process)
- `postgres`
- `redis`
- `nginx`/ingress + TLS termination
- observability stack (Prometheus/Grafana + centralized logs)
