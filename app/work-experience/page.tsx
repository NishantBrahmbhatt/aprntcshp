"use client";

import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import {
  workExperienceArticles,
  workExperiencePlatforms,
} from "@/lib/data/work-experience-platforms";

function SectionDivider() {
  return <div className="border-t border-neutral-800" />;
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Work Experience
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Find work experience placements and read guides to help you get started.
        </p>
      </div>
    </section>
  );
}

function LinkCard({
  title,
  href,
  description,
  source,
  note,
}: {
  title: string;
  href: string;
  description?: string;
  source?: string;
  note?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 flex items-start justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-50">{title}</h3>
        {description ? (
          <p className="pt-2 text-xs text-neutral-400">{description}</p>
        ) : null}
        {source ? (
          <p className="pt-2 text-xs text-neutral-400">{source}</p>
        ) : null}
        {note ? (
          <span className="mt-2 inline-flex shrink-0 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-normal tracking-[0.05em] text-[#666]">
            {note}
          </span>
        ) : null}
      </div>
      <ExternalLink
        className="hidden md:block mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300"
        aria-hidden="true"
      />
    </a>
  );
}

export default function WorkExperiencePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-5 pb-20">
        <SiteNavbar />
        <div className="flex-1">
          <PageHeader />
          <section className="space-y-4 pb-10">
            <h2 className="text-sm font-medium tracking-wide text-neutral-300 uppercase">
              Find Work Experience
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {workExperiencePlatforms.map((card) => (
                <LinkCard
                  key={card.href}
                  title={card.title}
                  href={card.href}
                  description={card.description}
                  note={card.note}
                />
              ))}
            </div>
          </section>
          <SectionDivider />
          <section className="space-y-4 pt-10">
            <h2 className="text-sm font-medium tracking-wide text-neutral-300 uppercase">
              Guides
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {workExperienceArticles.map((card) => (
                <LinkCard
                  key={card.href}
                  title={card.title}
                  href={card.href}
                  source={card.source}
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
