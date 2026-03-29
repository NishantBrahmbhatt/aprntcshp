import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script id="featurebase-sdk-loader" strategy="afterInteractive">
          {
            '!(function(e,t){const a="featurebase-sdk";function n(){if(!t.getElementById(a)){var e=t.createElement("script");(e.id=a),(e.src="https://do.featurebase.app/js/sdk.js"),t.getElementsByTagName("script")[0].parentNode.insertBefore(e,t.getElementsByTagName("script")[0])}}"function"!=typeof e.Featurebase&&(e.Featurebase=function(){(e.Featurebase.q=e.Featurebase.q||[]).push(arguments)}),"complete"===t.readyState||"interactive"===t.readyState?n():t.addEventListener("DOMContentLoaded",n)})(window,document);'
          }
        </Script>
        <Script id="featurebase-init-feedback" strategy="afterInteractive">
          {
            'window.Featurebase && Featurebase("initialize_feedback_widget", { organization: "aprntcshp", theme: "dark", locale: "en" });'
          }
        </Script>
        <Script id="featurebase-init-changelog" strategy="afterInteractive">
          {`window.Featurebase && Featurebase("init_changelog_widget", {
  organization: "aprntcshp",
  theme: "dark",
  locale: "en",
  changelogCard: {
    enabled: true,
    layout: {
      position: "bottom-right",
      marginBottom: 80,
      marginSide: 20
    },
    theme: {
      borderRadius: 8,
      backgroundColor: "#141414",
      titleColor: "#ffffff",
      descriptionColor: "#888888",
      borderColor: "#2a2a2a"
    }
  },
  popup: { enabled: false },
  dropdown: { enabled: false }
});`}
        </Script>
      </head>
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
