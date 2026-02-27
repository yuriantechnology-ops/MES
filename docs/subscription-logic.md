# SaaS Subscription Logic

## Plans
- **Basic**: student management, manual payments, basic reports.
- **Professional**: result engine, parent portal, mobile money integrations.
- **Enterprise**: bank integrations, analytics, benchmarking, branding, priority support.

## Billing Strategies
1. Per-student monthly pricing (`active_students * unit_price`).
2. Tier-based pricing bands (0-300, 301-800, 800+).

## Entitlements
Feature flags attached to plan and read at auth session build time.

## Lifecycle States
- `TRIAL`
- `ACTIVE`
- `PAST_DUE`
- `SUSPENDED`
- `CANCELLED`

## Enforcement
- Soft warning window for `PAST_DUE`.
- Hard lock on sensitive writes when `SUSPENDED` (read-only mode exception for finance/report export).

## Tenant Provisioning Flow
1. School registration.
2. Create tenant + default admin user.
3. Attach trial subscription.
4. Seed defaults:
   - grading rules A-E (41-50 A ... 0-10 E)
   - academic policy baseline
   - default role matrix

## Add-on Revenue
- SMS bundles
- Custom domain
- Data migration
- White-label license
- Onboarding/training
