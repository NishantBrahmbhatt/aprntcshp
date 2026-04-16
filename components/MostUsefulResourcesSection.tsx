"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { voteResourceLookup } from "@/lib/vote-resource-lookup";

const CARD_CLASS =
  "group relative overflow-hidden flex flex-row items-start justify-between gap-4 rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none";

type ResolvedItem = {
  resourceId: string;
  name: string;
  href: string;
  categoryLabel: string;
  voteCount: number;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function SkeletonCards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-[88px] rounded-xl border border-[#2a2a2a] bg-[#141414] animate-pulse"
        />
      ))}
    </div>
  );
}

export function MostUsefulResourcesSection() {
  const [status, setStatus] = useState<"loading" | "empty" | "ready">(
    "loading",
  );
  const [items, setItems] = useState<ResolvedItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase.from("votes").select("resource_id");

      if (cancelled) return;

      if (error || !data?.length) {
        setStatus("empty");
        return;
      }

      const counts = new Map<string, number>();
      for (const row of data) {
        const id = row.resource_id;
        if (typeof id !== "string" || !id.trim()) continue;
        counts.set(id, (counts.get(id) ?? 0) + 1);
      }

      const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
      const resolved: ResolvedItem[] = [];

      for (const [resourceId, voteCount] of sorted) {
        const meta = voteResourceLookup.get(resourceId);
        if (!meta) continue;
        resolved.push({
          resourceId,
          voteCount,
          name: meta.name,
          href: meta.href,
          categoryLabel: meta.categoryLabel,
        });
        if (resolved.length >= 5) break;
      }

      if (resolved.length === 0) {
        setStatus("empty");
        return;
      }

      setItems(resolved);
      setStatus("ready");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "empty") return null;

  if (status === "loading") {
    return (
      <div className="mt-10" aria-busy="true" aria-label="Loading most useful resources">
        <SkeletonCards />
      </div>
    );
  }

  return (
    <section className="mt-10" aria-labelledby="most-useful-heading">
      <h2
        id="most-useful-heading"
        className="text-sm font-medium tracking-wide text-neutral-500 uppercase"
      >
        Most useful
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => {
          const external = isExternalHref(item.href);
          const inner = (
            <>
              <div className="relative z-[1] min-w-0 flex-1 space-y-1.5">
                <p className="text-base font-semibold text-neutral-100 leading-snug">
                  {item.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal tracking-[0.05em] text-[#666]">
                    {item.categoryLabel}
                  </span>
                  <span className="tabular-nums text-neutral-400">
                    {item.voteCount}{" "}
                    {item.voteCount === 1 ? "vote" : "votes"}
                  </span>
                </div>
              </div>
              <ExternalLink
                className="relative z-[1] h-5 w-5 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-200"
                strokeWidth={2}
                aria-hidden
              />
            </>
          );

          return external ? (
            <a
              key={item.resourceId}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CARD_CLASS} no-underline text-inherit`}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={item.resourceId}
              href={item.href}
              className={`${CARD_CLASS} no-underline text-inherit`}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
