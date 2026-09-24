"use client";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
 
  const { plan, saved } = useWorkout();

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#333] bg-[#121212] w-full">
      <Link href="/" className="flex items-center gap-2 text-white font-oswald text-xl font-bold uppercase tracking-wider">
        <img src="/logo.png" alt="FitLog Logo" className="h-6 w-6 object-contain" />
        FITLOG
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/my-plan" className="flex items-center gap-2 text-sm font-medium hover:text-[#ccff00] transition">
          Plan <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ccff00] text-black">{plan?.length || 0}</span>
        </Link>
        <Link href="/my-plan?tab=saved" className="flex items-center gap-2 text-sm font-medium hover:text-[#ccff00] transition">
          Saved <span className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-500 text-gray-300">{saved?.length || 0}</span>
        </Link>
      </div>
    </nav>
  );
}
