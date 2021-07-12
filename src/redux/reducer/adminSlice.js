import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUsers: [],
};

export const adminSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getListUsers } = adminSlice.actions;

export default adminSlice.reducer;
