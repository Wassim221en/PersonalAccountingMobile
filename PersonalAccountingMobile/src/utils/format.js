// Number + date formatters tuned for Arabic (ar-SY) display.

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const dateFormatter = new Intl.DateTimeFormat('ar-SY', { day: 'numeric', month: 'long' });
const timeFormatter = new Intl.DateTimeFormat('ar-SY', { hour: 'numeric', minute: '2-digit' });

export function formatAmount(value) {
  const n = Number(value ?? 0);
  return numberFormatter.format(Math.abs(n));
}

export function formatSignedAmount(value, type) {
  const sign = type === 'Income' ? '+' : '-';
  return `${sign}${formatAmount(value)}`;
}

const CURRENCY_LABELS = { SYP: 'ل.س', USD: '$', EUR: '€' };

export function currencyLabel(code) {
  return CURRENCY_LABELS[code] ?? code ?? '';
}

// Returns a short Arabic relative label: "اليوم، 10:45 ص" / "أمس، 08:20 م" / "12 أكتوبر، 04:15 م"
export function formatTransactionDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';

  const now = new Date();
  const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayDiff = Math.round((startOfDay(now) - startOfDay(d)) / 86400000);
  const time = timeFormatter.format(d);

  if (dayDiff === 0) return `اليوم، ${time}`;
  if (dayDiff === 1) return `أمس، ${time}`;
  return `${dateFormatter.format(d)}، ${time}`;
}
