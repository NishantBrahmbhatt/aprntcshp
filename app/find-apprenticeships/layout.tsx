import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Apprenticeships UK — Every Job Board in One Place — APRNTCSHP",
  description:
    "Every major UK apprenticeship job board and search platform in one place. Stop searching, start applying.",
};

export default function FindApprenticeshipsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
