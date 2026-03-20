import { Building2, FileText, Search, Users } from "lucide-react";
import Link from "next/link";
import { orbitron } from "./layout";

const sectionTiles = [
  { label: "Organisations", Icon: Building2, href: "/organisations" },
  { label: "Find Apprenticeships", Icon: Search, href: "/find-apprenticeships" },
  { label: "CV Resources", Icon: FileText, href: "/cv-resources" },
  { label: "Communities", Icon: Users, href: "/communities" },
];

const sectionCards = [
  {
    label: "Organisations",
    Icon: Building2,
    href: "/organisations",
    description: "Independent organisations supporting UK apprentices",
    count: 21,
  },
  {
    label: "Find Apprenticeships",
    Icon: Search,
    href: "/find-apprenticeships",
    description: "Every major apprenticeship search platform",
    count: 14,
  },
  {
    label: "CV Resources",
    Icon: FileText,
    href: "/cv-resources",
    description: "Templates, guides and advice for your application",
    count: 8,
  },
  {
    label: "Communities",
    Icon: Users,
    href: "/communities",
    description: "Peer networks and communities to join",
    count: 18,
  },
];


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
        {sectionTiles.map((item) => (
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

function SectionDivider() {
  return <div className="mt-10 border-t border-neutral-800" />;
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
            Every apprenticeship resource, in one place.
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
            className="group relative flex flex-col gap-4 rounded-xl bg-neutral-900 border border-neutral-800 p-8 transition-colors hover:bg-neutral-800/60 hover:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
          >
            <div className="flex items-start gap-4">
              <card.Icon
                className="h-6 w-6 text-neutral-200 mt-1"
                aria-hidden="true"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-100">
                    {card.label}
                  </h2>
                  <span className="inline-flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-500">
                    {card.count}
                  </span>
                </div>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1 pt-16 pb-20">
          <HeroSection />
          <SectionDivider />
          <SectionsRow />
        </div>
        <Footer />
      </main>
    </div>
  );
}
