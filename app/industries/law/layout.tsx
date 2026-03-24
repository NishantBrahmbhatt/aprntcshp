import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Law",
  description:
    "Everything you need to pursue a legal apprenticeship — leading firms, organisations, resources, and blogs.",
};

export default function LawIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
