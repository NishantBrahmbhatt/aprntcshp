import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Companies",
  description:
    "Explore apprenticeship opportunities at leading UK employers — guides and links in one place.",
};

export default function CompaniesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
