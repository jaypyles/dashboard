import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "@/lib/types";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("settings");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load from localStorage:", e);
    return undefined;
  }
};

const saveToLocalStorage = (state: Settings) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("settings", serializedState);
  } catch (e) {
    console.error("Could not save to localStorage:", e);
  }
};

const initialState: Settings = loadFromLocalStorage() || {
  cardColor: "#08080885",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      saveToLocalStorage({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
