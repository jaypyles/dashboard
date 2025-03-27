import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "../services/app-config/app-config.types";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("appConfig");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load from localStorage:", e);
    return undefined;
  }
};

const saveToLocalStorage = (state: AppConfig) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appConfig", serializedState);
  } catch (e) {
    console.error("Could not save to localStorage:", e);
  }
};

const initialState: AppConfig = loadFromLocalStorage() || {
  filesUrl: "",
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setAppConfig: (state, action: PayloadAction<AppConfig>) => {
      saveToLocalStorage({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { setAppConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;
