import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Apprenticeship CV Templates and Resources UK — APRNTCSHP",
  description:
    "Free CV templates, writing guides, cover letter advice and personal statement help — all written specifically for UK apprenticeship applications.",
};

export default function CvResourcesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
