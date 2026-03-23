"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ORIGINAL = "Built for UK students";
const ALT = "...a Nishant original 😎";
const SCRAMBLE_POOL = "!@#$%^&*?><~0123456789";

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

export function FooterTagline() {
  const [text, setText] = useState(ORIGINAL);
  const runningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

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

  const handleActivate = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    try {
      await runResolve(graphemes(ALT));
      await new Promise<void>((r) => {
        const id = setTimeout(r, 2000);
        timeoutsRef.current.push(id);
      });
      await runResolve(graphemes(ORIGINAL));
    } finally {
      runningRef.current = false;
      clearTimers();
      setText(ORIGINAL);
    }
  }, [runResolve, clearTimers]);

  return (
    <span
      role="button"
      tabIndex={0}
      className="cursor-pointer select-none outline-none"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void handleActivate();
        }
      }}
    >
      {text}
    </span>
  );
}
