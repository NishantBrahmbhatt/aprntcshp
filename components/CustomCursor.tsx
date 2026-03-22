"use client";

import { useEffect, useRef, useState } from "react";

function prefersMouseEnvironment() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches
  );
}

function isClickableUnderPoint(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y);
  if (!el) return false;
  return !!el.closest('a, button, [role="button"]');
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const hasMovedRef = useRef(false);
  const rafRef = useRef(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(prefersMouseEnvironment());
  }, []);

  useEffect(() => {
    if (!show) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const LERP = 0.15;

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      const clickable = isClickableUnderPoint(e.clientX, e.clientY);
      hoverRef.current = clickable;

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        ringPosRef.current.x = e.clientX;
        ringPosRef.current.y = e.clientY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const dotSize = clickable ? 10 : 6;
      const dh = dotSize / 2;
      dot.style.transform = `translate(${e.clientX - dh}px, ${e.clientY - dh}px)`;
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;

      const ringSize = clickable ? 36 : 24;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.borderColor = clickable
        ? "rgba(255,255,255,0.7)"
        : "rgba(255,255,255,0.4)";
    };

    const tick = () => {
      const mouse = mouseRef.current;
      const ringPos = ringPosRef.current;
      ringPos.x += (mouse.x - ringPos.x) * LERP;
      ringPos.y += (mouse.y - ringPos.y) * LERP;

      const clickable = hoverRef.current;
      const ringSize = clickable ? 36 : 24;
      const rh = ringSize / 2;
      ring.style.transform = `translate(${ringPos.x - rh}px, ${ringPos.y - rh}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[50] opacity-0"
        style={{
          boxSizing: "border-box",
          width: 24,
          height: 24,
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "50%",
          background: "transparent",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[51] opacity-0"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#fff",
          willChange: "transform",
        }}
      />
    </>
  );
}
