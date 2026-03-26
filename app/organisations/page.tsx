"use client";

import { useCallback, useRef, useState } from "react";
import { useRegisterSiteSearch } from "@/components/KeyboardShortcutsProvider";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { NavbarLogo } from "@/components/NavbarLogo";
import { NavbarNavLinks } from "@/components/NavbarNavLinks";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

export const organisations = [
  {
    name: "Amazing Apprenticeships",
    description:
      "Debunking misconceptions around apprenticeships and helping more students access them.",
    url: "https://www.amazingapprenticeships.com/",
    logo: "/logos/amazing_apprenticeships_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Equity Ed",
    description:
      "A student-run organisation giving all students access to extracurricular opportunities.",
    url: "https://www.equityed.co.uk/",
    logo: "/logos/equityed_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Equal Opportunity",
    description:
      "Community focused on fair access and opportunity in professional careers.",
    url: "https://www.linkedin.com/company/equalopportunity/",
    logo: "/logos/equalopportunity_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Success at School",
    description:
      "Careers platform helping students explore options, including apprenticeships, after school.",
    url: "https://www.successatschool.org",
    logo: "/logos/success_at_school_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Skills Development Scotland",
    description:
      "Scotland's national skills agency providing career information, advice and guidance.",
    url: "https://www.myworldofwork.co.uk/",
    logo: "/logos/skills_development_scotland_logo.jpg",
    category: "Organisation",
  },
  {
    name: "WIZE Foundation",
    description:
      "Helping students from disadvantaged backgrounds step into pathways they might not otherwise reach.",
    url: "https://www.wizefoundation.com/",
    logo: "/logos/wizefoundation_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Movement to Work",
    description:
      "Connecting young people with employer work experience and apprenticeship opportunities.",
    url: "https://www.mtwplacements.com",
    logo: "/logos/movement_to_work_logo.jpg",
    category: "Organisation",
  },
  {
    name: "My Great First Job",
    description:
      "Connecting young people with jobs, apprenticeships, and early career opportunities.",
    url: "https://www.mygreatfirstjob.com/",
    logo: "/logos/my_great_first_job_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Higherin",
    description:
      "Student community with apprenticeship reviews, career advice, and day-in-the-life content.",
    url: "https://higherin.com",
    logo: "/logos/ratemyapp_ship_logo.jpg",
    category: "Organisation",
  },
  {
    name: "UCAS",
    description:
      "The UK's official university and apprenticeship application platform with guides and vacancies.",
    url: "https://www.ucas.com/explore/search/apprenticeships",
    logo: "/logos/ucas_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Essex Opportunities",
    description:
      "Local hub connecting Essex students with apprenticeship and employment opportunities.",
    url: "https://www.essexopportunities.co.uk/apprenticeship-hub/",
    logo: "/logos/essexopportunitieslogo.png",
    category: "Organisation",
  },
  {
    name: "Apprenticeships.gov.uk",
    description:
      "The government's official apprenticeship search and information service.",
    url: "https://www.apprenticeships.gov.uk/apprentices",
    logo: "/logos/apprenticeshipsgov_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Apprenticeships.scot",
    description:
      "Scotland's national apprenticeship service — information, support, and vacancy search for Scottish apprenticeships.",
    url: "https://www.apprenticeships.scot/",
    logo: "/logos/apprenticeships%20in%20scotland.jpg",
    category: "Organisation",
  },
  {
    name: "Pathway CTM",
    description:
      "Careers and employability programme helping students access apprenticeships, school leaver schemes, and opportunities.",
    url: "https://pathwayctm.com/",
    logo: "/logos/pathwayctm_logo.jpg",
    category: "Organisation",
  },
  {
    name: "GetMyFirstJob",
    description:
      "Search platform connecting young people with apprenticeship, traineeship, and early careers roles.",
    url: "https://www.getmyfirstjob.co.uk/",
    logo: "/logos/getmyfirstjob_logo.jpg",
    category: "Organisation",
  },
  {
    name: "NotGoingToUni",
    description:
      "Platform highlighting alternatives to traditional university, including apprenticeships, degree apprenticeships, and school leaver routes.",
    url: "https://notgoingtouni.co.uk/",
    logo: "/logos/notgoingtounicouk_logo.jpg",
    category: "Organisation",
  },
  {
    name: "GradCracker",
    description:
      "STEM careers platform listing internships, placements, graduate schemes, and degree apprenticeships.",
    url: "https://www.gradcracker.com/search/all-disciplines/degree-apprenticeships",
    logo: "/logos/gradcracker_ltd_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Apprentice Nation",
    description:
      "Platform supporting apprentices with resources, events, and community.",
    url: "https://apprenticenation.co.uk/",
    logo: "/logos/apprenticenation_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Placer Apprenticeships",
    description:
      "Search apprenticeship vacancies by location and sector.",
    url: "https://apprenticeships.placer.co.uk/",
    logo: "/logos/placer_apprenticeships_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Sprout",
    description:
      "Apprenticeship tools including AI mock interviews, CV review, and company-specific resources.",
    url: "https://sprout.careers/",
    logo: "/logos/sproutcareer_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Apprentis",
    description:
      "App-based platform helping students find and apply for apprenticeships.",
    url: "https://www.apprentisapp.com/",
    logo: "/logos/apprentis_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Apprentatips",
    description:
      "Newsletter sharing tips and advice for apprenticeship applicants.",
    url: "https://apprentatips.beehiiv.com/",
    logo: "/logos/apprentatipslogo.jpg",
    category: "Organisation",
  },
  {
    name: "Talentix",
    description:
      "Connecting young people with employers, training, and career opportunities.",
    url: "https://talentix.co.uk/home",
    logo: "/logos/talentix_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Opportune.fyi",
    description:
      "Early careers platform sharing opportunities, insights, and resources for students and apprentices.",
    url: "https://www.linkedin.com/company/opportune-fyi/",
    logo: "/logos/opportune_fyi_logo.jpg",
    category: "Organisation",
  },
  {
    name: "The Apprenticeship Guide",
    description:
      "Guide and information hub helping students explore apprenticeship routes across the UK.",
    url: "https://apprenticeshipguide.co.uk/",
    logo: "/logos/the_apprenticeship_guide_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Prospects",
    description:
      "Careers guidance site with apprenticeship advice, resources, and pathway information.",
    url: "https://www.prospects.ac.uk/jobs-and-work-experience/apprenticeships/",
    logo: "/logos/prospects_ac_uk_logo.jpg",
    category: "Organisation",
  },
  {
    name: "Best Apprenticeships",
    description:
      "Browse and compare apprenticeship opportunities by employer, sector and location.",
    url: "https://www.bestapprenticeships.com/",
    logo: "/logos/best_apprenticeships_logo.jpg",
    category: "Organisation",
  },
  {
    name: "LegalCheek",
    description:
      "Legal careers news, insight and resources for students exploring law and training contracts.",
    url: "https://www.legalcheek.com/",
    logo: "/logos/legal_cheek_logo.jpg",
    category: "Organisation",
  },
  {
    name: "The Mentors Collective",
    description:
      "Community connecting mentors and mentees with guidance for early careers and professional growth.",
    url: "https://www.linkedin.com/company/thementorscollective/",
    logo: "/logos/the_mentors_collective_logo.jpg",
    category: "Organisation",
  },
];

function OrganisationLogo({ src, alt }: { src: string; alt: string }) {
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
            Organisations
          </span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Independent organisations working to help UK students access apprenticeships.
        </p>
      </div>
    </section>
  );
}

function OrganisationsGrid({ searchTerm }: { searchTerm: string }) {
  const sortedOrganisations = [...organisations].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  const trimmedQuery = searchTerm.trim().toLowerCase();
  const filteredOrganisations = trimmedQuery
    ? sortedOrganisations.filter((org) => {
        const name = org.name.toLowerCase();
        const description = org.description.toLowerCase();
        return name.includes(trimmedQuery) || description.includes(trimmedQuery);
      })
    : sortedOrganisations;

  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {filteredOrganisations.map((org) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 flex items-start justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
          >
            <div className="flex items-start gap-4">
              <OrganisationLogo src={org.logo} alt={org.name} />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-neutral-50">
                  {org.name}
                </h2>
                <p className="text-xs text-neutral-400">{org.description}</p>
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

export default function OrganisationsPage() {
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
                placeholder="Search organisations..."
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
          <OrganisationsGrid searchTerm={searchTerm} />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}

