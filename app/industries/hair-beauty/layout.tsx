import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Hair & Beauty",
  description:
    "Everything you need to pursue a hair or beauty apprenticeship — guides, hairdressing, barbering, beauty therapy, and tattoo pathways.",
};

export default function HairBeautyIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
