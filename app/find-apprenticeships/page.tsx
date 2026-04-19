"use client";

import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { platforms } from "@/lib/data/platforms";

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Find Apprenticeships
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Every major apprenticeship search platform, in one place.
        </p>
      </div>
    </section>
  );
}

function LinkCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
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
        <p className="pt-2 text-xs text-neutral-400">{description}</p>
      </div>
      <ExternalLink
        className="hidden md:block mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300"
        aria-hidden="true"
      />
    </a>
  );
}

export default function FindApprenticeshipsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-5 pb-20">
        <SiteNavbar />
        <div className="flex-1">
          <PageHeader />
          <section className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2">
              {platforms.map((card) => (
                <LinkCard
                  key={card.href}
                  title={card.title}
                  href={card.href}
                  description={card.description}
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

