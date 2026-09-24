"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

type Workout = {
  id: string | number;
  [key: string]: any;
};

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedList = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
  }, []);

  const addToPlan = (workout: Workout) => {
    if (!plan.find(w => w.id === workout.id)) {
      const newPlan = [...plan, workout];
      setPlan(newPlan);
      localStorage.setItem("fitlog_plan", JSON.stringify(newPlan));
      toast.success("Added to today's plan!");
    } else {
      toast.error("Already in plan!");
    }
  };

  const addToSaved = (workout: Workout) => {
    if (!saved.find(w => w.id === workout.id)) {
      const newSaved = [...saved, workout];
      setSaved(newSaved);
      localStorage.setItem("fitlog_saved", JSON.stringify(newSaved));
      toast.success("Saved for later!");
    } else {
      toast.error("Already saved!");
    }
  };

  return (
    <WorkoutContext.Provider value={{ plan, saved, addToPlan, addToSaved }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
