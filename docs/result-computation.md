# Result Computation Engine

## Input
- Tenant
- Academic year/term/exam context
- Student marks (`ca_score`, `exam_score`)
- Tenant grading rules
- Class enrollment map

## Algorithm
1. **Fetch Raw Marks** grouped by student and subject.
2. **Apply Weights**:
   - `total = ca_score * weight_ca + exam_score * weight_exam`
   - For Tanzania default 50-scale schools, total can be direct CA+Exam if configured.
3. **Assign Grade** from `grading_rules` where `min_score <= total <= max_score`.
4. **Compute Grade Indicator**:
   - Primary indicator is letter grade (A-E).
   - Optional GPA/points for schools that enable it.
5. **Division Logic (Secondary optional)**:
   - Aggregate best-N subject points.
   - Map to Division I–IV windows.
6. **Ranking**:
   - Sort by average desc, then optional GPA desc, then best subjects tie-break.
7. **Integrity Checks**:
   - Change after approval.
   - Sudden jump > configured threshold (default 25).
   - Persist to `audit_logs` with before/after payloads.

## Output
- Subject-level grades
- Average score
- Optional GPA/division
- Position in class/stream
- Risk flags for low performance (e.g., >=3 D/E)

## Pseudocode
```ts
for (const student of classStudents) {
  const subjects = fetchMarks(student);
  const graded = subjects.map((m) => {
    const total = computeTotal(m, weights);
    const rule = findRule(total, gradingRules);
    return { ...m, total, grade: rule.grade, point: rule.gradePoint ?? null };
  });

  const average = mean(graded.map((g) => g.total));
  const gpa = policy.gpaEnabled ? mean(graded.map((g) => g.point ?? 0)) : null;
  const division = policy.divisionEnabled ? computeDivision(graded) : null;

  persistComputedResult(student, graded, average, gpa, division);
  runIntegrityChecks(student, graded);
}

rankClassResults(examId, classId);
```
