"use client";

import Link from "next/link";
import { Menu, Share2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SharePageModal } from "@/components/SharePageModal";

export type NavbarNavItem = { label: string; href: string };

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarNavLinks({ items }: { items: NavbarNavItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative md:contents">
      <button
        type="button"
        className="md:hidden flex size-9 shrink-0 items-center justify-center text-white"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="mobile-primary-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <X className="size-6 text-white" strokeWidth={2} aria-hidden />
        ) : (
          <Menu className="size-6 text-white" strokeWidth={2} aria-hidden />
        )}
      </button>

      <nav className="hidden md:flex items-center gap-5" aria-label="Main">
        {items.map((item) => {
          const active = linkIsActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`tracking-wide transition-colors duration-200 [transition-timing-function:ease] ${
                active ? "text-white" : "text-neutral-400 hover:text-neutral-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          className="flex shrink-0 items-center justify-center text-[#888] transition-colors duration-200 [transition-timing-function:ease] hover:text-neutral-100"
          aria-label="Share this page"
          onClick={() => setShareOpen(true)}
        >
          <Share2 className="size-4" strokeWidth={2} aria-hidden />
        </button>
      </nav>

      <div
        id="mobile-primary-nav"
        className={`md:hidden absolute left-1/2 top-full z-50 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#0f0f0f] transition-[max-height] duration-300 ease-out ${
          menuOpen
            ? "max-h-[min(24rem,80vh)] border-b border-solid border-[#222]"
            : "pointer-events-none max-h-0 border-b-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Main" className="w-full">
          {items.map((item) => {
            const active = linkIsActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block border-b border-solid border-[#1a1a1a] px-6 py-4 text-sm tracking-wide ${
                  active ? "text-white" : "text-neutral-400"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="block w-full border-b border-solid border-[#1a1a1a] px-6 py-4 text-left text-sm tracking-wide text-neutral-400"
            onClick={() => {
              setMenuOpen(false);
              setShareOpen(true);
            }}
          >
            Share
          </button>
        </nav>
      </div>
      <SharePageModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
