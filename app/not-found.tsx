"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Orbitron } from "next/font/google";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { SiteFooter } from "@/components/SiteFooter";
import styles from "./not-found.module.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "Companies", href: "/companies" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Communities", href: "/communities" },
];

const TEXT_404 = "404";
const TEXT_LOST = "...you're lost";
const GLITCH_CHARS = "01░▒▓█?▓░▒";

function randomGlitchString(length: number): string {
  return Array.from({ length }, () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
  ).join("");
}

function Glitch404Title() {
  const [displayText, setDisplayText] = useState(TEXT_404);
  const [glitching, setGlitching] = useState(false);
  const runningRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const runSequence = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearTimers();

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplayText(TEXT_LOST);
      schedule(() => {
        setDisplayText(TEXT_404);
        runningRef.current = false;
      }, 2200);
      return;
    }

    setGlitching(true);
    intervalRef.current = setInterval(() => {
      setDisplayText(randomGlitchString(TEXT_404.length));
    }, 45);

    schedule(() => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(TEXT_LOST);
      setGlitching(false);
    }, 520);

    schedule(() => {
      setGlitching(true);
      intervalRef.current = setInterval(() => {
        setDisplayText(randomGlitchString(TEXT_LOST.length));
      }, 45);
    }, 2300);

    schedule(() => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(TEXT_404);
      setGlitching(false);
      runningRef.current = false;
    }, 2850);
  }, [clearTimers]);

  return (
    <button
      type="button"
      onClick={runSequence}
      className="border-0 bg-transparent p-0 text-center outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
      aria-label="404 — page not found. Click for a hidden message."
    >
      <span
        className={`inline-block max-w-[min(100%,22rem)] bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text pb-1 text-6xl font-semibold tracking-tight text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] sm:text-7xl md:max-w-none md:text-8xl md:whitespace-nowrap ${glitching ? styles.glitching : ""}`}
      >
        {displayText}
      </span>
    </button>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <NavbarLogo orbitronClassName={orbitron.className} />
      <NavbarNavLinks items={navItems} />
    </header>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:py-20 md:py-28">
            <div className="flex min-h-[5rem] flex-col items-center justify-center sm:min-h-[6rem] md:min-h-[7rem]">
              <Glitch404Title />
            </div>
            <p className="mt-6 text-lg font-medium text-neutral-50 sm:text-xl">
              This page doesn&apos;t exist
            </p>
            <p className="mt-3 max-w-md text-sm text-neutral-500 sm:text-base">
              It might have moved or never existed in the first place.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-[#2a2a2a] bg-[#111] px-5 py-2 text-[13px] text-[#888] transition-colors duration-200 ease hover:text-white"
              >
                Go home
              </Link>
              <Link
                href="/resources"
                className="rounded-full border border-[#2a2a2a] bg-[#111] px-5 py-2 text-[13px] text-[#888] transition-colors duration-200 ease hover:text-white"
              >
                Browse resources
              </Link>
            </div>
          </div>
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
