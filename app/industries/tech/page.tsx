"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { Orbitron } from "next/font/google";
import {
  cvResources,
  cyberSecurity,
  dataAndAI,
  general,
  otherTechRoles,
  softwareDevelopment,
  workExperience,
} from "@/lib/data/industries/tech";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "Companies", href: "/companies" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Communities", href: "/communities" },
];

const SECTION_IDS = {
  general: "tech-section-general",
  software: "tech-section-software",
  data: "tech-section-data",
  cyber: "tech-section-cyber",
  other: "tech-section-other",
  workExperience: "tech-section-work-experience",
  cv: "tech-section-cv",
} as const;

const SECTION_PILLS: { id: string; label: string }[] = [
  { id: SECTION_IDS.general, label: "General" },
  { id: SECTION_IDS.software, label: "Software & Development" },
  { id: SECTION_IDS.data, label: "Data & AI" },
  { id: SECTION_IDS.cyber, label: "Cyber Security" },
  { id: SECTION_IDS.other, label: "Other Tech Roles" },
  { id: SECTION_IDS.workExperience, label: "Work Experience" },
  { id: SECTION_IDS.cv, label: "CV Resources" },
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
            Tech
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Everything you need to pursue a technology apprenticeship.
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

function TechSectionsNav({
  activeSectionId,
  onPillClick,
}: {
  activeSectionId: string | null;
  onPillClick: (sectionId: string) => void;
}) {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
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
      ref={scrollContainerRef}
      aria-label="Tech guide sections"
      style={{ scrollbarWidth: "none" }}
      className="sticky top-0 z-20 -mx-6 flex w-full flex-nowrap overflow-x-auto border-b border-[#1a1a1a]/80 bg-[#0f0f0f] px-0 py-3 md:bg-[#0f0f0f]/95 md:backdrop-blur-sm [&::-webkit-scrollbar]:[display:none]"
    >
      <div className="flex w-max flex-nowrap justify-start gap-2 px-6">
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

export default function TechIndustryPage() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});

  const generalRef = useRef<HTMLElement | null>(null);
  const softwareRef = useRef<HTMLElement | null>(null);
  const dataRef = useRef<HTMLElement | null>(null);
  const cyberRef = useRef<HTMLElement | null>(null);
  const otherRef = useRef<HTMLElement | null>(null);
  const workExperienceRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useLayoutEffect(() => {
    const sections = [
      generalRef.current,
      softwareRef.current,
      dataRef.current,
      cyberRef.current,
      otherRef.current,
      workExperienceRef.current,
      cvRef.current,
    ].filter((n): n is HTMLElement => n !== null);

    if (sections.length === 0) return;

    const STICKY_OFFSET = "56px";

    const pickFromRatios = () => {
      const ratios = ratiosRef.current;
      let bestId: string | null = null;
      let best = -1;
      for (const el of sections) {
        const r = ratios[el.id] ?? 0;
        if (r > best) {
          best = r;
          bestId = el.id;
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
          ratiosRef.current[entry.target.id] = entry.intersectionRatio;
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

          <TechSectionsNav
            activeSectionId={activeSectionId}
            onPillClick={scrollToSection}
          />

          <section
            ref={generalRef}
            id={SECTION_IDS.general}
            className="scroll-mt-[72px] space-y-4 pb-10"
          >
            <SectionHeading title="General" />
            <div className="grid gap-5 md:grid-cols-2">
              {general.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={softwareRef}
            id={SECTION_IDS.software}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Software & Development" />
            <div className="grid gap-5 md:grid-cols-2">
              {softwareDevelopment.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={dataRef}
            id={SECTION_IDS.data}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Data & AI" />
            <div className="grid gap-5 md:grid-cols-2">
              {dataAndAI.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={cyberRef}
            id={SECTION_IDS.cyber}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Cyber Security" />
            <div className="grid gap-5 md:grid-cols-2">
              {cyberSecurity.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={otherRef}
            id={SECTION_IDS.other}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Other Tech Roles" />
            <div className="grid gap-5 md:grid-cols-2">
              {otherTechRoles.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={workExperienceRef}
            id={SECTION_IDS.workExperience}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Work Experience" />
            <div className="grid gap-5 md:grid-cols-2">
              {workExperience.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={cvRef}
            id={SECTION_IDS.cv}
            className="scroll-mt-[72px] space-y-4 pt-10"
          >
            <SectionHeading title="CV Resources" />
            <div className="grid gap-5 md:grid-cols-2">
              {cvResources.map((r) => (
                <ResourceCard
                  key={r.href}
                  title={r.title}
                  source={r.source}
                  href={r.href}
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
