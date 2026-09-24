"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star, ChevronDown } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 mt-10 mb-20">
        <div className="bg-[#1a1a1a] rounded-2xl flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-16 relative overflow-hidden">
          <div className="z-10 max-w-lg">
            <p className="text-[#ccff00] text-sm font-bold tracking-widest uppercase mb-4">
              Workout Library
            </p>
            <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[1.1] mb-6 break-words hyphens-auto">
              Train with intent. <br /> Log every set.
            </h1>
            <p className="text-gray-400 mb-8 text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
            <a 
              href="#library" 
              className="inline-block bg-[#ccff00] text-black px-8 py-3 rounded-md font-bold hover:bg-[#aacc00] transition"
            >
              BROWSE WORKOUTS
            </a>
          </div>
          {/* Decorative Image */}
          <div className="mt-10 md:mt-0 relative right-0 w-64 h-64 md:w-80 md:h-80 md:absolute md:right-10 flex items-center justify-center">
            {/* Student might use a simple placeholder image or any static image if they don't have the 3d character */}
            <img src="/banner.png" alt="Gym machine" className="object-contain h-full w-full" onError={(e) => { e.currentTarget.style.display='none' }} />
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="mx-auto max-w-6xl w-full px-4 sm:px-6 mb-20 scroll-mt-10">
        <div className="mb-8">
          <h2 className="font-oswald text-3xl font-bold uppercase mb-2">The Library</h2>
          <p className="text-gray-500">Twelve lifts covering every major muscle group.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <img src="/logo.png" alt="Loading..." className="h-16 w-16 animate-pulse object-contain" />
            <p className="mt-4 text-[#ccff00] font-bold tracking-widest uppercase text-sm">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout: any) => (
              <Link href={`/workout/${workout.id}`} key={workout.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden hover:ring-2 ring-[#ccff00] transition group cursor-pointer border border-[#333]">
                <div className="h-48 overflow-hidden bg-[#2a2a2a]">
                  <img 
                    src={workout.image || workout.thumbnail || "https://placehold.co/600x400/2a2a2a/ffffff?text=Workout"} 
                    alt={workout.title || workout.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {workout.muscleGroups?.map((tag: string, i: number) => (
                      <span key={i} className="bg-[#ccff00] text-black text-xs font-medium px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-oswald text-2xl font-bold uppercase mb-1 break-words hyphens-auto">{workout.title || workout.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 break-words">{workout.equipment}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white pt-2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="text-[#ccff00]" size={16} /> {workout.duration} min</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap"><Flame className="text-[#ccff00]" size={16} /> {workout.caloriesBurned} kcal</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap"><Star className="text-[#ccff00]" size={16} /> {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
