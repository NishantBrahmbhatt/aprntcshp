"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "CV Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

const platforms = [
  {
    title: "Creative Dimension Trust",
    source: "Creative Dimension Trust",
    description: "Apprenticeships and programmes in the creative industry.",
    href: "https://creativelivesinprogress.com/articles/creative-apprenticeships-and-programmes",
  },
  {
    title: "Pathway CTM",
    source: "Pathway CTM",
    description: "Careers and apprenticeship opportunities across multiple sectors.",
    href: "https://pathwayctm.com/",
  },
  {
    title: "Higherin",
    source: "Higherin",
    description: "Search apprenticeship vacancies alongside community reviews.",
    href: "https://higherin.com/search-jobs",
  },
  {
    title: "GradCracker",
    source: "GradCracker",
    description: "STEM-focused degree apprenticeships and graduate schemes.",
    href: "https://www.gradcracker.com/search/all-disciplines/degree-apprenticeships",
  },
  {
    title: "Apprentago",
    source: "Apprentago",
    description: "UK apprenticeship search platform for school leavers.",
    href: "https://apprentago.co.uk/",
  },
  {
    title: "ApprenticeWatch",
    source: "ApprenticeWatch",
    description: "Browse live apprenticeship vacancies across the UK.",
    href: "https://apprenticewatch.com/apprenticeships",
  },
  {
    title: "NotGoingToUni",
    source: "NotGoingToUni",
    description: "Apprenticeship and school leaver opportunities.",
    href: "https://notgoingtouni.co.uk/opportunities",
  },
  {
    title: "ApprenticeTrack",
    source: "ApprenticeTrack",
    description: "Track and find apprenticeship opportunities.",
    href: "https://theapprenticetrack.co.uk/",
  },
  {
    title: "UCAS",
    source: "UCAS",
    description: "Search apprenticeships on the UK's official application platform.",
    href: "https://www.ucas.com/explore/search/apprenticeships",
  },
  {
    title: "Gov.uk",
    source: "Gov.uk",
    description: "The government's official apprenticeship search service.",
    href: "https://www.findapprenticeship.service.gov.uk/apprenticeships",
  },
  {
    title: "Amazing Apprenticeships",
    source: "Amazing Apprenticeships",
    description: "Browse apprenticeships by employer.",
    href: "https://www.amazingapprenticeships.com/meet-the-employer/",
  },
  {
    title: "QA",
    source: "QA",
    description: "Apprenticeship jobs across tech and digital sectors.",
    href: "https://www.qa.com/apprenticeships/apprenticeship-jobs/",
  },
  {
    title: "Placer Apprenticeships",
    source: "Placer Apprenticeships",
    description: "Search apprenticeship vacancies by location and sector.",
    href: "https://apprenticeships.placer.co.uk/jobs",
  },
  {
    title: "RISE Network",
    source: "RISE Network",
    description: "Apprenticeship opportunities via RISE Network (free account needed).",
    href: "https://risenetwork.online/apprenticeships",
  },
];

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <Link href="/" className="font-semibold tracking-[0.26em] text-neutral-100">
        APRNTCSHP
      </Link>
      <nav className="hidden sm:flex items-center gap-5">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="tracking-wide hover:text-neutral-100 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-10 flex items-center justify-between text-[11px] sm:text-xs text-neutral-500">
      <span className="tracking-[0.22em] uppercase text-neutral-400">
        APRNTCSHP
      </span>
      <span>Built for UK students</span>
    </footer>
  );
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          Find Apprenticeships
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
      className="group border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 transition-colors px-5 py-5 text-sm text-neutral-200 flex items-start justify-between gap-4"
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-50">{title}</h3>
        <p className="pt-2 text-xs text-neutral-400">{description}</p>
      </div>
      <ExternalLink
        className="mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300"
        aria-hidden="true"
      />
    </a>
  );
}

export default function FindApprenticeshipsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
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
        <Footer />
      </main>
    </div>
  );
}

