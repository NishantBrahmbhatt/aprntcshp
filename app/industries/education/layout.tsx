import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Education, Teaching & Childcare",
  description:
    "Everything you need to pursue an education, teaching or childcare apprenticeship — guides, teaching, teaching assistant, childcare, and playwork pathways.",
};

export default function EducationIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
