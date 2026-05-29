"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { EmptyStateAstronaut } from "@/components/EmptyState";

type SuggestResourceModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SuggestResourceModal({ open, onClose }: SuggestResourceModalProps) {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setUrl("");
      setDescription("");
      setCategory("");
      setError(null);
      setSuccess(false);
      setSubmitting(false);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url.trim() || !category) {
      setError("Please fill in the URL and category.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          description: description.trim(),
          category,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return mounted && open
    ? createPortal(
        <div
          className="p-4"
          role="presentation"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="max-w-md w-full bg-[linear-gradient(160deg,#202020_0%,#111_100%)] border border-[#2a2a2a] rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)]"
            style={{ position: "relative", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div className="flex flex-col items-center text-center">
                <EmptyStateAstronaut />
                <p className="text-sm text-neutral-400">Thanks! We&apos;ll review your suggestion.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full rounded-xl border border-[#2a2a2a] bg-transparent py-3 text-sm font-medium text-neutral-200 transition-all duration-200 hover:bg-white/5"
                  style={{ cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-neutral-100">Suggest a resource</h2>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="text-neutral-500 transition-colors duration-200 hover:text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <X size={20} aria-hidden />
                  </button>
                </div>
                <p className="mb-4 text-sm text-neutral-500">
                  Found something useful? Submit it and we&apos;ll review it for the library.
                </p>
                <div className="space-y-4">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#2a2a2a] bg-[#111] px-4 py-3 text-sm text-neutral-100 placeholder:text-[#444] focus:border-[#555] focus:outline-none"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is it and why is it useful?"
                    rows={3}
                    className="w-full resize-y rounded-xl border border-[#2a2a2a] bg-[#111] px-4 py-3 text-sm text-neutral-100 placeholder:text-[#444] focus:border-[#555] focus:outline-none"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#2a2a2a] bg-[#111] px-4 py-3 text-sm text-neutral-100 focus:border-[#555] focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="Organisation">Organisation</option>
                    <option value="Community">Community</option>
                    <option value="Company">Company</option>
                    <option value="Resource">Resource</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-neutral-200 disabled:opacity-50"
                  style={{ cursor: submitting ? "wait" : "pointer" }}
                >
                  Submit
                </button>
                {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
              </form>
            )}
          </div>
        </div>,
        document.body,
      )
    : null;
}
