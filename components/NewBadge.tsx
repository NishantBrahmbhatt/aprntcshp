"use client";

import { isResourceNew } from "@/lib/is-resource-new";

export function NewBadge({ dateAdded }: { dateAdded?: string }) {
  if (!isResourceNew(dateAdded)) return null;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-3 right-3 z-[1] rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal tracking-[0.05em] text-[#888] md:right-14"
    >
      New
    </span>
  );
}
