"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const LOGO_DEFAULT = "APRNTCSHP";
const EASTER_TARGET = "APPRENTICESHIP";
const SCRAMBLE_POOL = "!@#$%^&*?><~0123456789";
const LONG_PRESS_MS = 500;

function randomChar() {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)]!;
}

function graphemes(s: string): string[] {
  try {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      return Array.from(segmenter.segment(s), (x) => x.segment);
    }
  } catch {
    /* fall through */
  }
  return Array.from(s);
}

type NavbarLogoProps = {
  orbitronClassName: string;
};

export function NavbarLogo({ orbitronClassName }: NavbarLogoProps) {
  const [text, setText] = useState(LOGO_DEFAULT);
  const runningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blockNextClickRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current != null) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  useEffect(
    () => () => {
      clearLongPressTimer();
      clearTimers();
    },
    [clearLongPressTimer, clearTimers],
  );

  const runResolve = useCallback(
    (target: string[]) => {
      clearTimers();
      return new Promise<void>((resolve) => {
        const n = target.length;
        if (n === 0) {
          resolve();
          return;
        }

        const lockStepMs = Math.round(1500 / n);
        let lockedCount = 0;

        const paint = () => {
          let out = "";
          for (let j = 0; j < n; j++) {
            out += j < lockedCount ? target[j]! : randomChar();
          }
          setText(out);
        };

        paint();
        intervalRef.current = setInterval(paint, 50);

        for (let i = 0; i < n; i++) {
          const tid = setTimeout(() => {
            lockedCount = i + 1;
            if (lockedCount >= n) {
              if (intervalRef.current != null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setText(target.join(""));
              resolve();
            } else {
              paint();
            }
          }, lockStepMs * (i + 1));
          timeoutsRef.current.push(tid);
        }
      });
    },
    [clearTimers],
  );

  const runEasterSequence = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    try {
      await runResolve(graphemes(EASTER_TARGET));
      await new Promise<void>((r) => {
        const id = setTimeout(r, 2000);
        timeoutsRef.current.push(id);
      });
      await runResolve(graphemes(LOGO_DEFAULT));
    } finally {
      runningRef.current = false;
      clearTimers();
      setText(LOGO_DEFAULT);
    }
  }, [runResolve, clearTimers]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (runningRef.current) {
        e.preventDefault();
        return;
      }
      if (e.pointerType === "mouse" && e.button !== 0) return;

      clearLongPressTimer();
      longPressTimerRef.current = setTimeout(() => {
        longPressTimerRef.current = null;
        blockNextClickRef.current = true;
        void runEasterSequence();
      }, LONG_PRESS_MS);
    },
    [clearLongPressTimer, runEasterSequence],
  );

  const onPointerEnd = useCallback(() => {
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (runningRef.current) {
      e.preventDefault();
      return;
    }
    if (blockNextClickRef.current) {
      e.preventDefault();
      blockNextClickRef.current = false;
    }
  }, []);

  return (
    <Link
      href="/"
      className={`${orbitronClassName} font-semibold tracking-[0.26em] text-neutral-100`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
