// Helpers for sending dates to the backend in the Asia/Damascus convention
// described in the API report (Input/Output use Damascus, storage is UTC).
//
// The Damascus offset is +03:00 year-round (Syria abolished DST in 2022).

const DAMASCUS_OFFSET_MINUTES = 180;

function pad2(n) {
  return String(n).padStart(2, '0');
}

// Returns "+03:00"
function damascusOffsetString() {
  const sign = DAMASCUS_OFFSET_MINUTES >= 0 ? '+' : '-';
  const abs = Math.abs(DAMASCUS_OFFSET_MINUTES);
  return `${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}

// "2026-05-25" -> Date wall-clock at noon Damascus, serialized with +03:00.
// We pick noon to avoid any DST/day-rollover ambiguity.
export function damascusDateFromYmd(ymd) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return null;
  const iso = `${y}-${pad2(m)}-${pad2(d)}T12:00:00${damascusOffsetString()}`;
  return iso;
}

// Today as YYYY-MM-DD in Damascus time.
export function todayYmdInDamascus() {
  const now = new Date();
  // Shift "now" by the local-to-Damascus delta, then read UTC date parts.
  const local = now.getTimezoneOffset(); // minutes WEST of UTC for current locale
  const damascusEpoch = now.getTime() + (local + DAMASCUS_OFFSET_MINUTES) * 60_000;
  const d = new Date(damascusEpoch);
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}
