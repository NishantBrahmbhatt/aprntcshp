import { Building2, Calendar, FileText, Mic, Users } from "lucide-react";

const sectionTiles = [
  { label: "Organisations", Icon: Building2, href: "/organisations" },
  { label: "Podcasts", Icon: Mic, href: "#podcasts" },
  { label: "Events", Icon: Calendar, href: "#events" },
  { label: "CV Resources", Icon: FileText, href: "/cv-resources" },
  { label: "Communities", Icon: Users, href: "#communities" },
];

const organisations = [
  {
    name: "Placeholder Organisation One",
    blurb: "A national provider with entry routes across tech, finance, and more.",
  },
  {
    name: "Placeholder Organisation Two",
    blurb: "Hands-on apprenticeships focused on real client work from day one.",
  },
  {
    name: "Placeholder Organisation Three",
    blurb: "Regional programmes connecting local employers with motivated students.",
  },
  {
    name: "Placeholder Organisation Four",
    blurb: "Online-first apprenticeships designed to fit around college and life.",
  },
];

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <div className="font-semibold tracking-[0.26em] text-neutral-100">
        APRNTCSHP
      </div>
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
    <section className="space-y-7 text-center" id="hero">
      <div className="space-y-4 max-w-2xl mx-auto">
        <p className="text-[10px] font-medium tracking-[0.3em] text-neutral-500 uppercase">
          The UK&apos;s apprenticeship hub
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
          Every apprenticeship resource, in one place.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-neutral-500">
          We surface the UK apprenticeship organisations, resources, and communities that are actually worth your attention.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide text-neutral-50 bg-neutral-900 border border-neutral-600 hover:border-neutral-400 hover:bg-neutral-800 transition-colors">
          Find Organisations
        </button>
        <button className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium tracking-wide text-neutral-200 border border-neutral-700 hover:border-neutral-400 hover:bg-neutral-900 transition-colors">
          Browse Resources
        </button>
      </div>
    </section>
  );
}

function SectionsRow() {
  return (
    <section className="mt-10" id="sections">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {sectionTiles.map((tile) => (
          <div
            key={tile.label}
            className="flex flex-col items-center justify-between px-3 py-4 text-xs sm:text-sm text-neutral-200 min-h-32 transition-colors hover:bg-neutral-900/40"
          >
            <tile.Icon
              className="h-5 w-5 text-neutral-400 mb-3"
              aria-hidden="true"
            />
            <span className="text-neutral-100 text-center">{tile.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section
      className="mt-10 max-w-xl mx-auto text-center text-base sm:text-lg leading-relaxed text-neutral-300"
      id="why"
    >
      <p>
        Apprenticeship resources in the UK are scattered across dozens of
        websites, providers, and half-finished directories. It&apos;s tiring to
        keep track of what&apos;s current, what&apos;s useful, and what&apos;s
        just marketing. This exists to put the genuinely helpful organisations,
        podcasts, events, CV guides, and communities in one quiet, focused
        place.
      </p>
    </section>
  );
}

function OrganisationsPreview() {
  return (
    <section className="mt-12 space-y-4" id="organisations">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium tracking-wide text-neutral-300 uppercase">
          Organisations preview
        </h2>
        <button className="text-xs font-medium text-neutral-400 hover:text-neutral-200 tracking-wide">
          View all
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {organisations.map((org) => (
          <div
            key={org.name}
            className="border border-neutral-800 bg-neutral-950/40 px-5 py-4 text-sm text-neutral-200"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-sm font-semibold text-neutral-100">
                {org.name}
              </h3>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-2 text-xs text-neutral-400">{org.blurb}</p>
          </div>
        ))}
      </div>
    </section>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1 pt-16 pb-20">
          <HeroSection />
          <SectionDivider />
          <SectionsRow />
          <SectionDivider />
          <WhySection />
          <SectionDivider />
          <OrganisationsPreview />
        </div>
        <Footer />
      </main>
    </div>
  );
}
