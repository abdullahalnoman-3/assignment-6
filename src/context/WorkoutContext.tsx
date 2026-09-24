"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedSaved = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedSaved) setSaved(JSON.parse(savedSaved));
  }, []);

  // Save to localStorage whenever plan or saved changes
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
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

  const removeFromPlan = (id) => {
    setPlan(plan.filter((w) => w.id !== id));
    toast.success("Removed from plan.");
  };

  const markAsDone = (id) => {
    removeFromPlan(id);
    toast.success("Workout marked as done!");
  };

  const addToSaved = (workout) => {
    const exists = saved.find((w) => w.id === workout.id);
    if (!exists) {
      setSaved([...saved, workout]);
      toast.success("Saved for later!");
    } else {
      toast.error("Already saved!");
    }
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((w) => w.id !== id));
    toast.success("Removed from saved.");
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

export const useWorkout = () => useContext(WorkoutContext);
