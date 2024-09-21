import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";

const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});

// Subscribe to store updates and save the state to local storage
store.subscribe(() => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state.habits);
    localStorage.setItem("habitState", serializedState);
  } catch (e) {
    console.warn("Error saving state to localStorage", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
