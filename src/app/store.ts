import { configureStore } from "@reduxjs/toolkit";
import integrationsReducer from "@/lib/slices/integrations";
import settingsReducer from "@/lib/slices/settings";
import appConfigReducer from "@/lib/slices/app-config";

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    integrations: integrationsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
