# Database Schema and Migration Order

## Migration Order
1. tenants
2. subscriptions
3. users
4. roles
5. permissions
6. user_roles
7. academic_years
8. terms
9. classes
10. streams
11. master_subjects
12. tenant_subjects
13. class_subjects
14. parents
15. students
16. teachers
17. enrollments
18. teacher_assignments
19. exams
20. grading_rules
21. marks
22. computed_results
23. rankings
24. fee_structures
25. invoices
26. payments
27. payment_transactions
28. audit_logs
29. activity_logs
30. notifications
31. academic_policies
32. necta_mappings

## Column-Level Notes (High-level)
- **tenants**: SaaS tenant profile and subscription linkage.
- **subscriptions**: Plan definition + pricing + feature JSON.
- **users**: Tenant-scoped identities (email uniqueness at tenant scope).
- **roles/permissions/user_roles/role_permissions**: RBAC matrix.
- **master_subjects**: Global SIS + NECTA-aligned subject catalog.
- **tenant_subjects**: Tenant-selected subset from master subjects.
- **classes**: Tenant-defined flexible class hierarchy (primary/secondary).
- **grading_rules**: Tenant-configurable default A-E model.
- **marks/computed_results/rankings**: Result engine persisted outputs.
- **invoices/payments/payment_transactions**: Finance and reconciliation core.
- **audit_logs/activity_logs**: security, compliance, and investigation trails.
- **academic_policies**: JSON-configurable grading/promotion/attendance/ranking toggles.

See `prisma/schema.prisma` for implementation-level definitions.
