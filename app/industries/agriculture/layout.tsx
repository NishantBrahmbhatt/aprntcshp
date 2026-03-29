import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Agriculture, Environmental & Animal Care",
  description:
    "Everything you need to pursue an agriculture, environmental or animal care apprenticeship — guides, sustainability, horticulture, and animal pathways.",
};

export default function AgricultureIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
