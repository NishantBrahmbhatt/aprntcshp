"use client";

import { useEffect, useState } from "react";
import { Briefcase, Building2, FileText, Search, Users } from "lucide-react";
import Link from "next/link";
import { Orbitron } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { communities } from "@/app/communities/page";
import { cvResourcesCount } from "@/app/cv-resources/page";
import { platforms } from "@/app/find-apprenticeships/page";
import { organisations } from "@/app/organisations/page";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const sectionTiles = [
  { label: "Organisations", Icon: Building2, href: "/organisations" },
  { label: "Find Apprenticeships", Icon: Search, href: "/find-apprenticeships" },
  { label: "Industries", Icon: Briefcase, href: "/industries" },
  { label: "Resources", Icon: FileText, href: "/cv-resources" },
  { label: "Communities", Icon: Users, href: "/communities" },
];

const sectionCards = [
  {
    label: "Organisations",
    Icon: Building2,
    href: "/organisations",
    description: "Independent organisations supporting UK apprentices",
    count: organisations.length,
  },
  {
    label: "Apprenticeship Trackers",
    Icon: Search,
    href: "/find-apprenticeships",
    description: "Every major apprenticeship tracker",
    count: platforms.length,
  },
  {
    label: "Resources",
    Icon: FileText,
    href: "/cv-resources",
    description: "Templates, guides and advice for your application",
    count: cvResourcesCount,
  },
  {
    label: "Communities",
    Icon: Users,
    href: "/communities",
    description: "Peer networks and communities to join",
    count: communities.length,
  },
];


function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <NavbarLogo orbitronClassName={orbitron.className} />
      <NavbarNavLinks
        items={sectionTiles.map(({ label, href }) => ({ label, href }))}
      />
    </header>
  );
}

function SectionDivider() {
  return <div className="mt-10 border-t border-neutral-800" />;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function CountUpSegment({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const start = performance.now();
    const duration = 800;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span className="inline-grid shrink-0 tabular-nums">
      <span className="invisible col-start-1 row-start-1">{target}</span>
      <span className="col-start-1 row-start-1">{value}</span>
    </span>
  );
}

function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12" id="hero">
      <div className="space-y-7 text-left">
        <div className="space-y-4">
          <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
          The UK&apos;s apprenticeship hub
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
            <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
              Every apprenticeship resource, in one place.
            </span>
          </h1>
        </div>
      </div>
      <div className="text-left md:pt-1">
        <p className="max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-neutral-500">
          Finding apprenticeship resources shouldn&apos;t be hard. We&apos;ve gathered every
          organisation, community, CV guide, and job board in one place - so you can
          spend less time searching and more time applying.
        </p>
      </div>
    </section>
  );
}

function SectionsRow() {
  return (
    <section className="mt-10" id="sections">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sectionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden flex flex-col gap-4 rounded-xl bg-[linear-gradient(160deg,#202020_0%,#111_100%)] border border-[#2a2a2a] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
          >
            <div className="flex items-start gap-4">
              <card.Icon
                className="h-6 w-6 text-neutral-200 mt-1"
                aria-hidden="true"
              />
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold text-neutral-100">
                  <CountUpSegment target={card.count} /> {card.label}
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1 pt-16 pb-20">
          <HeroSection />
          <SectionDivider />
          <SectionsRow />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
