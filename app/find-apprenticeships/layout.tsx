import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Find Apprenticeships",
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
