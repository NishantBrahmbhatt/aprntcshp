import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Sales, Marketing & Procurement",
  description:
    "Everything you need to pursue a sales, marketing or procurement apprenticeship — guides, marketing, sales, and customer service & HR pathways.",
};

export default function SalesMarketingIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
