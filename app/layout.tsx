import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Ohmify — Interactive circuit lab",
  description:
    "A serious, sleek interactive lab for exploring electrical circuits — voltage, current, resistance, signal flow, and power, visualized in real time.",
  metadataBase: new URL("https://ohmify.local"),
  openGraph: {
    title: "Ohmify — Interactive circuit lab",
    description:
      "Explore electrical circuits visually. Build, probe, and learn — voltage, current, resistance, signal flow, and power in real time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-bg-base text-ink-primary min-h-screen">
        <SiteHeader />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
