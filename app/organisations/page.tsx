"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
  { label: "CV Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

const organisations = [
  {
    name: "Amazing Apprenticeships",
    description:
      "Debunking misconceptions around apprenticeships and helping more students access them.",
    url: "https://www.amazingapprenticeships.com/",
    logo: "/logos/amazingapprenticeships.png",
    category: "Organisation",
  },
  {
    name: "Apprentadream",
    description:
      "Helping students plan, apply for, and secure apprenticeships with practical guidance.",
    url: "https://www.apprentadream.co.uk/",
    logo: "/logos/ad.png",
    category: "Organisation",
  },
  {
    name: "Equity Ed",
    description:
      "A student-run organisation giving all students access to extracurricular opportunities.",
    url: "https://www.equityed.co.uk/",
    logo: "/logos/equityed2.png",
    category: "Organisation",
  },
  {
    name: "Success at School",
    description:
      "Careers platform helping students explore options, including apprenticeships, after school.",
    url: "https://www.successatschool.org",
    logo: "/logos/sas.png",
    category: "Organisation",
  },
  {
    name: "WISE Foundation",
    description:
      "Helping students from disadvantaged backgrounds step into pathways they might not otherwise reach.",
    url: "https://www.wizefoundation.com/",
    logo: "/logos/wize.png",
    category: "Organisation",
  },
  {
    name: "Movement to Work",
    description:
      "Connecting young people with employer work experience and apprenticeship opportunities.",
    url: "https://www.mtwplacements.com",
    logo: "/logos/movementtowork.png",
    category: "Organisation",
  },
  {
    name: "Higherin",
    description:
      "Student community with apprenticeship reviews, career advice, and day-in-the-life content.",
    url: "https://higherin.com",
    logo: "/logos/higherin.svg",
    category: "Organisation",
  },
  {
    name: "UCAS",
    description:
      "The UK's official university and apprenticeship application platform with guides and vacancies.",
    url: "https://www.ucas.com/explore/search/apprenticeships",
    logo: "/logos/UCAS.png",
    category: "Organisation",
  },
  {
    name: "Essex Opportunities",
    description:
      "Local hub connecting Essex students with apprenticeship and employment opportunities.",
    url: "https://www.essexopportunities.co.uk/apprenticeship-hub/",
    logo: "/logos/essexopportunities.png",
    category: "Organisation",
  },
  {
    name: "Apprenticeships.gov.uk",
    description:
      "The government's official apprenticeship search and information service.",
    url: "https://www.apprenticeships.gov.uk/apprentices",
    logo: "/logos/apprenticeships.png",
    category: "Organisation",
  },
  {
    name: "Pathway CTM",
    description:
      "Careers and employability programme helping students access apprenticeships, school leaver schemes, and opportunities.",
    url: "https://pathwayctm.com/",
    logo: "/logos/pathwayctm.png",
    category: "Organisation",
  },
  {
    name: "GetMyFirstJob",
    description:
      "Search platform connecting young people with apprenticeship, traineeship, and early careers roles.",
    url: "https://www.getmyfirstjob.co.uk/",
    logo: "/logos/gmfj.png",
    category: "Organisation",
  },
  {
    name: "NotGoingToUni",
    description:
      "Platform highlighting alternatives to traditional university, including apprenticeships, degree apprenticeships, and school leaver routes.",
    url: "https://notgoingtouni.co.uk/",
    logo: "/logos/NGTU.png",
    category: "Organisation",
  },
  {
    name: "GradCracker",
    description:
      "STEM careers platform listing internships, placements, graduate schemes, and degree apprenticeships.",
    url: "https://www.gradcracker.com/search/all-disciplines/degree-apprenticeships",
    logo: "/logos/gradcracker.svg",
    category: "Organisation",
  },
  {
    name: "Apprentice Nation",
    description:
      "Platform supporting apprentices with resources, events, and community.",
    url: "https://apprenticenation.co.uk/",
    logo: "/logos/apprenticenation.png",
    category: "Organisation",
  },
  {
    name: "Placer Apprenticeships",
    description:
      "Search apprenticeship vacancies by location and sector.",
    url: "https://apprenticeships.placer.co.uk/",
    logo: "/logos/placer.png",
    category: "Organisation",
  },
  {
    name: "Sprout",
    description:
      "Apprenticeship tools including AI mock interviews, CV review, and company-specific resources.",
    url: "https://sprout.careers/",
    logo: "/logos/sprout.png",
    category: "Organisation",
  },
  {
    name: "Apprentis",
    description:
      "App-based platform helping students find and apply for apprenticeships.",
    url: "https://www.apprentisapp.com/",
    logo: "/logos/apprentis.png",
    category: "Organisation",
  },
  {
    name: "Apprentatips",
    description:
      "Newsletter sharing tips and advice for apprenticeship applicants.",
    url: "https://apprentatips.beehiiv.com/",
    logo: "/logos/apprentatips.png",
    category: "Organisation",
  },
];

function OrganisationLogo({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <div className="mt-0.5 h-14 w-14 bg-neutral-800" />;
  }

  return (
    <div className="mt-0.5 h-14 w-14 bg-neutral-900 flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="h-14 w-14 object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

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
      <a
        href="https://chat.whatsapp.com/LAbUrTAZ72VKGBpup63Gks"
        target="_blank"
        rel="noreferrer"
        className="tracking-[0.22em] uppercase text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        Suggest a Resource
      </a>
      <span>Built for UK students</span>
    </footer>
  );
}

function PageHeader() {
  return (
    <section className="pt-16 pb-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          Organisations
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Independent organisations working to help UK students access apprenticeships.
        </p>
      </div>
    </section>
  );
}

function OrganisationsGrid() {
  const sortedOrganisations = [...organisations].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {sortedOrganisations.map((org) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noreferrer"
            className="group border-b border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 transition-colors px-5 py-6 sm:px-6 text-sm text-neutral-200 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <OrganisationLogo src={org.logo} alt={org.name} />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-neutral-50">
                  {org.name}
                </h2>
                <p className="text-xs text-neutral-400">{org.description}</p>
              </div>
            </div>
            <ExternalLink
              className="mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function OrganisationsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />
          <OrganisationsGrid />
        </div>
        <Footer />
      </main>
    </div>
  );
}

