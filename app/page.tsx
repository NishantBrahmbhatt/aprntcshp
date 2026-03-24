import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "APRNTCSHP/Home",
  description:
    "Free hub gathering every UK apprenticeship resource in one place. Find organisations, communities, CV templates, and job boards — so you can spend less time searching and more time applying.",
};

export default function Home() {
  return <HomePageClient />;
}
