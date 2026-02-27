# Payment Reconciliation Flow

## 1. Initiation
Parent pays via bank/mobile provider against invoice reference.

## 2. Webhook Ingestion
Endpoint receives provider callback:
- Validate signature and source IP policy.
- Validate idempotency key/event hash.
- Normalize payload to internal transaction DTO.

## 3. Matching
- Lookup invoice by `reference_number` and `tenant context`.
- Verify currency and amount.
- Verify payment not already settled.

## 4. Reconciliation Decisions
- `amount == outstanding` => mark invoice `PAID`.
- `amount < outstanding` => mark `PARTIAL`, update `balance_due`.
- `amount > outstanding` => mark invoice `PAID`, create `credit_balance` record.
- Unknown invoice => mark transaction `UNALLOCATED`, queue finance review.

## 5. Automation
- Create `payments` row.
- Store raw provider payload in `payment_transactions`.
- Emit events:
  - `invoice.paid`
  - `invoice.partial`
  - `payment.unallocated`
- Notify parent/accountant via SMS/email/in-app.

## 6. Controls
- Retry-safe idempotent processing.
- Dead-letter queue for malformed payloads.
- Daily reconciliation report comparing provider settlements vs internal ledger.

## Provider Adapter Pattern
Each provider implements:
- `verifySignature(headers, body): boolean`
- `normalizeWebhook(body): InternalPaymentEvent`
- `ackResponse(): HttpResponse`
