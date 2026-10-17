import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivam-tiwari.dev"),
  title: {
    default: "Shivam Tiwari - AI Post-Training and IoT Engineer",
    template: "%s | Shivam Tiwari",
  },
  description:
    "Premium interactive portfolio for Shivam Tiwari, an AI post-training associate and CSE IoT engineer building LLM evaluation workflows, full-stack systems, and embedded automation.",
  keywords: [
    "Shivam Tiwari",
    "LLM Post Training",
    "AI Evaluation",
    "IoT Engineer",
    "Next.js Developer",
    "Docker",
    "Raspberry Pi",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    title: "Shivam Tiwari - AI Post-Training and IoT Engineer",
    description:
      "Cinematic portfolio spanning LLM post-training, healthcare software, computer vision, and IoT automation.",
    url: "https://shivam-tiwari.dev",
    siteName: "Shivam Tiwari Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shivam Tiwari portfolio preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Tiwari - AI Post-Training and IoT Engineer",
    description:
      "LLM post-training, full-stack systems, and IoT automation presented as a cinematic portfolio.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
