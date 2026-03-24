import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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

export const metadata: Metadata = {
  title: "APRNTCSHP/Industries",
  description:
    "Explore UK apprenticeships by industry — sector guides, employers, and resources in one place.",
};

function Navbar() {
  return (
    <header className="flex items-center justify-between text-xs sm:text-sm text-neutral-300">
      <NavbarLogo orbitronClassName={orbitron.className} />
      <NavbarNavLinks items={navItems} />
    </header>
  );
}

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-neutral-50">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:py-8 md:py-10">
        <Navbar />
        <div className="flex-1">
          <section className="pt-16 pb-10">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-50">
                <span className="inline-block pb-1 bg-[linear-gradient(180deg,#ffffff_0%,#707070_100%)] bg-clip-text [-webkit-background-clip:text] text-transparent [-webkit-text-fill-color:transparent]">
                  Industries
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 max-w-2xl">
                Explore apprenticeships by industry.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2">
              <Link
                href="/industries/law"
                className="group relative overflow-hidden border border-[#2a2a2a] bg-[linear-gradient(160deg,#202020_0%,#111_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),_inset_0_0_0_1px_rgba(255,255,255,0.04)] translate-y-0 transition-[transform,box-shadow,border-color] [transition-duration:0.3s,120ms,120ms] [transition-timing-function:ease,cubic-bezier(0.16,1,0.3,1),cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:border-[#383838] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_inset_0_0_0_1px_rgba(255,255,255,0.06)] p-5 text-sm text-neutral-200 flex items-start justify-between gap-4 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[60px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_100%)] before:pointer-events-none"
              >
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-neutral-50">Law</h2>
                  <p className="pt-2 text-xs text-neutral-400">
                    Solicitor apprenticeships, firms, and legal resources.
                  </p>
                </div>
                <ChevronRight
                  className="hidden md:block mt-1 h-4 w-4 text-neutral-500 group-hover:text-neutral-300 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </section>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
