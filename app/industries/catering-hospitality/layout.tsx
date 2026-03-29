import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Catering & Hospitality",
  description:
    "Everything you need to pursue a catering or hospitality apprenticeship — guides, events, travel, facilities, and food manufacturing pathways.",
};

export default function CateringHospitalityIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
