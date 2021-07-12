import { createSlice } from "@reduxjs/toolkit";

const saveUserToLocalStorage = (user) => {
  window.localStorage.setItem("token", JSON.stringify(user.token));
  window.localStorage.setItem("user_id", JSON.stringify(user.user_id));
};

const initialState = {
  user: {},
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const user = action.payload;
      saveUserToLocalStorage(user);
      state.isLogin = true;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    getUserRecord: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    signOut: (state) => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, setLogin, getUserRecord, signOut } = userSlice.actions;

export default userSlice.reducer;
