"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { CopyCardLinkButton } from "@/components/CopyCardLinkButton";
import { NewBadge } from "@/components/NewBadge";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { VoteButton } from "@/components/VoteButton";
import { voteResourceId } from "@/lib/vote-resource-id";
import {
  apprenticeshipGuides,
  assessmentCentre,
  coverLetters,
  cvAdvice,
  cvResourcesCount,
  getInspired,
  interviewPrep,
  linkedinPersonalBrand,
  psychometricTests,
  templates,
  workExperience,
  type CvResourceType,
} from "@/lib/data/cv-resources";

export { cvResourcesCount };

function ResourceTypePill({ type }: { type: CvResourceType }) {
  return (
    <span className="shrink-0 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal tracking-[0.05em] text-[#666]">
      {type}
    </span>
  );
}

const SECTION_IDS = {
  apprenticeshipGuides: "resources-section-apprenticeship-guides",
  templates: "resources-section-templates",
  writingCv: "resources-section-writing-cv",
  coverLetters: "resources-section-cover-letters",
  interviewPrep: "resources-section-interview-prep",
  psychometricTests: "resources-section-psychometric-tests",
  assessmentCentre: "resources-section-assessment-centre",
  workExperience: "resources-section-work-experience",
  linkedinPersonalBrand: "resources-section-linkedin-personal-brand",
  getInspired: "resources-section-get-inspired",
} as const;

const SECTION_PILLS: { id: string; label: string }[] = [
  { id: SECTION_IDS.apprenticeshipGuides, label: "Apprenticeship Guides" },
  { id: SECTION_IDS.templates, label: "Templates" },
  { id: SECTION_IDS.writingCv, label: "Writing Your CV" },
  {
    id: SECTION_IDS.coverLetters,
    label: "Cover Letters & Personal Statements",
  },
  { id: SECTION_IDS.interviewPrep, label: "Interview Prep" },
  { id: SECTION_IDS.psychometricTests, label: "Psychometric Tests" },
  { id: SECTION_IDS.assessmentCentre, label: "Assessment Centre" },
  { id: SECTION_IDS.workExperience, label: "Work Experience" },
  {
    id: SECTION_IDS.linkedinPersonalBrand,
    label: "LinkedIn & Personal Brand",
  },
  { id: SECTION_IDS.getInspired, label: "Get Inspired" },
];

function SectionDivider() {
  return <div className="border-t border-neutral-800" />;
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Resources
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Everything you need for your apprenticeship application.
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

function ResourcesSectionNav({
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

    // Ensure the first pill is visible and not clipped on load.
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

  return (
    <nav
      ref={scrollContainerRef}
      aria-label="Resources sections"
      style={{ scrollbarWidth: "none" }}
      className="sticky top-0 z-20 flex w-full flex-nowrap overflow-x-auto border-b border-[#1a1a1a]/80 bg-[#0f0f0f]/92 py-3 backdrop-blur-sm [&::-webkit-scrollbar]:[display:none]"
    >
      <div className="flex w-max min-w-0 flex-nowrap justify-start gap-2 pr-6">
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
              className={`rounded-full border px-3 py-1 text-[12px] whitespace-nowrap md:px-4 md:py-1.5 md:text-xs transition-[transform,background-color,color] duration-300 ease ${
                isActive
                  ? "border-white bg-white text-black"
                  : "border-[#2a2a2a] bg-[#111] text-neutral-500 hover:-translate-y-[2px]"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function DownloadCard({
  name,
  description,
  href,
  download,
  dateAdded,
  type,
}: {
  name: string;
  description: string;
  href: string;
  download?: boolean;
  dateAdded?: string;
  type: CvResourceType;
}) {
  return (
    <div className="relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] text-sm text-neutral-200 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none p-5">
      <NewBadge dateAdded={dateAdded} />
      <div className="absolute top-5 right-5 z-[2] hidden md:block">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          {...(download ? { download: "" } : {})}
          className="shrink-0 text-neutral-500 transition-colors duration-200 ease hover:text-neutral-300"
          aria-label="Open resource in new tab"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <div className="flex items-start gap-4 md:pr-12">
        <div className="mt-0.5 h-10 w-10 shrink-0 bg-neutral-900 flex items-center justify-center">
          <FileText className="h-5 w-5 text-neutral-300" aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-1">
          <h3 className="min-w-0 text-base font-semibold text-neutral-50">
            {name}
          </h3>
          <p className="flex min-w-0 flex-wrap items-center gap-[6px] text-xs text-neutral-400">
            <span>{description}</span>
            <span aria-hidden>·</span>
            <ResourceTypePill type={type} />
          </p>
        </div>
      </div>
      <div className="mt-4">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          {...(download ? { download: "" } : {})}
          className="inline-flex items-center text-xs font-medium text-neutral-300 hover:text-neutral-100 tracking-wide transition-colors"
        >
          Download Now
        </a>
      </div>
      <div className="mt-3 flex w-full items-center gap-2">
        <CopyCardLinkButton href={href} />
        <div className="ml-auto">
          <VoteButton resourceId={voteResourceId(name, description)} />
        </div>
      </div>
    </div>
  );
}

function LinkCard({
  title,
  source,
  href,
  dateAdded,
  type,
}: {
  title: string;
  source: string;
  href: string;
  dateAdded?: string;
  type: CvResourceType;
}) {
  return (
    <div className="relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 flex flex-col gap-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none">
      <NewBadge dateAdded={dateAdded} />
      <div className="absolute top-5 right-5 z-[2] hidden md:block">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-neutral-500 transition-colors duration-200 ease hover:text-neutral-300"
          aria-label={`Open ${title} in new tab`}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group/link flex w-full min-w-0 items-start gap-4 md:pr-12"
      >
        <div className="min-w-0 space-y-1">
          <h3 className="min-w-0 text-base font-semibold text-neutral-50">
            {title}
          </h3>
          <p className="flex min-w-0 flex-wrap items-center gap-[6px] text-xs text-neutral-400">
            <span>{source}</span>
            <span aria-hidden>·</span>
            <ResourceTypePill type={type} />
          </p>
        </div>
      </a>
      <div className="flex w-full items-center gap-2">
        <CopyCardLinkButton href={href} />
        <div className="ml-auto">
          <VoteButton resourceId={voteResourceId(title, source)} />
        </div>
      </div>
    </div>
  );
}

export default function CvResourcesPage() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});

  const apprenticeshipGuidesRef = useRef<HTMLElement | null>(null);
  const templatesRef = useRef<HTMLElement | null>(null);
  const writingCvRef = useRef<HTMLElement | null>(null);
  const coverLettersRef = useRef<HTMLElement | null>(null);
  const interviewPrepRef = useRef<HTMLElement | null>(null);
  const psychometricTestsRef = useRef<HTMLElement | null>(null);
  const assessmentCentreRef = useRef<HTMLElement | null>(null);
  const workExperienceRef = useRef<HTMLElement | null>(null);
  const linkedinPersonalBrandRef = useRef<HTMLElement | null>(null);
  const getInspiredRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useLayoutEffect(() => {
    const sections = [
      apprenticeshipGuidesRef.current,
      templatesRef.current,
      writingCvRef.current,
      coverLettersRef.current,
      interviewPrepRef.current,
      psychometricTestsRef.current,
      assessmentCentreRef.current,
      workExperienceRef.current,
      linkedinPersonalBrandRef.current,
      getInspiredRef.current,
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
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-5 pb-20">
        <SiteNavbar />
        <div className="flex-1">
          <PageHeader />

          <ResourcesSectionNav
            activeSectionId={activeSectionId}
            onPillClick={scrollToSection}
          />

          <section
            ref={apprenticeshipGuidesRef}
            id={SECTION_IDS.apprenticeshipGuides}
            className="scroll-mt-[72px] space-y-4 pt-14 pb-10"
          >
            <SectionHeading title="Apprenticeship Guides" />
            <div className="grid gap-5 md:grid-cols-2">
              {apprenticeshipGuides.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={templatesRef}
            id={SECTION_IDS.templates}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Templates" />
            <div className="grid gap-5 md:grid-cols-2">
              {templates.map((t) => (
                <DownloadCard
                  key={t.name}
                  name={t.name}
                  description={t.description}
                  href={t.href}
                  download={"download" in t ? t.download : undefined}
                  type={t.type}
                  dateAdded={
                    "dateAdded" in t ? t.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={writingCvRef}
            id={SECTION_IDS.writingCv}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Writing Your CV" />
            <div className="grid gap-5 md:grid-cols-2">
              {cvAdvice.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={coverLettersRef}
            id={SECTION_IDS.coverLetters}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Cover Letters & Personal Statements" />
            <div className="grid gap-5 md:grid-cols-2">
              {coverLetters.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={interviewPrepRef}
            id={SECTION_IDS.interviewPrep}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Interview Prep" />
            <div className="grid gap-5 md:grid-cols-2">
              {interviewPrep.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={psychometricTestsRef}
            id={SECTION_IDS.psychometricTests}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Psychometric Tests" />
            <div className="grid gap-5 md:grid-cols-2">
              {psychometricTests.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={assessmentCentreRef}
            id={SECTION_IDS.assessmentCentre}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Assessment Centre" />
            <div className="grid gap-5 md:grid-cols-2">
              {assessmentCentre.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
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
              {workExperience.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={linkedinPersonalBrandRef}
            id={SECTION_IDS.linkedinPersonalBrand}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="LinkedIn & Personal Brand" />
            <div className="grid gap-5 md:grid-cols-2">
              {linkedinPersonalBrand.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section
            ref={getInspiredRef}
            id={SECTION_IDS.getInspired}
            className="scroll-mt-[72px] space-y-4 py-10"
          >
            <SectionHeading title="Get Inspired" />
            <div className="grid gap-5 md:grid-cols-2">
              {getInspired.map((card) => (
                <LinkCard
                  key={`${card.title}-${card.href}`}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                  type={card.type}
                  dateAdded={
                    "dateAdded" in card ? card.dateAdded : undefined
                  }
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

