import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog",
  description: "A dark gym companion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#121212] overflow-x-hidden w-full">
      <body className={`${inter.variable} ${oswald.variable} antialiased min-h-screen flex flex-col font-sans overflow-x-hidden w-full`}>
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
            
          </main>
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
        </WorkoutProvider>
      </body>
    </html>
  );
}
