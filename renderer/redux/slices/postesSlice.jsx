import { createSlice } from "@reduxjs/toolkit";
const initialState = { postes: [] };

const postesSlice = createSlice({
  name: "postes",
  initialState,
  reducers: {
    fetchPostesInfos: (state, action) => {
      const { postes } = action.payload;
      let newState = { ...state };
      newState.postes = postes;
      return newState;
    },
    addPosteInfos: (state, action) => {
      const { poste } = action.payload;
      let newState = { ...state };
      newState.postes = [poste, ...newState.postes];
      return newState;
    },
    updatePosteInfos: (state, action) => {
      const { poste } = action.payload;
      let newState = { ...state };
      newState.postes = newState.postes.filter((item) => item.id !== poste.id);
      newState.postes = [poste, ...newState.postes];
      return newState;
    },
    deletePosteInfos: (state, action) => {
      const { poste } = action.payload;
      let newState = { ...state };
      newState.postes = [
        ...newState.postes.filter((item) => item.id !== poste.id),
      ];
      return newState;
    },
    removePostesInfos: () => {
      return initialState;
    },
  },
});

export const {
  fetchPostesInfos,
  addPosteInfos,
  deletePosteInfos,
  updatePosteInfos,
  removePostesInfos,
} = postesSlice.actions;

export default postesSlice.reducer;
