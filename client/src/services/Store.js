import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/Authslice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});