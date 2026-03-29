import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Construction, Architecture & the Built Environment",
  description:
    "Everything you need to pursue a construction or architecture apprenticeship — guides, architecture and design, trades, electrical, gas, and property pathways.",
};

export default function ConstructionIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
