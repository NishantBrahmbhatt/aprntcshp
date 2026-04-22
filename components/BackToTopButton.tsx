"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD_PX = 400;

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`group fixed right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111] [transition:opacity_0.3s_ease,border-color_0.2s_ease] max-md:bottom-[80px] md:bottom-20 ${
        visible
          ? "pointer-events-auto opacity-100 hover:border-[#444]"
          : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp
        className="h-4 w-4 text-[#666] transition-colors duration-200 ease group-hover:text-white"
        aria-hidden
      />
    </button>
  );
}
