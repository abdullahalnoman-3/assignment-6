"use client";

import { useState, useEffect } from "react";
import { useWorkout, Workout } from "@/context/WorkoutContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, X, Clock, Flame, Star, ChevronDown } from "lucide-react";

export default function MyPlan() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState("plan"); 
  const [sortBy, setSortBy] = useState("Duration");

  useEffect(() => {
    if (tabQuery === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("plan");
    }
  }, [tabQuery]);

  const { plan, saved, removeFromPlan, markAsDone, removeFromSaved } = useWorkout();


  const currentList = activeTab === "plan" ? plan : saved;

  const totalExercises = currentList?.length || 0;
  const totalMinutes = currentList?.reduce((acc: number, w: Workout) => acc + (Number(w.duration) || 0), 0) || 0;
  const totalCalories = currentList?.reduce((acc: number, w: Workout) => acc + (Number(w.caloriesBurned) || 0), 0) || 0;

  const sortedList = [...(currentList || [])].sort((a: Workout, b: Workout) => {
    if (sortBy === "Duration") return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    if (sortBy === "Calories") return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    if (sortBy === "Rating") return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 w-full">
      <div className="mb-8">
        <h1 className="font-oswald text-4xl font-bold uppercase mb-2">MY PLAN</h1>
        <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-6">
          <p className="text-gray-500 text-sm font-bold tracking-wider mb-2">Exercises</p>
          <p className="text-4xl font-bold text-[#ccff00] font-oswald">{totalExercises}</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-6">
          <p className="text-gray-500 text-sm font-bold tracking-wider mb-2">Minutes</p>
          <p className="text-4xl font-bold font-oswald">{totalMinutes}</p>
        </div>
        <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-6">
          <p className="text-gray-500 text-sm font-bold tracking-wider mb-2">Calories</p>
          <p className="text-4xl font-bold font-oswald">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex bg-[#1e1e1e] rounded-lg p-1 border border-[#333]">
          <button 
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${activeTab === "plan" ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white"}`}
          >
            Today's Plan
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${activeTab === "saved" ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white"}`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Sort By</span>
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#1e1e1e] border border-[#333] text-white py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#ccff00] cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {sortedList.length === 0 ? (
          <div className="border border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center p-20 bg-[#151515]">
            <h3 className="font-oswald text-2xl font-bold uppercase mb-2">NOTHING HERE YET</h3>
            <p className="text-gray-400 mb-6 text-center">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="bg-[#ccff00] text-black font-bold py-2 px-6 rounded-md hover:bg-[#aacc00] transition">
              Go to workouts
            </Link>
          </div>
        ) : (
          sortedList.map((workout: Workout) => (
            <div key={workout.id} className="bg-[#1e1e1e] border border-[#333] rounded-xl flex items-center p-4 gap-6 group hover:border-[#555] transition">
              <div className="w-32 h-20 bg-[#2a2a2a] rounded-lg overflow-hidden shrink-0 hidden sm:block relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={workout.image || workout.thumbnail || "https://placehold.co/400x300/2a2a2a/ffffff?text=Workout"} 
                  alt={workout.title || workout.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-oswald text-xl font-bold uppercase mb-1">{workout.title || workout.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{workout.equipment}</p>
                <div className="flex items-center gap-4 text-xs text-white">
                  <span className="flex items-center gap-1"><Clock className="text-[#ccff00]" size={14} /> {workout.duration} min</span>
                  <span className="flex items-center gap-1"><Flame className="text-[#ccff00]" size={14} /> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star className="text-[#ccff00]" size={14} /> {workout.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link 
                  href={`/workout/${workout.id}`}
                  className="hidden md:block px-4 py-2 border border-[#333] rounded-full text-xs font-bold hover:bg-[#2a2a2a] transition"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button 
                    onClick={() => markAsDone(workout.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-[#ccff00] text-black rounded-full text-xs font-bold hover:bg-[#aacc00] transition"
                  >
                    <Check size={14} /> <span className="hidden sm:inline">Mark as Done</span>
                  </button>
                )}
                <button 
                  onClick={() => activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded-full transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
