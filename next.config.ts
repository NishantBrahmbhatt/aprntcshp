import { execSync } from "node:child_process";
import type { NextConfig } from "next";

const FALLBACK_LAST_UPDATED = "1 January 2025";

function formatGitShortDate(isoShort: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoShort)) return null;
  const [yStr, mStr, dStr] = isoShort.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return `${d} ${months[m - 1]} ${y}`;
}

function getLastCommitDateFormatted(): string {
  try {
    const out = execSync("git log -1 --format=%cd --date=short", {
      encoding: "utf-8",
    }).trim();
    return formatGitShortDate(out) ?? FALLBACK_LAST_UPDATED;
  } catch {
    return FALLBACK_LAST_UPDATED;
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_UPDATED: getLastCommitDateFormatted(),
  },
};

export default nextConfig;
