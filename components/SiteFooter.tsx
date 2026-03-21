"use client";

import { FooterTagline } from "@/components/FooterTagline";

const SUGGEST_HREF = "https://chat.whatsapp.com/LAbUrTAZ72VKGBpup63Gks";

export function SiteFooter() {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";

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
      <span className="text-center">
        Library last updated {buildTime}
      </span>
      <div className="flex justify-end">
        <FooterTagline />
      </div>
    </footer>
  );
}
