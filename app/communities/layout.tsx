import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apprenticeship Communities UK — APRNTCSHP",
  description:
    "Find peer networks and communities for UK apprentices. From legal to tech, women in apprenticeships to Muslim apprentice networks — all in one place.",
};

export default function CommunitiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
