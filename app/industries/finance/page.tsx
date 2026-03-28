"use client";

import { useCallback, useLayoutEffect, useRef, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { Orbitron } from "next/font/google";
import { communities, resourceSections } from "@/lib/data/industries/finance";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "Companies", href: "/companies" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

const SECTION_IDS = {
  general: "finance-section-general",
  finance: "finance-section-finance",
  accounting: "finance-section-accounting",
  insurance: "finance-section-insurance",
  communities: "finance-section-communities",
} as const;

const RESOURCE_SUBSECTION_IDS: Record<string, string> = {
  General: SECTION_IDS.general,
  Finance: SECTION_IDS.finance,
  Accounting: SECTION_IDS.accounting,
  Insurance: SECTION_IDS.insurance,
};

const SECTION_PILLS: { id: string; label: string }[] = [
  { id: SECTION_IDS.general, label: "General" },
  { id: SECTION_IDS.finance, label: "Finance" },
  { id: SECTION_IDS.accounting, label: "Accounting" },
  { id: SECTION_IDS.insurance, label: "Insurance" },
  { id: SECTION_IDS.communities, label: "Communities" },
];

const cardShell =
  "group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none";

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <NavbarLogo orbitronClassName={orbitron.className} />
      <NavbarNavLinks items={navItems} />
    </header>
  );
}

function SectionDivider() {
  return <div className="border-t border-neutral-800" />;
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Finance
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Everything you need to pursue a finance apprenticeship.
        </p>
      </div>
    </section>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-sm font-medium tracking-wide text-neutral-300 uppercase">
        {title}
      </h2>
    </div>
  );
}

function FinanceSectionsNav({
  activeSectionId,
  onPillClick,
}: {
  activeSectionId: string | null;
  onPillClick: (sectionId: string) => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pillButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container == null) return;

    container.scrollLeft = 0;
    const firstId = SECTION_PILLS[0]?.id;
    const firstEl = firstId ? pillButtonRefs.current[firstId] : null;
    firstEl?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "start",
    });
  }, []);

  useEffect(() => {
    if (!activeSectionId) return;
    pillButtonRefs.current[activeSectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSectionId]);

  const inactivePillClass =
    "rounded-full border border-solid border-[#2a2a2a] bg-[#111] px-3 py-1 text-[12px] whitespace-nowrap text-neutral-500 transition-[transform,background-color,color] duration-300 ease md:px-4 md:py-[6px] hover:-translate-y-[2px]";
  const activePillClass =
    "rounded-full border border-solid border-white bg-white px-3 py-1 text-[12px] whitespace-nowrap text-black transition-[transform,background-color,color] duration-300 ease md:px-4 md:py-[6px]";

  return (
    <nav
      aria-label="Finance guide sections"
      className="sticky top-0 z-20 -mx-6 border-b border-[#1a1a1a]/80 bg-[#0f0f0f] px-0 py-3 md:bg-[#0f0f0f]/95 md:backdrop-blur-sm md:px-6"
    >
      <div
        ref={scrollContainerRef}
        style={{ scrollbarWidth: "none" }}
        className="flex flex-nowrap justify-start gap-2 overflow-x-auto px-4 md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {SECTION_PILLS.map((pill) => {
          const isActive = activeSectionId === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              ref={(node) => {
                pillButtonRefs.current[pill.id] = node;
              }}
              onClick={() => {
                pillButtonRefs.current[pill.id]?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
                onPillClick(pill.id);
              }}
              className={isActive ? activePillClass : inactivePillClass}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ResourceCard({
  title,
  source,
  href,
}: {
  title: string;
  source: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${cardShell} flex items-start justify-between gap-4`}
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-50">{title}</h3>
        <p className="text-xs text-neutral-400">{source}</p>
      </div>
      <ExternalLink className="hidden md:block mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300 shrink-0" aria-hidden="true" />
    </a>
  );
}

function CommunityCard({
  name,
  description,
  tags,
  href,
}: {
  name: string;
  description: string;
  tags: string[];
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${cardShell} flex items-start justify-between gap-4`}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-base font-semibold text-neutral-50">{name}</h3>
        <p className="pt-2 text-xs text-neutral-400">{description}</p>
        <div className="flex flex-wrap gap-[6px] pt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "999px",
                padding: "2px 10px",
                fontSize: "11px",
                color: "#888",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <ExternalLink className="hidden md:block mt-1 h-4 w-4 shrink-0 text-neutral-500 group-hover:text-neutral-300" aria-hidden="true" />
    </a>
  );
}

function navKeyForObservedElement(el: HTMLElement): string {
  return el.dataset.navId ?? el.id;
}

export default function FinanceIndustryPage() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});

  const generalRef = useRef<HTMLElement | null>(null);
  const financeRef = useRef<HTMLElement | null>(null);
  const accountingRef = useRef<HTMLElement | null>(null);
  const insuranceRef = useRef<HTMLElement | null>(null);
  const communitiesRef = useRef<HTMLElement | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useLayoutEffect(() => {
    const sections = [
      generalRef.current,
      financeRef.current,
      accountingRef.current,
      insuranceRef.current,
      communitiesRef.current,
    ].filter((n): n is HTMLElement => n !== null);

    if (sections.length === 0) return;

    const STICKY_OFFSET = "56px";

    const pickFromRatios = () => {
      const ratios = ratiosRef.current;
      let bestId: string | null = null;
      let best = -1;
      for (const el of sections) {
        const key = navKeyForObservedElement(el);
        if (!key) continue;
        const r = ratios[key] ?? 0;
        if (r > best) {
          best = r;
          bestId = key;
        }
      }
      if (bestId !== null && best > 0) {
        setActiveSectionId(bestId);
      }
    };

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = navKeyForObservedElement(entry.target as HTMLElement);
          if (key) {
            ratiosRef.current[key] = entry.intersectionRatio;
          }
        }
        pickFromRatios();
      },
      {
        root: null,
        rootMargin: `-${STICKY_OFFSET} 0px 0px 0px`,
        threshold: thresholds,
      },
    );

    for (const el of sections) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      ratiosRef.current = {};
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />

          <FinanceSectionsNav
            activeSectionId={activeSectionId}
            onPillClick={scrollToSection}
          />

          <div className="space-y-8 pb-10">
            <SectionHeading title="Resources" />
            {resourceSections.map((section) => {
              const navId = RESOURCE_SUBSECTION_IDS[section.label];
              const ref =
                section.label === "General"
                  ? generalRef
                  : section.label === "Finance"
                    ? financeRef
                    : section.label === "Accounting"
                      ? accountingRef
                      : insuranceRef;
              return (
                <section
                  key={section.label}
                  ref={ref}
                  data-nav-id={navId}
                  className="space-y-4"
                >
                  <h3
                    id={navId}
                    className="scroll-mt-[72px] text-xs font-medium uppercase tracking-wide text-neutral-400"
                  >
                    {section.label}
                  </h3>
                  <div className="grid gap-5 md:grid-cols-2">
                    {section.items.map((r) => (
                      <ResourceCard
                        key={r.href}
                        title={r.title}
                        source={r.source}
                        href={r.href}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <SectionDivider />

          <section
            ref={communitiesRef}
            id={SECTION_IDS.communities}
            data-nav-id={SECTION_IDS.communities}
            className="scroll-mt-[72px] space-y-4 pt-10"
          >
            <SectionHeading title="Communities" />
            <div className="grid gap-5 md:grid-cols-2">
              {communities.map((item) => (
                <CommunityCard
                  key={item.url}
                  name={item.name}
                  description={item.description}
                  tags={item.tags}
                  href={item.url}
                />
              ))}
            </div>
          </section>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
