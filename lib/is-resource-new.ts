const NEW_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

export function isResourceNew(dateAdded: string | undefined): boolean {
  if (!dateAdded) return false;
  const parts = dateAdded.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  if (y == null || m == null || d == null || Number.isNaN(y + m + d))
    return false;
  const start = Date.UTC(y, m - 1, d);
  const now = Date.now();
  return now >= start && now <= start + NEW_WINDOW_MS;
}
