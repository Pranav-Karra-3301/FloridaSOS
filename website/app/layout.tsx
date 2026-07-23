import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milton-sos.vercel.app"),
  title: "🌪️ Hurricane Warning Dashboard",
  description:
    "An all-in-one emergency dashboard with real-time hurricane tracking, evacuation alerts, news, and local resources (shelters, hospitals, gas stations, and more). HackPSU Fall 2024 overall winner.",
  openGraph: {
    title: "Hurricane Warning Dashboard",
    description:
      "Real-time hurricane tracking, evacuation alerts, and local emergency resources in one dashboard.",
    type: "website",
    images: [
      {
        url: '/sat.gif',
        width: 1200,
        height: 630,
        alt: 'Hurricane Warning Dashboard',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hurricane Warning Dashboard",
    description:
      "Real-time hurricane tracking, evacuation alerts, and local emergency resources in one dashboard.",
    images: ['/sat.gif'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/sat.gif" />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
