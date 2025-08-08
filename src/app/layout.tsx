import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Moataz Al-Shater - Software Engineer Portfolio",
  description:
    "Portfolio of Moataz Al-Shater, an aspiring Software Engineer specializing in AI, machine learning, and full-stack development. Showcasing projects in React, Flutter, and backend technologies.",
  keywords:
    "Moataz Al-Shater, Software Engineer, Portfolio, React, Flutter, AI, Machine Learning, Full Stack Developer",
  authors: [{ name: "Moataz Al-Shater" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
