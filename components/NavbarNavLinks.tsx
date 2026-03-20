"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavbarNavItem = { label: string; href: string };

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarNavLinks({ items }: { items: NavbarNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden sm:flex items-center gap-5">
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
  );
}
