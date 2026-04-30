import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO & Metadata
export const metadata: Metadata = {
  title: {
    default: "TechBlog - Developer Blog Platform",
    template: "%s | TechBlog",
  },
  description: "A mini developer blog platform showcasing Next.js 16 features",
  keywords: ["nextjs", "react", "blog", "developer"],
  openGraph: {
    title: "TechBlog",
    description: "Next.js 16 POC Project",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
          <p>TechBlog © 2026 — Built with Next.js 16</p>
        </footer>
      </body>
    </html>
  );
}
