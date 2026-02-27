-- Tanzania SIS + NECTA aligned baseline subjects
INSERT INTO "MasterSubject" (id, name, code, level, "nectaCode", category, active)
VALUES
  (gen_random_uuid()::text, 'English Language', 'ENG', 'PRIMARY', 'P01', 'CORE', true),
  (gen_random_uuid()::text, 'Kiswahili', 'KIS', 'PRIMARY', 'P02', 'CORE', true),
  (gen_random_uuid()::text, 'Mathematics', 'MATH', 'PRIMARY', 'P03', 'CORE', true),
  (gen_random_uuid()::text, 'Science & Technology', 'SCI', 'PRIMARY', 'P04', 'CORE', true),
  (gen_random_uuid()::text, 'Social Studies', 'SST', 'PRIMARY', 'P05', 'CORE', true),
  (gen_random_uuid()::text, 'Civic & Moral Education', 'CME', 'PRIMARY', 'P06', 'CORE', true),
  (gen_random_uuid()::text, 'Physics', 'PHY', 'SECONDARY', 'S101', 'CORE', true),
  (gen_random_uuid()::text, 'Chemistry', 'CHEM', 'SECONDARY', 'S102', 'CORE', true),
  (gen_random_uuid()::text, 'Biology', 'BIO', 'SECONDARY', 'S103', 'CORE', true),
  (gen_random_uuid()::text, 'History', 'HIST', 'SECONDARY', 'S104', 'ELECTIVE', true),
  (gen_random_uuid()::text, 'Geography', 'GEO', 'SECONDARY', 'S105', 'ELECTIVE', true),
  (gen_random_uuid()::text, 'Commerce', 'COMM', 'SECONDARY', 'S106', 'ELECTIVE', true),
  (gen_random_uuid()::text, 'Bookkeeping', 'BOOK', 'SECONDARY', 'S107', 'ELECTIVE', true),
  (gen_random_uuid()::text, 'Computer Studies', 'COMP', 'SECONDARY', 'S108', 'ELECTIVE', true)
ON CONFLICT (code) DO NOTHING;
