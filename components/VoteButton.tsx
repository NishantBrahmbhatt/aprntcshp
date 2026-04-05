"use client";

import { useCallback, useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LS_KEY = "aprntcshp_votes";

/** Maps resource_id → Supabase vote row id (for delete). Keys are the voted resource IDs. */
function readVoteMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return {};
  } catch {
    return {};
  }
}

function writeVoteMap(map: Record<string, string>) {
  localStorage.setItem(LS_KEY, JSON.stringify(map));
}

export function VoteButton({ resourceId }: { resourceId: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [voteRowId, setVoteRowId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const fetchCount = useCallback(async () => {
    const { count: c, error } = await supabase
      .from("votes")
      .select("*", { count: "exact", head: true })
      .eq("resource_id", resourceId);

    if (error) {
      setCount(0);
      return;
    }
    setCount(c ?? 0);
  }, [resourceId]);

  useEffect(() => {
    const map = readVoteMap();
    const rowId = map[resourceId];
    if (rowId) {
      setVoted(true);
      setVoteRowId(rowId);
    }
    void fetchCount();
  }, [resourceId, fetchCount]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (voted && voteRowId) {
        const { error } = await supabase.from("votes").delete().eq("id", voteRowId);
        if (error) {
          const map = readVoteMap();
          delete map[resourceId];
          writeVoteMap(map);
          setVoted(false);
          setVoteRowId(null);
          await fetchCount();
          return;
        }
        const map = readVoteMap();
        delete map[resourceId];
        writeVoteMap(map);
        setVoted(false);
        setVoteRowId(null);
        setCount((n) => (n != null ? Math.max(0, n - 1) : 0));
      } else {
        const { data, error } = await supabase
          .from("votes")
          .insert({ resource_id: resourceId })
          .select("id")
          .single();

        if (error) {
          await fetchCount();
          return;
        }

        const id = data?.id as string | undefined;
        if (!id) {
          await fetchCount();
          return;
        }

        const map = readVoteMap();
        map[resourceId] = id;
        writeVoteMap(map);
        setVoted(true);
        setVoteRowId(id);
        setCount((n) => (n != null ? n + 1 : 1));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy}
      className={`inline-flex items-center gap-1 border-0 bg-transparent p-0 font-inherit outline-none transition-[color] duration-200 ease disabled:opacity-50 ${
        voted
          ? "text-white hover:text-white"
          : "text-[#555] hover:text-[#888]"
      }`}
      style={{ fontSize: 12 }}
      aria-pressed={voted}
      aria-label={voted ? "Remove vote" : "Add vote"}
    >
      <ThumbsUp className="h-[14px] w-[14px] shrink-0" strokeWidth={2} aria-hidden />
      <span className="tabular-nums leading-none">{count ?? "—"}</span>
    </button>
  );
}
