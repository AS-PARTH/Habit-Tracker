import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completeDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
}

const loadFromLocalStorage = (): HabitState => {
  try {
    const serializedState = localStorage.getItem("habitState");
    if (serializedState === null) {
      return { habits: [] };
    }
    return JSON.parse(serializedState) as HabitState;
  } catch (e) {
    console.warn("Error loading habits from localStorage", e);
    return { habits: [] };
  }
};

const saveToLocalStorage = (state: HabitState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("habitState", serializedState);
  } catch (e) {
    console.warn("Error saving habits to localStorage", e);
  }
};

const initialState: HabitState = loadFromLocalStorage();

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completeDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.unshift(newHabit);
      saveToLocalStorage(state);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.completeDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completeDates.splice(index, 1);
        } else {
          habit.completeDates.push(action.payload.date);
        }
      }
      saveToLocalStorage(state);
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((e) => e.id !== action.payload.id);
      saveToLocalStorage(state);
    },
  },
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
