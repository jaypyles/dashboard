import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IntegrationsState {
  integrations: string[];
}

const initialState: IntegrationsState = {
  integrations: [],
};

const integrationsSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
    setIntegrations: (state, action: PayloadAction<string[]>) => {
      state.integrations = action.payload;
    },
  },
});

export const { setIntegrations } = integrationsSlice.actions;

export default integrationsSlice.reducer;
