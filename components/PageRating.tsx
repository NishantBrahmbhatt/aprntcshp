"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PageRatingProps = {
  pageName: string;
};

export function PageRating({ pageName }: PageRatingProps) {
  const storageKey = `aprntcshp_rated_${pageName}`;
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey)) {
        setHasRated(true);
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, [storageKey]);

  async function submitRating(helpful: boolean) {
    if (hasRated) return;

    try {
      await supabase.from("page_ratings").insert({
        page: pageName,
        helpful,
      });
    } catch {
      // Do not block UI confirmation on request issues
    }

    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // Ignore localStorage access errors
    }

    setHasRated(true);
  }

  return (
    <section className="mt-10" aria-label="Page rating">
      {hasRated ? (
        <p className="text-[13px] text-[#888]">Thanks for the feedback 🙏</p>
      ) : (
        <>
          <p className="text-[13px] text-[#888]">Was this page helpful?</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => void submitRating(true)}
              className="rounded-[999px] border border-[#2a2a2a] bg-[#111] px-4 py-1.5 text-xs text-[#888] transition-colors duration-200 ease hover:border-[#383838] hover:text-white"
            >
              👍 Yes
            </button>
            <button
              type="button"
              onClick={() => void submitRating(false)}
              className="rounded-[999px] border border-[#2a2a2a] bg-[#111] px-4 py-1.5 text-xs text-[#888] transition-colors duration-200 ease hover:border-[#383838] hover:text-white"
            >
              👎 No
            </button>
          </div>
        </>
      )}
    </section>
  );
}
