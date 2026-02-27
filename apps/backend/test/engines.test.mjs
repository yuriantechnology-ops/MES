import test from 'node:test';
import assert from 'node:assert/strict';

import {
  computeStudentResult,
  rankStudents,
  detectIntegrityIssues,
} from '../src/engines/result-engine.mjs';
import { normalizeWebhookEvent, reconcilePayment } from '../src/engines/reconciliation-engine.mjs';
import { computeMonthlyCharge, evaluateTenantAccess } from '../src/engines/subscription-engine.mjs';

test('result engine computes grade-based output using A-E scale', () => {
  const gradingRules = [
    { minScore: 41, maxScore: 50, grade: 'A', gradePoint: 1 },
    { minScore: 31, maxScore: 40, grade: 'B', gradePoint: 2 },
    { minScore: 21, maxScore: 30, grade: 'C', gradePoint: 3 },
    { minScore: 11, maxScore: 20, grade: 'D', gradePoint: 4 },
    { minScore: 0, maxScore: 10, grade: 'E', gradePoint: 5 },
  ];

  const result = computeStudentResult({
    marks: [
      { subjectId: 'math', caScore: 20, examScore: 24, approved: true },
      { subjectId: 'eng', caScore: 15, examScore: 18, approved: true },
      { subjectId: 'sci', caScore: 9, examScore: 12, approved: true },
    ],
    gradingRules,
    weights: { mode: 'SUM' },
    policy: { gpaEnabled: false, divisionEnabled: false, lowGradeThreshold: 2 },
  });

  assert.equal(result.subjects[0].grade, 'A');
  assert.equal(result.subjects[1].grade, 'B');
  assert.equal(result.subjects[2].grade, 'C');
  assert.equal(result.average, 32.67);
  assert.deepEqual(result.riskFlags, []);
});

test('ranking uses average then GPA tiebreak', () => {
  const ranked = rankStudents([
    { studentId: 's1', average: 40, gpa: 3.4, subjects: [{ total: 40 }] },
    { studentId: 's2', average: 40, gpa: 3.8, subjects: [{ total: 39 }] },
  ]);

  assert.equal(ranked[0].studentId, 's2');
  assert.equal(ranked[0].position, 1);
});

test('integrity detector flags approved changes and huge jumps', () => {
  const issues = detectIntegrityIssues(
    [{ studentId: 's1', subjectId: 'math', total: 20, approved: true }],
    [{ studentId: 's1', subjectId: 'math', total: 48 }],
  );

  assert.equal(issues.length, 2);
  assert.equal(issues[0].type, 'APPROVED_MARK_CHANGED');
  assert.equal(issues[1].type, 'SUDDEN_SCORE_JUMP');
});

test('reconciliation engine handles partial, exact, and overpayment', () => {
  const invoice = { status: 'ISSUED', balanceDue: 100000 };
  assert.equal(reconcilePayment({ invoice, paymentEvent: { amount: 50000 } }).action, 'PARTIAL');
  assert.equal(reconcilePayment({ invoice, paymentEvent: { amount: 100000 } }).action, 'SETTLED');
  assert.equal(reconcilePayment({ invoice, paymentEvent: { amount: 120000 } }).creditAmount, 20000);
});

test('webhook normalization supports provider variants', () => {
  const event = normalizeWebhookEvent('mpesa', {
    invoiceRef: 'INV-1',
    transAmount: '25000',
    transId: 'MP123',
  });

  assert.equal(event.reference, 'INV-1');
  assert.equal(event.amount, 25000);
});

test('subscription engine enforces caps and pricing models', () => {
  assert.equal(
    computeMonthlyCharge({ pricingModel: 'PER_STUDENT', activeStudents: 300, unitPrice: 1000 }),
    300000,
  );

  assert.equal(
    computeMonthlyCharge({
      pricingModel: 'TIERED',
      activeStudents: 750,
      tiers: [
        { min: 0, max: 300, price: 200000 },
        { min: 301, max: 800, price: 450000 },
      ],
    }),
    450000,
  );

  const access = evaluateTenantAccess({
    subscription: { status: 'ACTIVE', maxStudents: 500 },
    activeStudents: 620,
  });

  assert.equal(access.mode, 'READ_ONLY');
  assert.equal(access.reason, 'STUDENT_CAP_EXCEEDED');
});
