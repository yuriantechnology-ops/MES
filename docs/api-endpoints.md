# Enterprise API Endpoint Map

Base path: `/api/v1`

## A. Authentication
- `POST /auth/login`
- `POST /auth/register-school`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/2fa/verify`
- `GET /auth/me`

## B. Tenant Management (SaaS Owner)
- `GET /tenants`
- `GET /tenants/:id`
- `PATCH /tenants/:id`
- `DELETE /tenants/:id`
- `GET /tenants/:id/subscription`
- `PATCH /tenants/:id/subscription`

## C. Users & Roles
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`
- `POST /roles`
- `GET /roles`
- `PATCH /roles/:id`

## D. Student Module
- `POST /students`
- `GET /students`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`
- `POST /students/:id/transfer`
- `GET /students/:id/history`

## E. Staff Module
- `POST /teachers`
- `GET /teachers`
- `PATCH /teachers/:id`
- `DELETE /teachers/:id`
- `POST /teachers/:id/assign-subject`

## F. Academic Structure
- `POST /classes`
- `POST /streams`
- `POST /subjects`
- `GET /academic-structure`

## G. Exams & Marks
- `POST /exams`
- `POST /marks/bulk-upload`
- `GET /results/class/:classId`
- `GET /results/student/:studentId`
- `POST /results/compute`

## H. Finance
- `POST /fees/structure`
- `POST /invoices/generate`
- `GET /invoices/:studentId`
- `POST /payments/manual`
- `POST /payments/webhook/:provider`
- `GET /finance/report`

### Webhook Providers
- `POST /payments/webhook/nmb`
- `POST /payments/webhook/nbc`
- `POST /payments/webhook/crdb`
- `POST /payments/webhook/mpesa`
- `POST /payments/webhook/airtel-money`
- `POST /payments/webhook/tigo-pesa`

## I. Reports
- `GET /reports/report-card/:studentId`
- `GET /reports/transcript/:studentId`
- `GET /reports/class-performance/:classId`

## J. Analytics & Risk
- `GET /analytics/performance/predictive`
- `GET /analytics/fee-default-risk`
- `GET /analytics/benchmarking`
- `GET /analytics/grade-anomalies`

## K. Policies & Configuration
- `GET /policies/academic`
- `PATCH /policies/academic`
- `GET /grading-rules`
- `PATCH /grading-rules`
