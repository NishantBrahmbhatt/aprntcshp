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
  GraduationCap,
  HardHat,
  Leaf,
  Linkedin,
  Mail,
  Megaphone,
  MessageSquare,
  Palette,
  PenLine,
  Scale,
  Scissors,
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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { globalSearchHits, SiteNavbar } from "@/components/SiteNavbar";
import { useRegisterSiteSearch } from "@/components/KeyboardShortcutsProvider";
import { SearchEmptyState } from "@/components/EmptyState";
import { MostUsefulResourcesSection } from "@/components/MostUsefulResourcesSection";
import { cvResourcesCount } from "@/app/resources/page";
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

const VISITED_STORAGE_KEY = "aprntcshp_visited";

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
    <section className="mt-8 grid grid-cols-1" id="hero">
      <div className="space-y-2 text-left">
        <div className="space-y-4">
          <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
          The UK&apos;s apprenticeship hub
          </p>
          <h1 className="text-[1.35rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-50">
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
    <section className="mt-8" id="sections">
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
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-5 pb-20 sm:pt-3 md:pt-4">
        <SiteNavbar />
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
