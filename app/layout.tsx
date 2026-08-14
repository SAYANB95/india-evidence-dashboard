import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { VisitorTracker } from "./visitor-counter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://india-evidence-dashboard-public.vercel.app"),
  title: "India Evidence Dashboard — What can be proved",
  description:
    "A politically neutral, source-linked prototype for tracking public commitments, spending, services and outcomes across India.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: { title: "India Evidence Dashboard", description: "What changed. What can be proved across every Indian state and union territory.", type: "website", locale: "en_IN" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><a className="skip-link" href="#main-content">Skip to main content</a><ClerkProvider><VisitorTracker /><div id="main-content">{children}</div></ClerkProvider></body>
    </html>
  );
}
