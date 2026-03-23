"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavbarNavItem = { label: string; href: string };

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarNavLinks({ items }: { items: NavbarNavItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        </nav>
      </div>
    </div>
  );
}
