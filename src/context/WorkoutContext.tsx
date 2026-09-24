"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

export interface Workout {
  id: string | number;
  [key: string]: any; 
}

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {

  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedSaved = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedSaved) setSaved(JSON.parse(savedSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("You can only have 5 lifts in today's plan.");
      return;
    }
    const exists = plan.find((w) => w.id === workout.id);
    if (!exists) {
      setPlan([...plan, workout]);
      toast.success("Added to today's plan!");
    } else {
      toast.error("Already in today's plan!");
    }
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.error("Removed from plan.");
  };

  const markAsDone = (id: string | number) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Workout marked as done!");
  };

  const addToSaved = (workout: Workout) => {
    const exists = saved.find((w) => w.id === workout.id);
    if (!exists) {
      setSaved([...saved, workout]);
      toast.success("Saved for later!");
    } else {
      toast.error("Already saved!");
    }
  };

  const removeFromSaved = (id: string | number) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.error("Removed from saved.");
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        markAsDone,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
