import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Creative",
  description:
    "Everything you need to pursue a creative apprenticeship — media, design, fashion, and heritage pathways.",
};

export default function CreativeIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
