import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APRNTCSHP/Organisations",
  description:
    "Every independent organisation supporting UK apprenticeship applicants, in one place. Free to access, no sign up required.",
};

export default function OrganisationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
