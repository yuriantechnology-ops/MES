-- Default A-E 50-mark scale
INSERT INTO "GradingRule" (id, "tenantId", "minScore", "maxScore", grade, "gradePoint")
VALUES
  (gen_random_uuid()::text, :tenant_id, 41, 50, 'A', 1),
  (gen_random_uuid()::text, :tenant_id, 31, 40, 'B', 2),
  (gen_random_uuid()::text, :tenant_id, 21, 30, 'C', 3),
  (gen_random_uuid()::text, :tenant_id, 11, 20, 'D', 4),
  (gen_random_uuid()::text, :tenant_id, 0, 10, 'E', 5);
