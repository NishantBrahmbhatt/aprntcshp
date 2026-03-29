import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Engineering",
  description:
    "Everything you need to pursue an engineering apprenticeship — aerospace, civil, electrical, marine, manufacturing, and inspiration from apprentices.",
};

export default function EngineeringIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
