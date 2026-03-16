"use client";

import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Podcasts", href: "/#podcasts" },
  { label: "Events", href: "/#events" },
  { label: "CV Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

const templates = [
  {
    name: "Techacademia Technical CV",
    description: "Clean, technical format suited for tech degree apprenticeships.",
    href: "/resources/CV/CV%20Templates/Tech-Academia-Techncial-CV-Template-.docx",
    download: true,
  },
  {
    name: "Trackr CV Template",
    description: "Simple structured template for general apprenticeship applications.",
    href: "/resources/CV/CV%20Templates/Trackr_CV_Template.docx",
    download: true,
  },
  {
    name: "Jake's Resume",
    description: "Minimal LaTeX template, best for tech roles.",
    href: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    external: true,
  },
];

const cvAdvice = [
  {
    title: "How to Write an Apprenticeship CV",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cv",
  },
  {
    title: "How to Write a Winning CV Without a Degree",
    source: "Not Going to Uni",
    href: "https://notgoingtouni.co.uk/blogs/how-to-write-a-winning-cv-and-cover-letter-without-a-degree",
  },
  {
    title: "How to Write a CV",
    source: "Success at School",
    href: "https://www.successatschool.org/advice/applying-for-jobs/how-to-write-a-cv-updated-for-2024/201",
  },
];

const coverLetters = [
  {
    title: "How to Write an Apprenticeship Cover Letter",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-cover-letter",
  },
  {
    title: "How to Write a Speculative Cover Letter",
    source: "Success at School",
    href: "https://www.successatschool.org/advice/applying-for-jobs/how-to-write-a-speculative-cover-letter/661",
  },
  {
    title: "How to Write an Apprenticeship Personal Statement",
    source: "Higherin",
    href: "https://higherin.com/careers-advice/application-tips/apprenticeship-personal-statement",
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

function SectionDivider() {
  return <div className="border-t border-neutral-800" />;
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          CV Resources
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Everything you need to write a strong apprenticeship application.
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

function DownloadCard({
  name,
  description,
  href,
  download,
}: {
  name: string;
  description: string;
  href: string;
  download?: boolean;
}) {
  return (
    <div className="border border-neutral-800 bg-neutral-950/40 px-5 py-6 text-sm text-neutral-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-10 w-10 bg-neutral-900 flex items-center justify-center">
            <FileText className="h-5 w-5 text-neutral-300" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-neutral-50">{name}</h3>
            <p className="text-xs text-neutral-400">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          {...(download ? { download: "" } : {})}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-neutral-100 tracking-wide transition-colors"
        >
          Download Now
          <ExternalLink className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

function LinkCard({
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
      className="group border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 transition-colors px-5 py-5 text-sm text-neutral-200 flex items-start justify-between gap-4"
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-neutral-50">{title}</h3>
        <p className="text-xs text-neutral-400">{source}</p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300" aria-hidden="true" />
    </a>
  );
}

export default function CvResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />

          <section className="space-y-4 pb-10">
            <SectionHeading title="Templates" />
            <div className="grid gap-5 md:grid-cols-2">
              {templates.map((t) => (
                <DownloadCard
                  key={t.name}
                  name={t.name}
                  description={t.description}
                  href={t.href}
                  download={"download" in t ? t.download : undefined}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section className="space-y-4 py-10">
            <SectionHeading title="Writing Your CV" />
            <div className="grid gap-5 md:grid-cols-2">
              {cvAdvice.map((card) => (
                <LinkCard
                  key={card.href}
                  title={card.title}
                  source={card.source}
                  href={card.href}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          <section className="space-y-4 pt-10">
            <SectionHeading title="Cover Letters & Personal Statements" />
            <div className="grid gap-5 md:grid-cols-2">
              {coverLetters.map((card) => (
                <LinkCard
                  key={card.href}
                  title={card.title}
                  source={card.source}
                  href={card.href}
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

