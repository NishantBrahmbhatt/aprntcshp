"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  FileText,
  Lightbulb,
  Menu,
  Search,
  Share2,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { Orbitron } from "next/font/google";
import { NavbarLogo } from "@/components/NavbarLogo";
import { SharePageModal } from "@/components/SharePageModal";
import { SuggestResourceModal } from "@/components/SuggestResourceModal";
import { SearchEmptyState } from "@/components/EmptyState";
import { platforms } from "@/app/find-apprenticeships/page";
import {
  apprenticeshipGuides,
  assessmentCentre,
  coverLetters,
  cvAdvice,
  getInspired,
  interviewPrep,
  linkedinPersonalBrand,
  psychometricTests,
  templates,
  workExperience,
} from "@/lib/data/cv-resources";
import { communities } from "@/lib/data/communities";
import { companies } from "@/lib/data/companies";
import { organisations } from "@/lib/data/organisations";
import { trackPageVisit } from "@/lib/recentlyVisited";
import { useRegisterShareShortcut } from "@/components/KeyboardShortcutsProvider";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const sectionTiles = [
  { label: "Organisations", Icon: Building2, href: "/organisations" },
  { label: "Find Apprenticeships", Icon: Search, href: "/find-apprenticeships" },
  { label: "Companies", Icon: Briefcase, href: "/companies" },
  { label: "Industries", Icon: Briefcase, href: "/industries" },
  { label: "Resources", Icon: FileText, href: "/resources" },
  { label: "Communities", Icon: Users, href: "/communities" },
];

type GlobalSearchHit = {
  id: string;
  name: string;
  category: string;
  href: string;
  external: boolean;
  haystack: string;
};

function externalFromHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export const globalSearchHits: GlobalSearchHit[] = (() => {
  const hits: GlobalSearchHit[] = [];

  organisations.forEach((org, i) => {
    hits.push({
      id: `organisation-${i}`,
      name: org.name,
      category: "Organisation",
      href: org.url,
      external: true,
      haystack: `${org.name} ${org.description} ${org.tags.join(" ")}`.toLowerCase(),
    });
  });

  communities.forEach((c, i) => {
    hits.push({
      id: `community-${i}`,
      name: c.name,
      category: "Community",
      href: c.url,
      external: true,
      haystack: `${c.name} ${c.description} ${c.tags.join(" ")}`.toLowerCase(),
    });
  });

  companies.forEach((co, i) => {
    hits.push({
      id: `company-${i}`,
      name: co.name,
      category: "Company",
      href: co.url,
      external: true,
      haystack: co.name.toLowerCase(),
    });
  });

  platforms.forEach((p, i) => {
    hits.push({
      id: `platform-${i}`,
      name: p.title,
      category: "Platform",
      href: p.href,
      external: true,
      haystack: `${p.title} ${p.description} ${p.source}`.toLowerCase(),
    });
  });

  const addResourceTitles = (
    items: readonly { title: string; source: string; href: string }[],
    key: string,
  ) => {
    items.forEach((item, i) => {
      hits.push({
        id: `resource-${key}-${i}`,
        name: item.title,
        category: "Resource",
        href: item.href,
        external: externalFromHref(item.href),
        haystack: `${item.title} ${item.source}`.toLowerCase(),
      });
    });
  };

  addResourceTitles(cvAdvice, "cv-advice");
  addResourceTitles(coverLetters, "cover-letters");
  addResourceTitles(apprenticeshipGuides, "apprenticeship-guides");
  addResourceTitles(interviewPrep, "interview-prep");
  addResourceTitles(psychometricTests, "psychometric-tests");
  addResourceTitles(assessmentCentre, "assessment-centre");
  addResourceTitles(workExperience, "work-experience");
  addResourceTitles(linkedinPersonalBrand, "linkedin-personal-brand");
  addResourceTitles(getInspired, "get-inspired");

  templates.forEach((t, i) => {
    hits.push({
      id: `resource-template-${i}`,
      name: t.name,
      category: "Resource",
      href: t.href,
      external:
        externalFromHref(t.href) ||
        Boolean((t as { external?: boolean }).external),
      haystack: `${t.name} ${t.description}`.toLowerCase(),
    });
  });

  return hits;
})();

const FEATURED_CARD_CLASS =
  "group relative overflow-hidden flex flex-row items-start justify-between gap-4 rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none";

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | HTMLAnchorElement | null)[]>([]);
  const trimmed = query.trim().toLowerCase();
  const clearSearch = useCallback(() => setQuery(""), []);
  const results = useMemo(() => {
    return globalSearchHits.filter(
      (h) =>
        (selectedCategory.length === 0 || selectedCategory.includes(h.category)) &&
        (!trimmed || h.haystack.includes(trimmed)),
    );
  }, [trimmed, selectedCategory]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [results]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) =>
          Math.min(i + 1, Math.max(0, results.length - 1)),
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, -1));
        return;
      }
      if (e.key === "Enter") {
        if (focusedIndex >= 0 && results[focusedIndex]) {
          e.preventDefault();
          const hit = results[focusedIndex];
          if (hit.external) {
            window.open(hit.href, "_blank");
          } else {
            router.push(hit.href);
            onClose();
          }
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, onClose, results, router]);

  useEffect(() => {
    if (focusedIndex >= 0) {
      cardRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  useEffect(() => {
    if (focusedIndex === -1) {
      searchInputRef.current?.focus();
    }
  }, [focusedIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]"
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "#0a0a0a" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#0a0a0a",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <div
          className="mx-auto flex w-full max-w-7xl items-center gap-2 sm:gap-3"
          style={{
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#2a2a2a] bg-[#111] px-3 py-3 sm:px-5 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <ChevronLeft size={16} aria-hidden />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="relative flex flex-1 flex-col">
            <div className="relative flex flex-1 items-center">
              <Search
                size={16}
                aria-hidden
                className="pointer-events-none absolute left-3 text-[#555]"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search organisations, companies, resources, communities..."
                autoComplete="off"
                aria-label="Site search"
                className="w-full rounded-2xl border border-[#2a2a2a] bg-[#111] py-3 pl-10 pr-10 text-base text-neutral-100 placeholder:text-[#444] transition-[border-color] duration-300 ease focus:border-[#555] focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors duration-200 hover:text-white"
                  style={{ cursor: "pointer" }}
                >
                  <X size={18} aria-hidden />
                </button>
              ) : null}
            </div>
            <p className="hidden sm:block mt-2 px-1 text-[11px] text-[#444]">
              ↑↓ to navigate · Enter to open · Esc to close
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#2a2a2a] bg-[#111] px-3 py-3 sm:px-5 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((hit, index) => {
            const cardClass = `${FEATURED_CARD_CLASS} flex-col gap-1 no-underline text-inherit${
              index === focusedIndex ? " ring-1 ring-[#555] border-[#555]" : ""
            }`;
            return hit.external ? (
              <a
                key={hit.id}
                ref={(el) => void (cardRefs.current[index] = el)}
                href={hit.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                <p className="relative z-[1] text-sm text-neutral-100">{hit.name}</p>
                <span className="relative z-[1] w-fit rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#666]">
                  {hit.category}
                </span>
              </a>
            ) : (
              <Link
                key={hit.id}
                ref={(el) => void (cardRefs.current[index] = el)}
                href={hit.href}
                className={cardClass}
              >
                <p className="relative z-[1] text-sm text-neutral-100">{hit.name}</p>
                <span className="relative z-[1] w-fit rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-[#666]">
                  {hit.category}
                </span>
              </Link>
            );
          })}
        </div>
        {trimmed && results.length === 0 ? (
          <SearchEmptyState title="Nothing found in the library" onClear={clearSearch} />
        ) : null}
      </div>
      {filterOpen ? (
        <div
          className="fixed right-0 top-0 bottom-0 z-[60] flex flex-col gap-6 overflow-y-auto border-l border-[#2a2a2a] bg-[#111] p-8"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(380px, 85vw)",
            background: "#111",
            borderLeft: "1px solid #2a2a2a",
            zIndex: 60,
            padding: "24px",
            paddingLeft: "20px",
            paddingRight: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2 className="text-lg font-medium text-neutral-100">Filter</h2>
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              aria-label="Close filters"
              className="text-neutral-500 transition-colors duration-200 hover:text-white"
              style={{ cursor: "pointer" }}
            >
              <X size={18} aria-hidden />
            </button>
          </div>
          <p className="text-sm tracking-widest text-neutral-500 uppercase">Categories</p>
          <div className="flex flex-wrap">
            {["All", "Organisation", "Community", "Company", "Platform", "Resource"].map(
              (category) => {
                const isActive =
                  category === "All"
                    ? selectedCategory.length === 0
                    : selectedCategory.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      if (category === "All") {
                        setSelectedCategory([]);
                      } else {
                        setSelectedCategory((prev) =>
                          prev.includes(category)
                            ? prev.filter((c) => c !== category)
                            : [...prev, category],
                        );
                      }
                    }}
                    className={`mr-2 mb-2 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 ${
                      isActive
                        ? "border-[#555] bg-[#222] text-white"
                        : "border-[#2a2a2a] bg-transparent text-[#666] hover:text-[#aaa]"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {category}
                  </button>
                );
              },
            )}
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="mt-auto w-full rounded-xl border border-[#333] bg-[#222] py-3 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function SiteNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useRegisterShareShortcut(() => setShareOpen(true));

  useEffect(() => {
    if (!menuOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [menuOpen]);

  return (
    <>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <header
        className={`w-full bg-transparent py-0 ${searchOpen ? "invisible pointer-events-none" : ""}`}
        style={{ position: "relative", zIndex: 9999 }}
      >
        <div
          className="relative overflow-visible flex h-12 md:h-14 w-full items-center justify-between rounded-[20px] md:rounded-[24px] border border-[#2a2a2a] pl-4 pr-1 md:pl-6 md:pr-2"
          style={{
            background: "linear-gradient(160deg, #202020 0%, #111 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.13), inset 0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "24px",
            }}
          />
          <NavbarLogo
            orbitronClassName={orbitron.className}
            onGlitchChange={(active) => setGlitching(active)}
          />
          <div
            className={`flex items-center gap-0.5 md:gap-1 transition-opacity duration-500 sm:opacity-100 ${glitching ? "opacity-0" : "opacity-100"}`}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              aria-pressed={searchOpen}
              className="flex h-9 w-9 md:h-10 md:w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
              style={{ cursor: "pointer" }}
            >
              <Search size={18} aria-hidden />
            </button>
            <div className="hidden sm:flex">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                aria-label="Share page"
                className="flex h-9 w-9 md:h-10 md:w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
                style={{ cursor: "pointer" }}
              >
                <Share2 size={18} aria-hidden />
              </button>
            </div>
            <div className="hidden sm:flex">
              <button
                type="button"
                onClick={() => setSuggestOpen(true)}
                aria-label="Suggest a resource"
                className="flex h-9 w-9 md:h-10 md:w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
                style={{ cursor: "pointer" }}
              >
                <Lightbulb size={18} aria-hidden />
              </button>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-9 w-9 md:h-10 md:w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
                style={{ cursor: "pointer" }}
              >
                <Menu size={18} aria-hidden />
              </button>
              {menuOpen ? (
                <div
                  className="absolute overflow-hidden"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: "220px",
                    background: "linear-gradient(160deg, #202020 0%, #111 100%)",
                    border: "1px solid #2a2a2a",
                    borderRadius: "16px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.13), inset 0 0 0 1px rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                    zIndex: 9999,
                  }}
                >
                  {sectionTiles.map(({ label, Icon, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        trackPageVisit(href, label);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 border-b border-[#1a1a1a] px-4 py-3 text-sm text-neutral-400 no-underline transition-all duration-200 last:border-b-0 hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={15} className="text-[#666]" aria-hidden />
                      <span>{label}</span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setSuggestOpen(true);
                    }}
                    className="flex w-full items-center gap-3 border-b border-[#1a1a1a] px-4 py-3 text-left text-sm text-neutral-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <Lightbulb size={15} className="text-[#666]" aria-hidden />
                    <span>Suggest</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setShareOpen(true);
                    }}
                    className="flex w-full items-center gap-3 border-b border-[#1a1a1a] px-4 py-3 text-left text-sm text-neutral-400 transition-all duration-200 last:border-b-0 hover:bg-white/5 hover:text-white"
                    style={{ cursor: "pointer" }}
                  >
                    <Share2 size={15} className="text-[#666]" aria-hidden />
                    <span>Share</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <SharePageModal open={shareOpen} onClose={() => setShareOpen(false)} />
        <SuggestResourceModal open={suggestOpen} onClose={() => setSuggestOpen(false)} />
      </header>
    </>
  );
}
