import { createSlice } from "@reduxjs/toolkit";
const initialState = { match: [] };

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    fetchMatchInfos: (state, action) => {
      const { match } = action.payload;
      let newState = { ...state };
      newState.match = [match];
      return newState;
    },
    updateMatchInfos: (state, action) => {
      const { match } = action.payload;
      let newState = { ...state };
      const index = newState.match.findIndex((item) => item.id === match.id);

      if (index !== -1) {
        newState.match = [
          ...newState.match.slice(0, index),
          match,
          ...newState.match.slice(index + 1),
        ];
      } else {
        newState.match = [match, ...newState.match];
      }

      return newState;
    },
    removeMatchInfos: () => {
      return initialState;
    },
  },
});

export const { fetchMatchInfos, updateMatchInfos, removeMatchInfos } =
  matchSlice.actions;

export default matchSlice.reducer;
