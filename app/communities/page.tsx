"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const navItems = [
  { label: "Organisations", href: "/organisations" },
  { label: "Find Apprenticeships", href: "/find-apprenticeships" },
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
    logo: "/logos/hinduapprenticeshipsnetworklogo.jpg",
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
    logo: "/logos/mentuplogo.jpg",
  },
  {
    name: "Muslim Apprentice Community",
    description:
      "Community space for Muslim apprentices and aspiring apprentices across the UK.",
    url: "https://www.linkedin.com/company/muslim-apprentice-community/about/",
    logo: "/logos/muslim_apprentice_community_logo.jpg",
  },
  {
    name: "Women in Apprenticeships Network",
    description:
      "Network focused on supporting women in apprenticeships through community and resources.",
    url: "https://www.womeninapprenticeshipsnetwork.org/",
    logo: "/logos/womeninapprenticeshipsnetworklogo.png",
  },
  {
    name: "Apprenticeship Insider",
    description:
      "Resource helping students research apprenticeship schemes and opportunities in detail.",
    url: "https://sumptuous-book-021.notion.site/The-Apprenticeship-Insider-Database-fef90e89b2484b48a5d35af8c8e226c3",
    logo: "/logos/apprenticeshipinsider.png",
  },
  {
    name: "LACE Network",
    description:
      "Network supporting LGBTQ+ apprentices and allies across the UK.",
    url: "https://linktr.ee/LACENetwork",
    logo: "/logos/lacenetworklogo.jpg",
  },
  {
    name: "Leaf Pathways",
    description:
      "Pathways and support for young people exploring apprenticeships and early careers.",
    url: "https://leafpathways.com/",
    logo: "/logos/leaf_pathways_logo.jpg",
  },
  {
    name: "Apprentice Living",
    description:
      "Community supporting apprentices through their journey.",
    url: "https://www.linkedin.com/company/apprenticeliving/",
    logo: "/logos/apprenticeliving.jpg",
  },
  {
    name: "RISE Network",
    description:
      "Community connecting students with apprenticeship opportunities.",
    url: "https://risenetwork.online/",
    logo: "/logos/risenetwork.jpg",
  },
  {
    name: "Muslim Apprentice Network",
    description:
      "Supporting Muslim students exploring apprenticeship pathways.",
    url: "https://muslimapprenticenetwork.com/",
    logo: "/logos/muslim_apprentice_network_logo.png",
  },
  {
    name: "Association of Muslim Apprentices",
    description:
      "Organisation supporting Muslim apprentices professionally and personally.",
    url: "https://www.linkedin.com/company/association-of-muslim-apprentices/",
    logo: "/logos/theassociationofmuslimapprenticeslogo.png",
  },
  {
    name: "NetworKING",
    description:
      "Networking community for apprentices across the UK.",
    url: "https://www.networkinguk.com/index.php",
    logo: "/logos/networkinguk_logo.jpg",
  },
  {
    name: "Ellavate",
    description:
      "Community empowering young women in apprenticeships.",
    url: "https://www.linkedin.com/company/3llavate/posts/",
    logo: "/logos/ellavatelogo.jpg",
  },
  {
    name: "Legally Apprentice",
    description:
      "Community for students pursuing legal apprenticeships.",
    url: "https://www.linkedin.com/company/legally-apprentice/about/",
    logo: "/logos/legally_apprentice_logo.jpg",
  },
  {
    name: "MyLaunchpad",
    description:
      "Platform helping young people launch their careers through apprenticeships.",
    url: "https://www.linkedin.com/company/mylaunchpaduk/",
    logo: "/logos/mylaunchpaduk_logo.jpg",
  },
  {
    name: "Apprentice Alliance",
    description:
      "Alliance connecting apprentices and employers across the UK.",
    url: "https://www.linkedin.com/company/apprentice-alliance/",
    logo: "/logos/apprenticealliancelogo.jpg",
  },
  {
    name: "Talentix",
    description:
      "Connecting young people with employers, training, and career opportunities.",
    url: "https://talentix.co.uk/home",
    logo: "/logos/talentix_logo.jpg",
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
      <Link
        href="/"
        className={`${orbitron.className} font-semibold tracking-[0.26em] text-neutral-100`}
      >
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
          Communities
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
          Peer networks and communities to support you through your apprenticeship journey.
        </p>
      </div>
    </section>
  );
}

function CommunitiesGrid({ searchTerm }: { searchTerm: string }) {
  const sortedCommunities = [...communities].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  const trimmedQuery = searchTerm.trim().toLowerCase();
  const filteredCommunities = trimmedQuery
    ? sortedCommunities.filter((org) => {
        const name = org.name.toLowerCase();
        const description = org.description.toLowerCase();
        return name.includes(trimmedQuery) || description.includes(trimmedQuery);
      })
    : sortedCommunities;

  return (
    <section className="space-y-4">
      <div className="grid gap-5 md:grid-cols-2">
        {filteredCommunities.map((org) => (
          <a
            key={org.name}
            href={org.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-[box-shadow,border-color] duration-300 ease hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 flex items-start justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <PageHeader />
          <div className="pb-6">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search communities..."
              className="w-full max-w-2xl rounded-lg bg-[#111] border border-[#333] px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-[#666] focus:shadow-[0_0_0_1px_#444] transition-colors"
            />
          </div>
          <CommunitiesGrid searchTerm={searchTerm} />
        </div>
        <Footer />
      </main>
    </div>
  );
}

