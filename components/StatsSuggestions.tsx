"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export type SuggestionItem = {
  id?: string | number | null;
  url?: string | null;
  description?: string | null;
  category?: string | null;
  submitted_at?: string | null;
};

type StatsSuggestionsProps = {
  suggestions: SuggestionItem[];
};

function suggestionKey(s: SuggestionItem) {
  return String(s.id ?? `${s.url}-${s.submitted_at}`);
}

function formatSubmittedAt(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function StatsSuggestions({ suggestions }: StatsSuggestionsProps) {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<SuggestionItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selected) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <>
      <div className="space-y-4">
        {suggestions.map((s) => {
          const url = String(s.url ?? "");
          const description = String(s.description ?? "");
          const hasDescription = description.length > 0;

          return (
            <button
              key={suggestionKey(s)}
              type="button"
              onClick={() => setSelected(s)}
              className="w-full rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5 text-left transition-all duration-200 hover:border-[#444] hover:bg-[linear-gradient(160deg,#242424_0%,#141414_100%)]"
              style={{ cursor: "pointer" }}
            >
              <p className="text-sm font-medium text-white line-clamp-2 break-all">{url}</p>
              {hasDescription ? (
                <p className="text-sm text-neutral-400 mt-2 line-clamp-3">{description}</p>
              ) : null}
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-neutral-500">
                {s.category ? (
                  <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5">
                    {String(s.category)}
                  </span>
                ) : null}
                {s.submitted_at ? (
                  <span>Submitted {formatSubmittedAt(String(s.submitted_at))}</span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {mounted && selected
        ? createPortal(
            <div
              className="p-4"
              role="presentation"
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="suggestion-detail-title"
                className="max-w-lg w-full bg-[linear-gradient(160deg,#202020_0%,#111_100%)] border border-[#2a2a2a] rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)]"
                style={{ position: "relative", maxHeight: "90vh", overflowY: "auto" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 id="suggestion-detail-title" className="text-lg font-semibold text-neutral-100">
                    Suggestion
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                    className="shrink-0 text-neutral-500 transition-colors duration-200 hover:text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <X size={20} aria-hidden />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">URL</p>
                    <a
                      href={String(selected.url ?? "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white break-all underline decoration-[#444] underline-offset-2 transition-colors hover:text-neutral-200"
                    >
                      {String(selected.url ?? "")}
                    </a>
                  </div>

                  {selected.description ? (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Message</p>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap break-words">
                        {String(selected.description)}
                      </p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                    {selected.category ? (
                      <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5">
                        {String(selected.category)}
                      </span>
                    ) : null}
                    {selected.submitted_at ? (
                      <span>Submitted {formatSubmittedAt(String(selected.submitted_at))}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
