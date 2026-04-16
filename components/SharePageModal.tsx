"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type SharePageModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SharePageModal({ open, onClose }: SharePageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function",
    );
  }, []);

  useEffect(() => {
    if (!open) {
      setQrSrc(null);
      setCopied(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const QRCode = (await import("qrcode")).default;
      const href =
        typeof window !== "undefined" ? window.location.href : "";
      const dataUrl = await QRCode.toDataURL(href, {
        width: 200,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });
      if (!cancelled) setQrSrc(dataUrl);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }, []);

  const nativeShare = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } catch {
      /* user dismissed or error */
    }
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="relative w-full max-w-sm rounded-[12px] border border-[#2a2a2a] bg-[#111] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-neutral-500 transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="size-5" strokeWidth={2} aria-hidden />
        </button>
        <h2 id="share-modal-title" className="sr-only">
          Share this page
        </h2>
        <div className="flex flex-col items-center gap-4 pt-2">
          {qrSrc ? (
            <img
              src={qrSrc}
              alt=""
              width={200}
              height={200}
              className="bg-white"
            />
          ) : (
            <div
              className="size-[200px] shrink-0 bg-white"
              aria-hidden
            />
          )}
          <button
            type="button"
            onClick={copyLink}
            className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-[#444] hover:text-white"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          {canNativeShare ? (
            <button
              type="button"
              onClick={nativeShare}
              className="md:hidden w-full rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-[#444] hover:text-white"
            >
              Share
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
