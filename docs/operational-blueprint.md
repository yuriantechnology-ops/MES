# Operational Blueprint

## ERD Logic Summary
- 1 tenant -> many users, students, teachers, classes, invoices.
- users <-> roles (many-to-many), roles <-> permissions (many-to-many).
- students link to class, stream, parent; students have marks and invoices.
- classes <-> tenant_subjects via class_subjects.
- exams have many marks; computed_results and rankings are derived aggregates.
- finance chain: fee_structures -> invoices -> payments -> payment_transactions.
- future NECTA: subject mappings and national exam result history.

## 6-Month Sprint Plan
- **Month 1:** Auth, tenancy, RBAC foundation.
- **Month 2:** Academic core (students, teachers, classes, enrollment).
- **Month 3:** Exams/results engine + report cards.
- **Month 4:** Finance module baseline.
- **Month 5:** Bank/mobile money integrations + reconciliation.
- **Month 6:** Analytics, hardening, load tests, launch prep.

## Go-To-Market (Tanzania)
- Pilot private schools with 3-month onboarding package.
- Build trust with district education stakeholders.
- Direct field demos + education expos.
- Digital funnel (WhatsApp + social proof case studies).

## Hiring Plan
- Core: Backend Lead, Frontend Engineer, DevOps, UI/UX.
- Growth: Integration Engineer, Data Engineer, Security Engineer.
- Leadership: CTO, Product Manager, Sales Lead, Customer Success.

## Investor Pitch Outline
1. Problem
2. Solution
3. Market size
4. Differentiation
5. Revenue model
6. Scale vision (East Africa expansion)
