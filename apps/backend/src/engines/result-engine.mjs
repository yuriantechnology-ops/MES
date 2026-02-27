/**
 * Enterprise grade result engine (tenant-configurable)
 */

export function computeWeightedTotal(mark, weights) {
  if (weights.mode === 'SUM') {
    return round2(Number(mark.caScore) + Number(mark.examScore));
  }
  const ca = Number(mark.caScore) * Number(weights.ca);
  const ex = Number(mark.examScore) * Number(weights.exam);
  return round2(ca + ex);
}

export function resolveGrade(score, gradingRules) {
  const rule = gradingRules.find((r) => score >= r.minScore && score <= r.maxScore);
  if (!rule) {
    return { grade: 'N/A', gradePoint: null };
  }
  return { grade: rule.grade, gradePoint: rule.gradePoint ?? null };
}

export function divisionFromBestSubjects(subjectResults, bestN = 7) {
  const points = subjectResults
    .map((s) => Number(s.gradePoint ?? 9))
    .sort((a, b) => a - b)
    .slice(0, bestN)
    .reduce((sum, p) => sum + p, 0);

  if (points >= 7 && points <= 17) return 'Division I';
  if (points >= 18 && points <= 21) return 'Division II';
  if (points >= 22 && points <= 25) return 'Division III';
  if (points >= 26 && points <= 33) return 'Division IV';
  return 'Division 0';
}

export function computeStudentResult({ marks, gradingRules, weights, policy }) {
  const subjects = marks.map((mark) => {
    const total = computeWeightedTotal(mark, weights);
    const { grade, gradePoint } = resolveGrade(total, gradingRules);
    return {
      subjectId: mark.subjectId,
      caScore: Number(mark.caScore),
      examScore: Number(mark.examScore),
      total,
      grade,
      gradePoint,
      approved: Boolean(mark.approved),
    };
  });

  const average = round2(subjects.reduce((sum, s) => sum + s.total, 0) / (subjects.length || 1));

  const gpa = policy.gpaEnabled
    ? round2(subjects.reduce((sum, s) => sum + Number(s.gradePoint ?? 0), 0) / (subjects.length || 1))
    : null;

  const division = policy.divisionEnabled ? divisionFromBestSubjects(subjects, policy.bestSubjects || 7) : null;

  const riskFlags = [];
  const lowGrades = subjects.filter((s) => ['D', 'E', 'F'].includes(s.grade)).length;
  if (lowGrades >= (policy.lowGradeThreshold ?? 3)) {
    riskFlags.push('AT_RISK_LOW_GRADES');
  }

  return { subjects, average, gpa, division, riskFlags };
}

export function rankStudents(results) {
  const ordered = [...results].sort((a, b) => {
    if (b.average !== a.average) return b.average - a.average;
    if ((b.gpa ?? -1) !== (a.gpa ?? -1)) return (b.gpa ?? -1) - (a.gpa ?? -1);

    const aTop = [...a.subjects].sort((x, y) => y.total - x.total).slice(0, 7).reduce((s, v) => s + v.total, 0);
    const bTop = [...b.subjects].sort((x, y) => y.total - x.total).slice(0, 7).reduce((s, v) => s + v.total, 0);
    return bTop - aTop;
  });

  return ordered.map((r, idx) => ({ ...r, position: idx + 1 }));
}

export function detectIntegrityIssues(previousApproved, incoming) {
  const issues = [];
  for (const current of incoming) {
    const prev = previousApproved.find((p) => p.studentId === current.studentId && p.subjectId === current.subjectId);
    if (!prev) continue;

    if (prev.approved && prev.total !== current.total) {
      issues.push({
        type: 'APPROVED_MARK_CHANGED',
        studentId: current.studentId,
        subjectId: current.subjectId,
        before: prev.total,
        after: current.total,
      });
    }

    if (Math.abs(prev.total - current.total) > 25) {
      issues.push({
        type: 'SUDDEN_SCORE_JUMP',
        studentId: current.studentId,
        subjectId: current.subjectId,
        before: prev.total,
        after: current.total,
      });
    }
  }
  return issues;
}

function round2(v) {
  return Math.round(v * 100) / 100;
}
