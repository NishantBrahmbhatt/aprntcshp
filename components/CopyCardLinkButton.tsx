"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

function toAbsoluteUrl(href: string): string {
  if (typeof window === "undefined") return href;
  try {
    return new URL(href, window.location.origin).href;
  } catch {
    return href;
  }
}

export function CopyCardLinkButton({ href }: { href: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      void navigator.clipboard.writeText(toAbsoluteUrl(href));
      setCopied(true);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 1500);
    },
    [href],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? "Link copied" : "Copy link"}
      className="hidden cursor-pointer border-0 bg-transparent p-0 text-left text-[#555] transition-colors duration-200 ease hover:text-[#888] md:block"
    >
      <span className="inline-flex items-center gap-1">
        {copied ? (
          <>
            <Check className="h-[14px] w-[14px] shrink-0" aria-hidden />
            <span className="text-[11px]">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-[14px] w-[14px] shrink-0" aria-hidden />
            <span className="text-[11px]">Copy link</span>
          </>
        )}
      </span>
    </button>
  );
}
