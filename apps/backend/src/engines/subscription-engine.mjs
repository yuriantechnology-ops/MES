export function evaluateTenantAccess({ subscription, activeStudents, now = new Date() }) {
  const current = new Date(now);

  if (subscription.status === 'CANCELLED') {
    return { mode: 'READ_ONLY', reason: 'SUBSCRIPTION_CANCELLED' };
  }

  if (subscription.status === 'SUSPENDED') {
    return { mode: 'READ_ONLY', reason: 'SUBSCRIPTION_SUSPENDED' };
  }

  if (subscription.endsAt && current > new Date(subscription.endsAt) && subscription.status !== 'ACTIVE') {
    return { mode: 'READ_ONLY', reason: 'TRIAL_EXPIRED' };
  }

  if (activeStudents > subscription.maxStudents) {
    return {
      mode: 'READ_ONLY',
      reason: 'STUDENT_CAP_EXCEEDED',
      overage: activeStudents - subscription.maxStudents,
    };
  }

  if (subscription.status === 'PAST_DUE') {
    return { mode: 'LIMITED_WRITE', reason: 'PAST_DUE_GRACE_WINDOW' };
  }

  return { mode: 'FULL_ACCESS', reason: 'ACTIVE_SUBSCRIPTION' };
}

export function computeMonthlyCharge({ pricingModel, activeStudents, unitPrice, tiers = [] }) {
  if (pricingModel === 'PER_STUDENT') {
    return round2(activeStudents * unitPrice);
  }

  if (pricingModel === 'TIERED') {
    const tier = tiers.find((t) => activeStudents >= t.min && activeStudents <= t.max);
    if (!tier) throw new Error('No pricing tier configured for active student count');
    return round2(tier.price);
  }

  throw new Error(`Unsupported pricing model: ${pricingModel}`);
}

function round2(v) {
  return Math.round(v * 100) / 100;
}
