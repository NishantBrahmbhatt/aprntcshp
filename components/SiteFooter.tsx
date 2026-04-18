"use client";

import Link from "next/link";
import { FaLinkedin, FaReddit } from "react-icons/fa";
import { FooterTagline } from "@/components/FooterTagline";

const FALLBACK_LAST_UPDATED = "1 January 2025";

function FooterSocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href="https://www.reddit.com/user/AprntcshpOfficial/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Aprntcshp on Reddit"
        className="text-[#555] transition-[color] duration-200 ease hover:text-[#888]"
      >
        <FaReddit className="h-4 w-4" aria-hidden />
      </a>
      <a
        href="https://www.linkedin.com/company/aprntcshp/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Aprntcshp on LinkedIn"
        className="text-[#555] transition-[color] duration-200 ease hover:text-[#888]"
      >
        <FaLinkedin className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

export function SiteFooter() {
  const buildTime =
    process.env.NEXT_PUBLIC_LAST_UPDATED || FALLBACK_LAST_UPDATED;

  return (
    <footer className="mt-10 flex flex-col items-center gap-3 px-4 py-6 text-[11px] sm:text-xs text-neutral-500">
      <div className="hidden sm:flex items-center justify-center gap-6 mb-6 flex-wrap">
        <Link
          href="/organisations"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Organisations
        </Link>
        <Link
          href="/communities"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Communities
        </Link>
        <Link
          href="/find-apprenticeships"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Find Apprenticeships
        </Link>
        <Link
          href="/companies"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Companies
        </Link>
        <Link
          href="/resources"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Resources
        </Link>
        <Link
          href="/industries"
          className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200 no-underline"
        >
          Industries
        </Link>
      </div>
      <div className="flex w-full flex-col items-center gap-3 md:grid md:grid-cols-3 md:items-center md:justify-items-stretch md:gap-4 md:px-0 md:py-0">
        <div className="order-1 flex w-full justify-center justify-self-center md:order-none md:w-full md:justify-self-stretch md:justify-start">
          <a
            href="https://aprntcshp.featurebase.app"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer border-0 bg-transparent p-0 font-inherit whitespace-nowrap tracking-[0.22em] uppercase text-neutral-400 hover:text-white transition-[color] duration-200 ease"
          >
            Feedback & suggestions
          </a>
        </div>
        <div className="order-2 text-center text-neutral-500 md:order-none">
          Last updated {buildTime} →{" "}
          <a
            href="https://aprntcshp.featurebase.app/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 no-underline transition-[color] duration-200 ease hover:text-white"
          >
            see what changed
          </a>
          <FooterSocialLinks className="mt-2 hidden justify-center gap-2 md:flex" />
        </div>
        <div className="order-3 flex w-full justify-center md:order-none md:justify-end">
          <FooterTagline />
        </div>
        <FooterSocialLinks className="order-4 flex justify-center gap-2 md:hidden" />
      </div>
    </footer>
  );
}
