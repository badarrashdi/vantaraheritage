import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar",
  description:
    "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar offer premium residential plots with excellent connectivity, and great investment potential near Garh Ganga.",
  keywords: [
    "Vantara Heritage",
    "Vantara Heritage Garhmukteshwar",
    "Vantara Heritage Plots",
    "Vantara Heritage Plots in Garhmukteshwar",
    "Vantara Heritage Villa Plots",
    "Vantara Heritage Brijghat Garhmukteshwar",
    "Vantara Heritage Plots in Garh Ganga",
    "Plots and Villa in Garhmukteshwar",
  ],
  alternates: {
    canonical: "https://www.vantaraheritage.co.in/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vantaraheritage.co.in/",
    title: "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar",
    description:
      "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar offer premium residential plots with excellent connectivity, and great investment potential.",
    siteName: "Vantara Heritage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar",
    description:
      "Vantara Heritage Plots and Villa in Brijghat Garhmukteshwar offer premium residential plots with excellent connectivity, and great investment potential.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
