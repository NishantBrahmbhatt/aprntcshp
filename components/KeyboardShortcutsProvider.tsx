"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";

export type SiteSearchRegistration = {
  inputRef: RefObject<HTMLInputElement | null>;
  clear: () => void;
};

const RegisterSiteSearchContext = createContext<
  ((reg: SiteSearchRegistration | null) => void) | null
>(null);

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const el = target.closest(
    "input, textarea, select, [contenteditable='true']",
  );
  return el !== null;
}

function hasShortcutModifiers(e: KeyboardEvent): boolean {
  return e.ctrlKey || e.metaKey || e.altKey;
}

export function KeyboardShortcutsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const siteSearchRef = useRef<SiteSearchRegistration | null>(null);
  const gArmedRef = useRef(false);
  const gTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerSiteSearch = useCallback((reg: SiteSearchRegistration | null) => {
    siteSearchRef.current = reg;
  }, []);

  useEffect(() => {
    const disarmG = () => {
      gArmedRef.current = false;
      if (gTimerRef.current !== null) {
        clearTimeout(gTimerRef.current);
        gTimerRef.current = null;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const siteSearch = siteSearchRef.current;
      const active = document.activeElement;

      if (e.key === "Escape" && siteSearch) {
        const input = siteSearch.inputRef.current;
        if (input !== null && input === active) {
          if (input.value) {
            siteSearch.clear();
          }
          input.blur();
          e.preventDefault();
          return;
        }
      }

      if (isEditableTarget(e.target)) {
        return;
      }

      if (hasShortcutModifiers(e)) {
        return;
      }

      if (e.key === "Escape") {
        disarmG();
        return;
      }

      if (e.key === "/" && siteSearch) {
        e.preventDefault();
        siteSearch.inputRef.current?.focus();
        return;
      }

      const gRoutes: Record<string, string> = {
        o: "/organisations",
        c: "/communities",
        f: "/find-apprenticeships",
        r: "/cv-resources",
      };

      if (gArmedRef.current) {
        const route = gRoutes[e.key.toLowerCase()];
        if (route) {
          e.preventDefault();
          disarmG();
          router.push(route);
          return;
        }
        disarmG();
      }

      if (e.key === "g" || e.key === "G") {
        disarmG();
        gArmedRef.current = true;
        gTimerRef.current = setTimeout(() => {
          disarmG();
        }, 1000);
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      disarmG();
    };
  }, [router]);

  return (
    <RegisterSiteSearchContext.Provider value={registerSiteSearch}>
      {children}
    </RegisterSiteSearchContext.Provider>
  );
}

export function useRegisterSiteSearch(
  inputRef: RefObject<HTMLInputElement | null>,
  clear: () => void,
) {
  const register = useContext(RegisterSiteSearchContext);

  useEffect(() => {
    if (!register) return;
    register({ inputRef, clear });
    return () => {
      register(null);
    };
  }, [register, inputRef, clear]);
}
