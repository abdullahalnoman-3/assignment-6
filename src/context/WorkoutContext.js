"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedList = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
  }, []);

  const addToPlan = (workout) => {
    if (!plan.find(w => w.id === workout.id)) {
      const newPlan = [...plan, workout];
      setPlan(newPlan);
      localStorage.setItem("fitlog_plan", JSON.stringify(newPlan));
      toast.success("Added to today's plan!");
    } else {
      toast.error("Already in plan!");
    }
  };

  const addToSaved = (workout) => {
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

export const useWorkout = () => useContext(WorkoutContext);
