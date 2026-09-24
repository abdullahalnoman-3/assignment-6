"use client";

import { useEffect, useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Bookmark, CalendarPlus } from "lucide-react";
import { useParams } from "next/navigation";

export default function WorkoutDetail() {
  const params = useParams();
  const { id } = params;
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // @ts-ignore
  const { addToPlan, addToSaved, plan, saved } = useWorkout();

  const isAddedToPlan = plan?.some((w: any) => w.id === workout?.id) || false;
  const isAddedToSaved = saved?.some((w: any) => w.id === workout?.id) || false;

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <img src="/logo.png" alt="Loading..." className="h-16 w-16 animate-pulse object-contain" />
        <p className="mt-4 text-[#ccff00] font-bold tracking-widest uppercase text-sm">Loading...</p>
      </div>
    );
  }

  if (!workout) {
    return <div className="text-center py-20 text-xl font-bold">Workout not found.</div>;
  }

  return (
    <div className="w-full px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Image */}
        <div className="rounded-2xl overflow-hidden bg-[#1e1e1e] flex items-center justify-center">
          <img 
            src={workout.image || workout.thumbnail || "https://placehold.co/800x800/2a2a2a/ffffff?text=Workout"} 
            alt={workout.title || workout.name} 
            className="w-full h-full object-cover max-h-[600px]"
          />
        </div>

        {/* Right Side - Details */}
        <div>
          <h1 className="font-oswald text-4xl font-bold uppercase mb-4">{workout.title || workout.name}</h1>
          
          <p className="text-gray-400 mb-6 text-lg">
            {workout.description || "A solid compound movement that builds strength and power from a stable position."}
          </p>

          <div className="flex gap-2 mb-8">
            {(workout.muscleGroups || []).map((tag: string, i: number) => (
              <span key={i} className="bg-[#ccff00] text-black text-sm font-medium px-4 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#1e1e1e] rounded-xl border border-[#333] mb-8 divide-y divide-[#333] w-full table-fixed">
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">EQUIPMENT</span>
              <span className="text-right break-words w-2/3">{workout.equipment || "Bodyweight"}</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">DIFFICULTY</span>
              <span className="text-right break-words w-2/3">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">SETS</span>
              <span className="text-right break-words w-2/3">{workout.sets || "4"}</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">REPS</span>
              <span className="text-right break-words w-2/3">{workout.reps || "8-12"}</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">DURATION</span>
              <span className="text-right break-words w-2/3">{workout.duration || "20"} min</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">CALORIES</span>
              <span className="text-right break-words w-2/3">{workout.caloriesBurned || "150"} kcal</span>
            </div>
            <div className="flex justify-between items-center p-4 text-sm gap-2">
              <span className="text-gray-500 font-bold tracking-wider shrink-0 w-1/3">RATING</span>
              <span className="text-right break-words w-2/3">{workout.rating || "4.5"}</span>
            </div>
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mb-8">
              <h2 className="font-oswald text-xl font-bold mb-4 tracking-widest">INSTRUCTIONS</h2>
              <ol className="list-decimal list-outside pl-5 text-gray-300 space-y-3">
                {workout.instructions.map((step: string, i: number) => (
                  <li key={i} className="pl-2">{step}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => { if (!isAddedToPlan && !isAddedToSaved) addToPlan(workout); }}
              disabled={isAddedToPlan || isAddedToSaved}
              className={`flex-1 font-bold py-3 px-6 rounded-md flex justify-center items-center gap-2 transition ${isAddedToPlan || isAddedToSaved ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-[#ccff00] text-black hover:bg-[#aacc00]"}`}
            >
              <CalendarPlus size={20} />
              {isAddedToPlan ? "Added to Plan" : "Add to today's plan"}
            </button>
            <button 
              onClick={() => { if (!isAddedToPlan && !isAddedToSaved) addToSaved(workout); }}
              disabled={isAddedToPlan || isAddedToSaved}
              className={`flex-1 border font-bold py-3 px-6 rounded-md flex justify-center items-center gap-2 transition ${isAddedToPlan || isAddedToSaved ? "bg-[#1a1a1a] border-[#333] text-gray-500 cursor-not-allowed" : "bg-transparent border-gray-500 text-white hover:bg-[#2a2a2a]"}`}
            >
              <Bookmark size={20} />
              {isAddedToSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
