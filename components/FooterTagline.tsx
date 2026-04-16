"use client";

const HREF = "https://www.linkedin.com/in/nishantbrahmbhatt/";

export function FooterTagline() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer select-none no-underline outline-none transition-[color] duration-200 ease hover:text-white"
    >
      Built by Nishant
    </a>
  );
}
