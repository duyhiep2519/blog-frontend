import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice";
import adminReducer from "./reducer/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
