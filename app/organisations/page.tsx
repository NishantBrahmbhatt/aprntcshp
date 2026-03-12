"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Building2, Calendar, FileText, Mic, Users } from "lucide-react";

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Podcasts", href: "/#podcasts" },
  { label: "Events", href: "/#events" },
  { label: "CV Resources", href: "/#cv-resources" },
  { label: "Communities", href: "/#communities" },
];

const organisations = [
  {
    name: "Equity Ed",
    description:
      "A student-run organisation giving all students access to extracurricular opportunities.",
    url: "https://www.equityed.co.uk/",
    logo: "/logos/equityed2.png",
  },
  {
    name: "WISE Foundation",
    description:
      "Helping students from disadvantaged backgrounds step into pathways they might not otherwise reach.",
    url: "https://www.wizefoundation.com/",
    logo: "/logos/wize.png",
  },
  {
    name: "Amazing Apprenticeships",
    description:
      "Debunking misconceptions around apprenticeships and helping more students access them.",
    url: "https://www.amazingapprenticeships.com/",
    logo: "/logos/amazingapprenticeships.png",
  },
  {
    name: "Black Apprenticeship Network",
    description:
      "Supporting and empowering Black apprentices through networking, career support, and professional development.",
    url: "https://www.blackapprenticenetwork.co.uk/",
    logo: "/logos/ban2.png",
  },
  {
    name: "Apprentease",
    description:
      "Peer-led community helping students secure apprenticeships through resources, mentorship, and support.",
    url: "https://discord.com/invite/UXKYgRB6ux",
    logo: "/logos/apprentease.jpg",
  },
  {
    name: "Muslim Apprentice Community",
    description:
      "Community space for Muslim apprentices and aspiring apprentices across the UK.",
    url: "https://www.linkedin.com/company/muslim-apprentice-community/about/",
    logo: "/logos/mac.jpg",
  },
  {
    name: "Mentup",
    description:
      "Mentorship-focused support for UK students looking to break into apprenticeships.",
    url: "https://www.linkedin.com/company/mentup-uk/",
    logo: "/logos/mentup.jpg",
  },
  {
    name: "Arab Asian Network",
    description:
      "Network connecting Asian and Arab apprentices and students exploring apprenticeship routes.",
    url: "https://www.linkedin.com/company/asianarabnetwork/",
    logo: "/logos/aan.jpg",
  },
  {
    name: "Investate",
    description:
      "Student-led initiative introducing young people to investing, finance, and related pathways.",
    url: "https://www.linkedin.com/company/investate-uk/posts/?feedView=all",
    logo: "/logos/investate.jpg",
  },
  {
    name: "Hindu Apprentice Network",
    description:
      "Supporting Hindu apprentices and students considering apprenticeship pathways in the UK.",
    url: "https://www.linkedin.com/in/hindu-apprentice-network-uk-7874a338b/",
    logo: "/logos/han.jpg",
  },
  {
    name: "Apprentilink",
    description:
      "Connecting students to apprenticeship opportunities and communities across the UK.",
    url: "https://www.allapprenticenetwork.co.uk/?utm_source=chatgpt.com",
    logo: "/logos/apprentilink.jpg",
  },
  {
    name: "Apprentadream",
    description:
      "Helping students plan, apply for, and secure apprenticeships with practical guidance.",
    url: "https://www.apprentadream.co.uk/",
    logo: "/logos/ad.png",
  },
  {
    name: "Women in Apprenticeships Network",
    description:
      "Network focused on supporting women in apprenticeships through community and resources.",
    url: "https://www.womeninapprenticeshipsnetwork.org/",
    logo: "/logos/wian.png",
  },
  {
    name: "Success at School",
    description:
      "Careers platform helping students explore options, including apprenticeships, after school.",
    url: "https://www.successatschool.org",
    logo: "/logos/sas.png",
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
      <div className="font-semibold tracking-[0.26em] text-neutral-100">
        APRNTCSHP
      </div>
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
  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {organisations.map((org) => (
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
            <ExternalLink className="mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function OrganisationsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 sm:py-8 md:py-10">
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

