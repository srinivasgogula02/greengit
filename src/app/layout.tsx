import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0d1117",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://greengit.xyz'),
  title: "GreenGit | GitHub Contribution Graph Planner",
  description: "Plan your 2026 GitHub contribution streak visually. Paint your commit history, set goals, and generate a shell script to make it reality.",
  keywords: ["github", "contribution graph", "git art", "planner", "open source", "streak", "2026", "green git", "greengit"],
  authors: [{ name: "GreenGit Team" }],
  openGraph: {
    title: "GreenGit - Design Your GitHub History",
    description: "Visually plan your GitHub contribution graph for 2026. Paint commits and export a script to make it happen.",
    url: "https://greengit.xyz", // Placeholder URL
    siteName: "GreenGit",
    images: [
      {
        url: "/og-image.png", // We don't have this, but standard to include
        width: 1200,
        height: 630,
        alt: "GitCanvas Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenGit - Plan Your 2026 GitHub Streak",
    description: "Design your dream contribution graph and generate the git commands automatically.",
    // images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
