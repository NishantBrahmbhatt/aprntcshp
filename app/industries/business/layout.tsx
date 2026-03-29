import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Business & Administration",
  description:
    "Everything you need to pursue a business or administration apprenticeship — guides, degree routes, and opportunities in one place.",
};

export default function BusinessIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
