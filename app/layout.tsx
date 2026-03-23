import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/CustomCursor";
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
  title: "APRNTCSHP/Home",
  description:
    "Free hub gathering every UK apprenticeship resource in one place. Find organisations, communities, CV templates, and job boards — so you can spend less time searching and more time applying.",
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "APRNTCSHP",
  },
  icons: {
    apple: "/aprntcshp_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#0a0a0a" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="relative z-10">
          <KeyboardShortcutsProvider>{children}</KeyboardShortcutsProvider>
        </div>
        <CursorGlow />
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}
