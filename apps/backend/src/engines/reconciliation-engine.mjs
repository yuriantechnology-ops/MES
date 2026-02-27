export function reconcilePayment({ invoice, paymentEvent }) {
  if (!invoice) {
    return {
      action: 'UNALLOCATED',
      invoiceStatus: null,
      balanceDue: null,
      creditAmount: 0,
      reason: 'INVOICE_NOT_FOUND',
    };
  }

  const incomingAmount = Number(paymentEvent.amount);
  const outstanding = Number(invoice.balanceDue);

  if (incomingAmount <= 0) {
    return {
      action: 'REJECTED',
      invoiceStatus: invoice.status,
      balanceDue: outstanding,
      creditAmount: 0,
      reason: 'INVALID_AMOUNT',
    };
  }

  if (incomingAmount === outstanding) {
    return {
      action: 'SETTLED',
      invoiceStatus: 'PAID',
      balanceDue: 0,
      creditAmount: 0,
      reason: null,
    };
  }

  if (incomingAmount < outstanding) {
    return {
      action: 'PARTIAL',
      invoiceStatus: 'PARTIAL',
      balanceDue: round2(outstanding - incomingAmount),
      creditAmount: 0,
      reason: null,
    };
  }

  return {
    action: 'OVERPAID',
    invoiceStatus: 'PAID',
    balanceDue: 0,
    creditAmount: round2(incomingAmount - outstanding),
    reason: null,
  };
}

export function normalizeWebhookEvent(provider, payload) {
  const map = {
    nmb: { ref: 'reference', amount: 'amount', tx: 'transactionId' },
    nbc: { ref: 'reference', amount: 'amount', tx: 'transactionId' },
    crdb: { ref: 'reference', amount: 'amount', tx: 'transactionId' },
    mpesa: { ref: 'invoiceRef', amount: 'transAmount', tx: 'transId' },
    'airtel-money': { ref: 'invoiceRef', amount: 'amount', tx: 'airtelTxnId' },
    'tigo-pesa': { ref: 'billRef', amount: 'amount', tx: 'tigoTxnId' },
  };

  const providerMap = map[provider];
  if (!providerMap) throw new Error(`Unsupported provider: ${provider}`);

  return {
    provider,
    reference: payload[providerMap.ref],
    amount: Number(payload[providerMap.amount]),
    providerTransactionId: payload[providerMap.tx],
    raw: payload,
  };
}

function round2(v) {
  return Math.round(v * 100) / 100;
}
