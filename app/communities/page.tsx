"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Podcasts", href: "/#podcasts" },
  { label: "Events", href: "/#events" },
  { label: "CV Resources", href: "/cv-resources" },
  { label: "Communities", href: "/communities" },
];

const communities = [
  {
    name: "Apprentease",
    description:
      "Peer-led community helping students secure apprenticeships through resources, mentorship, and support.",
    url: "https://discord.com/invite/UXKYgRB6ux",
    logo: "/logos/apprentease.jpg",
  },
  {
    name: "Apprentilink",
    description:
      "Connecting students to apprenticeship opportunities and communities across the UK.",
    url: "https://www.allapprenticenetwork.co.uk/?utm_source=chatgpt.com",
    logo: "/logos/apprentilink.jpg",
  },
  {
    name: "Arab Asian Network",
    description:
      "Network connecting Asian and Arab apprentices and students exploring apprenticeship routes.",
    url: "https://www.linkedin.com/company/asianarabnetwork/",
    logo: "/logos/aan.jpg",
  },
  {
    name: "Black Apprenticeship Network",
    description:
      "Supporting and empowering Black apprentices through networking, career support, and professional development.",
    url: "https://www.blackapprenticenetwork.co.uk/",
    logo: "/logos/ban2.png",
  },
  {
    name: "Hindu Apprentice Network",
    description:
      "Supporting Hindu apprentices and students considering apprenticeship pathways in the UK.",
    url: "https://www.linkedin.com/in/hindu-apprentice-network-uk-7874a338b/",
    logo: "/logos/han.jpg",
  },
  {
    name: "Investate",
    description:
      "Student-led initiative introducing young people to investing, finance, and related pathways.",
    url: "https://www.linkedin.com/company/investate-uk/posts/?feedView=all",
    logo: "/logos/investate.jpg",
  },
  {
    name: "Mentup",
    description:
      "Mentorship-focused support for UK students looking to break into apprenticeships.",
    url: "https://www.linkedin.com/company/mentup-uk/",
    logo: "/logos/mentup.jpg",
  },
  {
    name: "Muslim Apprentice Community",
    description:
      "Community space for Muslim apprentices and aspiring apprentices across the UK.",
    url: "https://www.linkedin.com/company/muslim-apprentice-community/about/",
    logo: "/logos/mac.jpg",
  },
  {
    name: "Women in Apprenticeships Network",
    description:
      "Network focused on supporting women in apprenticeships through community and resources.",
    url: "https://www.womeninapprenticeshipsnetwork.org/",
    logo: "/logos/wian.png",
  },
  {
    name: "Apprenticeship Insider",
    description:
      "Resource helping students research apprenticeship schemes and opportunities in detail.",
    url: "https://sumptuous-book-021.notion.site/The-Apprenticeship-Insider-Database-fef90e89b2484b48a5d35af8c8e226c3",
    logo: "/logos/ApprenticeshipInsider.png",
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
          Communities
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Peer networks and communities to support you through your apprenticeship journey.
        </p>
      </div>
    </section>
  );
}

function CommunitiesGrid() {
  const sortedCommunities = [...communities].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {sortedCommunities.map((org) => (
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

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />
          <CommunitiesGrid />
        </div>
        <Footer />
      </main>
    </div>
  );
}

