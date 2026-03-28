import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Finance",
  description:
    "Everything you need to pursue a finance apprenticeship — resources for banking, accounting, insurance, and communities.",
};

export default function FinanceIndustryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
