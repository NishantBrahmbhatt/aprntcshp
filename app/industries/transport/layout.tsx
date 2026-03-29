import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Transport & Logistics",
  description:
    "Everything you need to pursue a transport or logistics apprenticeship — guides, aviation, rail, supply chain, and automotive pathways.",
};

export default function TransportIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
