import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#121212] overflow-x-hidden w-full">
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-[#121212] text-white min-h-screen flex flex-col font-sans overflow-x-hidden w-full`}>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
