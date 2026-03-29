import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Tech",
  description:
    "Everything you need to pursue a technology apprenticeship — software, data, AI, cyber security, IT roles, work experience, and CV resources.",
};

export default function TechIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
