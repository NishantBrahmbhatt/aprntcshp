"use client";

import { FooterTagline } from "@/components/FooterTagline";

const SUGGEST_HREF = "https://chat.whatsapp.com/LAbUrTAZ72VKGBpup63Gks";

const FALLBACK_LAST_UPDATED = "1 January 2025";

export function SiteFooter() {
  const buildTime =
    process.env.NEXT_PUBLIC_LAST_UPDATED || FALLBACK_LAST_UPDATED;

  return (
    <footer className="mt-10 grid grid-cols-3 items-center gap-4 text-[11px] sm:text-xs text-neutral-500">
      <a
        href={SUGGEST_HREF}
        target="_blank"
        rel="noreferrer"
        className="tracking-[0.22em] uppercase text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        Suggest a Resource
      </a>
      <a
        href="https://aprntcshp.featurebase.app/changelog"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-neutral-500 no-underline transition-[color] duration-200 ease hover:text-white"
      >
        Library last updated {buildTime}
      </a>
      <div className="flex justify-end">
        <FooterTagline />
      </div>
    </footer>
  );
}
