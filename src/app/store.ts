import { configureStore } from "@reduxjs/toolkit";
import integrationsReducer from "@/lib/slices/integrations";

export const store = configureStore({
  reducer: {
    integrations: integrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
