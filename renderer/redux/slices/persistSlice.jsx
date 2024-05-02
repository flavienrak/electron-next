import { createSlice } from "@reduxjs/toolkit";
const initialState = { authToken: null };

const persistSlice = createSlice({
  name: "persistInfos",
  initialState,
  reducers: {
    updatePersistInfos: (state, action) => {
      const { authToken } = action.payload;
      let newState = { ...state };
      if (typeof authToken !== "undefined") {
        newState.authToken = authToken;
      }
      return newState;
    },
  },
});

export const { updatePersistInfos } = persistSlice.actions;
export default persistSlice.reducer;
