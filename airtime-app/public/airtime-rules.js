// Flash wallet demo — Buy airtime rules (exercise app for the Module 3 · Topic 1 activity)
// Money is handled in cents to avoid floating-point errors.
const STARTING_BALANCE_CENTS = 20000; // R200.00
const MIN_RANDS = 5;
const MAX_RANDS = 500;

function formatZar(cents) {
  return 'R' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function evaluatePurchase(balanceCents, network, cellphone, amountText) {
  const fail = (message) => ({ outcome: 'error', message, balanceCents });
  if (!network) return fail('Select a network');
  if (!/^0[6-8]\d{8}$/.test(cellphone)) return fail('Enter a valid 10-digit cellphone number');
  if (!/^\d+(\.\d{1,2})?$/.test(amountText)) return fail('Enter an airtime amount in rands');
  const amountCents = Math.round(Number(amountText) * 100);
  if (amountCents % 100 !== 0) return fail('Airtime is sold in whole rands');
  const rands = amountCents / 100;
  if (rands < MIN_RANDS || rands > MAX_RANDS) return fail(`Airtime amount must be between R${MIN_RANDS} and R${MAX_RANDS}`);
  if (amountCents > balanceCents) return fail('Not enough funds in your Flash wallet');
  return {
    outcome: 'success',
    message: `Airtime purchased: R${rands} ${network} airtime for ${cellphone}`,
    balanceCents: balanceCents - amountCents,
  };
}

if (typeof module !== 'undefined') {
  module.exports = { STARTING_BALANCE_CENTS, formatZar, evaluatePurchase };
}
