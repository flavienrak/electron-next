import { createSlice } from "@reduxjs/toolkit";
const initialState = { authToken: "", theme: "green" };

const persistSlice = createSlice({
  name: "persistInfos",
  initialState,
  reducers: {
    updatePersistInfos: (state, action) => {
      const { authToken, theme } = action.payload;
      let newState = { ...state };
      if (typeof authToken !== "undefined") {
        newState.authToken = authToken;
      }
      if (theme) {
        newState.theme = theme;
      }
      return newState;
    },
  },
});

export const { updatePersistInfos } = persistSlice.actions;
export default persistSlice.reducer;
