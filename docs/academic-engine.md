# Academic Engine (Tanzania-aligned)

## Master Subject Bank
Global `master_subjects` includes primary and secondary catalog aligned to NECTA orientation.

## Tenant Subject Selection
`tenant_subjects` allows each school to activate only relevant subjects.

## Flexible Classes
`classes` are tenant-defined (`Std 1-7`, `Form 1-6`, or custom mixed structures).

## Default Grading (A-E, 50 scale)
- 41–50: A
- 31–40: B
- 21–30: C
- 11–20: D
- 0–10: E

## Primary Academic Indicator
Letter grade is first-class academic indicator; GPA remains optional.

## Policy Engine
`academic_policies` stores:
- grading scale JSON
- promotion logic JSON
- ranking toggle
- attendance threshold
- division mode toggle

## Report Card Template Sections
1. School branding
2. Subject table (CA, Exam, Total, Grade)
3. Summary (average, overall grade, position)
4. Grade key
5. Teacher comments
6. Attendance
7. Signature/seal/watermark
