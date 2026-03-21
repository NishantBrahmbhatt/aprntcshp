"use client";

import { useEffect, useRef } from "react";

const SIZE = 600;
const HALF = SIZE / 2;
const LERP = 0.11;

function prefersMouseEnvironment() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches
  );
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: HALF, y: HALF });
  const currentRef = useRef({ x: HALF, y: HALF });
  const rafRef = useRef(0);
  const touchLockRef = useRef(false);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const setShown = (shown: boolean) => {
      el.style.opacity = shown ? "1" : "0";
    };

    const onTouchStart = () => {
      touchLockRef.current = true;
      setShown(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (touchLockRef.current || !prefersMouseEnvironment()) return;
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      setShown(true);
    };

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * LERP;
      cur.y += (tgt.y - cur.y) * LERP;
      el.style.transform = `translate(${cur.x - HALF}px, ${cur.y - HALF}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    const mqHover = window.matchMedia("(hover: hover)");
    const mqPointer = window.matchMedia("(pointer: fine)");
    const onMediaChange = () => {
      if (!prefersMouseEnvironment()) {
        setShown(false);
      }
    };
    mqHover.addEventListener("change", onMediaChange);
    mqPointer.addEventListener("change", onMediaChange);

    if (!prefersMouseEnvironment()) {
      setShown(false);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      mqHover.removeEventListener("change", onMediaChange);
      mqPointer.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[12] opacity-0"
      style={{
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle closest-side at center, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.028) 35%, rgba(255,255,255,0.012) 55%, transparent 72%)",
        willChange: "transform",
      }}
    />
  );
}
