import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactEmail, githubUrl, siteUrl } from "@/lib/brand-assets";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Joshua Sung | Growth & Operations PM";
const siteDescription =
  "Growth PM and Operations PM portfolio focused on business impact, operational ownership, automation, dashboards, and developer collaboration.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Joshua Sung Portfolio",
  },
  description: siteDescription,
  authors: [{ name: "Joshua Sung", url: githubUrl }],
  creator: "Joshua Sung",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Joshua Sung Portfolio",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joshua Sung",
  alternateName: "Jooho Sung",
  url: siteUrl,
  email: `mailto:${contactEmail}`,
  jobTitle: "Growth & Operations PM",
  sameAs: [githubUrl],
  knowsAbout: [
    "Growth PM",
    "Operations PM",
    "Data PM",
    "Workflow automation",
    "AI agent operations",
    "Dashboarding and reporting",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-neutral-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <GoogleTagManager />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
