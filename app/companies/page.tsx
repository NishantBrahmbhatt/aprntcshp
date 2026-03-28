"use client";

import { useCallback, useRef, useState } from "react";
import { useRegisterSiteSearch } from "@/components/KeyboardShortcutsProvider";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { Orbitron } from "next/font/google";
import { companies } from "@/lib/data/companies";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "Companies", href: "/companies" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="mt-0.5 h-10 w-10 min-w-10 bg-neutral-800 overflow-hidden" />
    );
  }

  return (
    <div className="mt-0.5 h-10 w-10 min-w-10 bg-neutral-900 flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="w-full h-full object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <NavbarLogo orbitronClassName={orbitron.className} />
      <NavbarNavLinks items={navItems} />
    </header>
  );
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
            Companies
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Explore apprenticeship opportunities at leading UK employers.
        </p>
      </div>
    </section>
  );
}

function CompaniesGrid({ searchTerm }: { searchTerm: string }) {
  const sorted = [...companies].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  const trimmedQuery = searchTerm.trim().toLowerCase();
  const filtered = trimmedQuery
    ? sorted.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    : sorted;

  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-[14px] md:p-5 text-sm text-neutral-200 flex items-start justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
          >
            <div className="flex items-start gap-4">
              <CompanyLogo src={c.logo} alt={c.name} />
              <div>
                <h2 className="text-base font-semibold text-neutral-50">
                  {c.name}
                </h2>
              </div>
            </div>
            <ExternalLink
              className="hidden md:block mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const clearSearch = useCallback(() => setSearchTerm(""), []);
  useRegisterSiteSearch(searchInputRef, clearSearch);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />
          <div className="pb-6">
            <div className="relative w-full max-w-2xl">
              <input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies..."
                className={`w-full bg-[#111] border border-[#333] rounded-[8px] py-3 pl-4 text-neutral-100 placeholder:text-[#444] transition-[border-color] duration-300 ease focus:border-[#666] focus:shadow-[0_0_0_1px_#444] focus:outline-none ${searchTerm ? "pr-10" : "pr-4"}`}
              />
              {searchTerm ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-0 top-0 flex h-full items-center px-3 text-sm leading-none text-neutral-500 transition-[color] duration-200 ease hover:text-neutral-300"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>
          <CompaniesGrid searchTerm={searchTerm} />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
