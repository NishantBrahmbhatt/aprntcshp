"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Building,
  ClipboardList,
  Code,
  ChevronLeft,
  GraduationCap,
  HardHat,
  Leaf,
  Linkedin,
  Mail,
  Menu,
  Megaphone,
  MessageSquare,
  Palette,
  PenLine,
  Scale,
  Scissors,
  Share2,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  FileText,
  Layers,
  Search,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Users,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { SharePageModal } from "@/components/SharePageModal";
import { useRegisterSiteSearch } from "@/components/KeyboardShortcutsProvider";
import { SearchEmptyState } from "@/components/EmptyState";
import { MostUsefulResourcesSection } from "@/components/MostUsefulResourcesSection";
import { cvResourcesCount } from "@/app/resources/page";
import { platforms } from "@/app/find-apprenticeships/page";
import { industryGridItems } from "@/app/industries/industry-grid";
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
import { logSearch } from "@/lib/supabase";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

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

const globalSearchHits: GlobalSearchHit[] = (() => {
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

const VISITED_STORAGE_KEY = "aprntcshp_visited";

const sectionTiles = [
  { label: "Organisations", Icon: Building2, href: "/organisations" },
  { label: "Find Apprenticeships", Icon: Search, href: "/find-apprenticeships" },
  { label: "Companies", Icon: Briefcase, href: "/companies" },
  { label: "Industries", Icon: Briefcase, href: "/industries" },
  { label: "Resources", Icon: FileText, href: "/resources" },
  { label: "Communities", Icon: Users, href: "/communities" },
];

const iconGridTiles = [
  { label: "Organisations", Icon: Building, href: "/organisations" },
  { label: "Communities", Icon: Users, href: "/communities" },
  { label: "Find Apprenticeships", Icon: Search, href: "/find-apprenticeships" },
  { label: "Companies", Icon: Briefcase, href: "/companies" },
  { label: "Apprenticeship Guides", Icon: BookOpen, href: "/resources#apprenticeship-guides" },
  { label: "CV Templates", Icon: FileText, href: "/resources#templates" },
  { label: "Writing Your CV", Icon: PenLine, href: "/resources#writing-your-cv" },
  { label: "Cover Letters", Icon: Mail, href: "/resources#cover-letters" },
  { label: "Interview Prep", Icon: MessageSquare, href: "/resources#interview-prep" },
  { label: "Psychometric Tests", Icon: Brain, href: "/resources#psychometric-tests" },
  { label: "Assessment Centres", Icon: ClipboardList, href: "/resources#assessment-centre" },
  { label: "Work Experience", Icon: Briefcase, href: "/resources#work-experience" },
  { label: "LinkedIn & Personal Brand", Icon: Linkedin, href: "/resources#linkedin" },
  { label: "Get Inspired", Icon: Sparkles, href: "/resources#get-inspired" },
  { label: "Law", Icon: Scale, href: "/industries/law" },
  { label: "Finance", Icon: TrendingUp, href: "/industries/finance" },
  { label: "Tech", Icon: Code, href: "/industries/tech" },
  { label: "Engineering", Icon: Wrench, href: "/industries/engineering" },
  { label: "Creative", Icon: Palette, href: "/industries/creative" },
  { label: "Sales & Marketing", Icon: Megaphone, href: "/industries/sales-marketing" },
  { label: "Construction", Icon: HardHat, href: "/industries/construction" },
  { label: "Agriculture", Icon: Leaf, href: "/industries/agriculture" },
  { label: "Education", Icon: GraduationCap, href: "/industries/education" },
  { label: "Business", Icon: Building2, href: "/industries/business" },
  { label: "Catering & Hospitality", Icon: UtensilsCrossed, href: "/industries/catering-hospitality" },
  { label: "Transport", Icon: Truck, href: "/industries/transport" },
  { label: "Hair & Beauty", Icon: Scissors, href: "/industries/hair-beauty" },
];

const FEATURED_CARD_CLASS =
  "group relative overflow-hidden flex flex-row items-start justify-between gap-4 rounded-xl border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none";

type NewLibraryItem = {
  id: string;
  name: string;
  href: string;
  categoryLabel: "Organisation" | "Community" | "Company" | "Resource";
  dateAdded: string;
};

const newLibraryItems: NewLibraryItem[] = (() => {
  const all: NewLibraryItem[] = [];

  organisations.forEach((item, index) => {
    if (!item.dateAdded) return;
    all.push({
      id: `organisation-${index}`,
      name: item.name,
      href: item.url,
      categoryLabel: "Organisation",
      dateAdded: item.dateAdded,
    });
  });

  communities.forEach((item, index) => {
    if (!item.dateAdded) return;
    all.push({
      id: `community-${index}`,
      name: item.name,
      href: item.url,
      categoryLabel: "Community",
      dateAdded: item.dateAdded,
    });
  });

  companies.forEach((item, index) => {
    if (!item.dateAdded) return;
    all.push({
      id: `company-${index}`,
      name: item.name,
      href: item.url,
      categoryLabel: "Company",
      dateAdded: item.dateAdded,
    });
  });

  templates.forEach((item, index) => {
    if (!item.dateAdded) return;
    all.push({
      id: `resource-template-${index}`,
      name: item.name,
      href: item.href,
      categoryLabel: "Resource",
      dateAdded: item.dateAdded,
    });
  });

  [
    cvAdvice,
    coverLetters,
    apprenticeshipGuides,
    interviewPrep,
    psychometricTests,
    assessmentCentre,
    getInspired,
    workExperience,
    linkedinPersonalBrand,
  ].forEach((resourceArray, resourceArrayIndex) => {
    resourceArray.forEach((item, itemIndex) => {
      if (!("dateAdded" in item) || !item.dateAdded) return;
      all.push({
        id: `resource-${resourceArrayIndex}-${itemIndex}`,
        name: item.title,
        href: item.href,
        categoryLabel: "Resource",
        dateAdded: item.dateAdded,
      });
    });
  });

  return all
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
    )
    .slice(0, 5);
})();


function LandingGlobalSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const clearSearch = useCallback(() => setQuery(""), []);
  useRegisterSiteSearch(searchInputRef, clearSearch);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [];
    return globalSearchHits.filter((h) => h.haystack.includes(trimmed));
  }, [trimmed]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) return;

    const timeoutId = window.setTimeout(() => {
      void logSearch(trimmedQuery, "landing", results.length);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query, results.length]);

  return (
    <div className="relative mt-10 w-full max-w-2xl">
      <input
        ref={searchInputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search organisations, companies, resources, communities..."
        autoComplete="off"
        aria-label="Site search"
        className="w-full rounded-[8px] border border-[#333] bg-[#111] px-4 py-3 text-neutral-100 placeholder:text-[#444] transition-[border-color] duration-300 ease focus:border-[#666] focus:shadow-[0_0_0_1px_#444] focus:outline-none"
      />
      {trimmed && results.length > 0 ? (
        <div
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-lg border border-neutral-800 bg-[#111] py-1 shadow-lg"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((hit) => (
            <div key={hit.id} role="presentation">
              {hit.external ? (
                <a
                  href={hit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 px-3 py-2.5 no-underline hover:bg-neutral-900/60"
                  role="option"
                >
                  <span className="text-sm text-neutral-100">{hit.name}</span>
                  <span className="text-xs text-neutral-500">
                    {hit.category}
                  </span>
                </a>
              ) : (
                <Link
                  href={hit.href}
                  className="flex flex-col gap-0.5 px-3 py-2.5 no-underline hover:bg-neutral-900/60"
                  role="option"
                >
                  <span className="text-sm text-neutral-100">{hit.name}</span>
                  <span className="text-xs text-neutral-500">
                    {hit.category}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : null}
      {trimmed && results.length === 0 ? (
        <SearchEmptyState
          title="Nothing found in the library"
          onClear={clearSearch}
        />
      ) : null}
    </div>
  );
}

function Navbar({
  hidden,
  searchOpen,
  onSearchOpen,
  onSearchClose,
}: {
  hidden: boolean;
  searchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header
      className={`w-full bg-transparent py-1.5 ${hidden ? "invisible pointer-events-none" : ""}`}
      style={{ position: "sticky", top: 0, zIndex: 50 }}
    >
      <div
        className="relative overflow-visible flex h-14 w-full items-center justify-between rounded-[24px] border border-[#2a2a2a]"
        style={{
          background: "linear-gradient(160deg, #202020 0%, #111 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          paddingLeft: "24px",
          paddingRight: "8px",
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
        <NavbarLogo orbitronClassName={orbitron.className} />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onSearchOpen}
            aria-label="Open search"
            aria-pressed={searchOpen}
            className="flex h-10 w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <Search size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            aria-label="Share page"
            className="flex h-10 w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <Share2 size={18} aria-hidden />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-11 items-center justify-center rounded-[20px] border border-transparent bg-transparent text-[#888] transition-all duration-200 ease hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-white"
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
                  zIndex: 60,
                }}
              >
                {sectionTiles.map(({ label, Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 border-b border-[#1a1a1a] px-4 py-3 text-sm text-neutral-400 no-underline transition-all duration-200 last:border-b-0 hover:bg-white/5 hover:text-white"
                  >
                    <Icon size={15} className="text-[#666]" aria-hidden />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <SharePageModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </header>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const trimmed = query.trim().toLowerCase();
  const clearSearch = useCallback(() => setQuery(""), []);
  const results = useMemo(() => {
    return !trimmed
      ? globalSearchHits
      : globalSearchHits.filter((h) => h.haystack.includes(trimmed));
  }, [trimmed]);

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
          className="mx-auto flex w-full max-w-7xl items-center gap-3"
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
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#2a2a2a] bg-[#111] px-5 py-3 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <ChevronLeft size={16} aria-hidden />
            <span>Back</span>
          </button>
          <div className="relative flex flex-1 items-center">
            <Search
              size={16}
              aria-hidden
              className="pointer-events-none absolute left-3 text-[#555]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search organisations, companies, resources, communities..."
              autoComplete="off"
              aria-label="Site search"
              className="w-full rounded-2xl border border-[#2a2a2a] bg-[#111] py-3 pl-10 pr-10 text-base text-neutral-100 placeholder:text-[#444] transition-[border-color] duration-300 ease focus:border-[#555] focus:outline-none"
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
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-[#2a2a2a] bg-[#111] px-5 py-3 text-sm text-neutral-300 transition-all duration-200 hover:text-white"
            style={{ cursor: "pointer" }}
          >
            <SlidersHorizontal size={16} aria-hidden />
            <span>Filters</span>
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((hit) => {
            const cardClass = `${FEATURED_CARD_CLASS} flex-col gap-1 no-underline text-inherit`;
            return hit.external ? (
              <a
                key={hit.id}
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
              <Link key={hit.id} href={hit.href} className={cardClass}>
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
            width: "380px",
            background: "#111",
            borderLeft: "1px solid #2a2a2a",
            zIndex: 60,
            padding: "32px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div className="flex items-center justify-between">
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
                  category === "All" ? selectedCategory === null : selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category === "All" ? null : category)}
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

function StartHereGuidedPath() {
  const options = [
    {
      href: "/find-apprenticeships",
      label: "Find apprenticeships",
      Icon: Search,
    },
    {
      href: "/resources",
      label: "Build my application",
      Icon: FileText,
    },
    {
      href: "/industries",
      label: "Explore by industry",
      Icon: Layers,
    },
  ] as const;

  return (
    <section className="mt-10" aria-labelledby="start-here-heading">
      <h2
        id="start-here-heading"
        className="text-sm font-normal tracking-[0.05em] text-neutral-500"
      >
        Not sure where to start?
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {options.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 rounded-[10px] border border-solid border-[#2a2a2a] bg-[#111] px-5 py-4 text-[13px] text-[#888] transition-all duration-300 ease hover:-translate-y-0.5 hover:border-[#383838] hover:text-white"
          >
            <Icon
              className="size-4 shrink-0 text-neutral-500 transition-[color] duration-300 ease group-hover:text-white"
              aria-hidden
            />
            <span className="transition-[color] duration-300 ease group-hover:text-white">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="grid grid-cols-1" id="hero">
      <div className="space-y-2 text-left">
        <div className="space-y-4">
          <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
          The UK&apos;s apprenticeship hub
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-50">
            <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
              Every apprenticeship resource, in one place.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function SectionsRow() {
  return (
    <section className="mt-4" id="sections">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
      >
        {iconGridTiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative overflow-hidden flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-[12px] border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-all duration-300 ease hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_inset_0_0_0_1px_rgba(255,255,255,0.06)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
          >
            <tile.Icon
              className="relative z-[1] h-6 w-6 text-[#888] transition-all duration-300 ease group-hover:text-white"
              aria-hidden="true"
            />
            <span
              className="relative z-[1] text-xs font-medium leading-[1.3] text-[#888] transition-all duration-300 ease group-hover:text-white"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewToLibrarySection() {
  if (newLibraryItems.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="new-to-library-heading">
      <h2
        id="new-to-library-heading"
        className="text-sm font-medium tracking-wide text-neutral-500 uppercase"
      >
        New to the library
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {newLibraryItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${FEATURED_CARD_CLASS} no-underline text-inherit`}
          >
            <div className="relative z-[1] min-w-0 flex-1 space-y-1.5">
              <p className="text-base font-semibold text-neutral-100 leading-snug">
                {item.name}
              </p>
              <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal tracking-[0.05em] text-[#666]">
                {item.categoryLabel}
              </span>
            </div>
            <ExternalLink
              className="relative z-[1] h-5 w-5 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-200"
              strokeWidth={2}
              aria-hidden
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function HomePageClient() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showStartHere, setShowStartHere] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(VISITED_STORAGE_KEY)) {
        setShowStartHere(false);
      } else {
        localStorage.setItem(VISITED_STORAGE_KEY, "1");
        setShowStartHere(true);
      }
    } catch {
      setShowStartHere(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar
          hidden={searchOpen}
          searchOpen={searchOpen}
          onSearchOpen={() => setSearchOpen(true)}
          onSearchClose={() => setSearchOpen(false)}
        />
        <div className="flex-1 pt-4 pb-20">
          <HeroSection />
          {showStartHere === true ? <StartHereGuidedPath /> : null}
          <SectionsRow />
          <MostUsefulResourcesSection />
          <NewToLibrarySection />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
