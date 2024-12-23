import { configureStore } from "@reduxjs/toolkit";
import integrationsReducer from "@/lib/slices/integrations";
import settingsReducer from "@/lib/slices/settings";

export const store = configureStore({
  reducer: {
    integrations: integrationsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
