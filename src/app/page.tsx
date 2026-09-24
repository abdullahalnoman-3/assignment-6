"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 mt-10 mb-20">
        <div className="bg-[#1a1a1a] rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-16 relative overflow-hidden">
          <div className="z-10 max-w-lg">
            <p className="text-[#ccff00] text-sm font-bold tracking-widest uppercase mb-4">Workout Library</p>
            <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[1.1] mb-6 break-words hyphens-auto">
              Train with intent. <br /> Log every set.
            </h1>
            <p className="text-gray-400 mb-8 text-lg">
              FitLog is a dark, no-nonsense gym companion.
            </p>
            <a href="#library" className="inline-block bg-[#ccff00] text-black font-bold py-3 px-8 rounded-md uppercase tracking-wider hover:bg-[#aacc00] transition">
              Browse Workouts
            </a>
          </div>
          <div className="mt-10 md:mt-0 relative right-0 w-64 h-64 md:w-80 md:h-80 md:absolute md:right-10 flex items-center justify-center">
            <img src="/banner.png" alt="Fitness Banner" className="w-full h-full object-contain drop-shadow-2xl opacity-90" />
          </div>
        </div>
      </section>
    </div>
  );
}
