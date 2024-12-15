import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Integration } from "@/lib/types";

interface IntegrationsState {
  integrations: Integration[];
}

const initialState: IntegrationsState = {
  integrations: [],
};

const integrationsSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
    setIntegrations: (state, action: PayloadAction<Integration[]>) => {
      state.integrations = action.payload;
    },
  },
});

export const { setIntegrations } = integrationsSlice.actions;

export default integrationsSlice.reducer;
