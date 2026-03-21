import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { CursorGlow } from "@/components/CursorGlow";
import { KeyboardShortcutsProvider } from "@/components/KeyboardShortcutsProvider";
import "./globals.css";

export const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APRNTCSHP — Every Apprenticeship Resource in One Place",
  description:
    "Free hub gathering every UK apprenticeship resource in one place. Find organisations, communities, CV templates, and job boards — so you can spend less time searching and more time applying.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative z-10">
          <KeyboardShortcutsProvider>{children}</KeyboardShortcutsProvider>
        </div>
        <CursorGlow />
      </body>
    </html>
  );
}
