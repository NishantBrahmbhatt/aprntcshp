const RECENTLY_VISITED_KEY = "aprntcshp_recently_visited";

type StoredEntry = {
  href: string;
  label: string;
  visitedAt: number;
};

export function trackPageVisit(href: string, label: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENTLY_VISITED_KEY);
    let current: StoredEntry[] = [];
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        current = parsed.filter(
          (e): e is StoredEntry =>
            Boolean(e) &&
            typeof e === "object" &&
            "href" in e &&
            "label" in e &&
            typeof (e as StoredEntry).href === "string" &&
            typeof (e as StoredEntry).label === "string",
        );
      }
    }
    const withoutHref = current.filter((e) => e.href !== href);
    const next: StoredEntry[] = [
      { href, label, visitedAt: Date.now() },
      ...withoutHref,
    ].slice(0, 3);
    localStorage.setItem(RECENTLY_VISITED_KEY, JSON.stringify(next));
  } catch {
    // ignore storage / JSON errors
  }
}
