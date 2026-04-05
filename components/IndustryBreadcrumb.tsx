import Link from "next/link";

export function IndustryBreadcrumb({
  industryLabel,
}: {
  industryLabel: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-2 text-[12px] text-[#444]"
    >
      <Link
        href="/industries"
        className="text-[#444] no-underline transition-colors duration-200 ease hover:text-[#888]"
      >
        Industries
      </Link>
      <span>{` → ${industryLabel}`}</span>
    </nav>
  );
}
