"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  // @ts-ignore
  const { plan, saved } = useWorkout();

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#333] bg-[#121212] w-full">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-white font-oswald text-xl font-bold uppercase tracking-wider">
        <img src="/logo.png" alt="FitLog Logo" className="h-6 w-6 object-contain" />
        FitLog
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <Link 
          href="/" 
          className={`hover:text-white transition-colors ${pathname === "/" ? "text-[#ccff00]" : ""}`}
        >
          Workouts
        </Link>
        <Link 
          href="/my-plan" 
          className={`hover:text-white transition-colors py-1 px-4 rounded-full ${pathname === "/my-plan" ? "bg-[#1e1e1e] text-[#ccff00]" : ""}`}
        >
          My Plan
        </Link>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-4 text-xs font-medium">
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          Plan 
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ccff00] text-black">
            {plan?.length || 0}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          Saved 
          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-500 text-gray-300">
            {saved?.length || 0}
          </span>
        </Link>
      </div>
    </nav>
  );
}
