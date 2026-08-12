import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "India Evidence Dashboard — What can be proved",
  description:
    "A politically neutral, source-linked prototype for tracking public commitments, spending, services and outcomes across India.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><ClerkProvider>{children}</ClerkProvider></body>
    </html>
  );
}
