import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import threadSlice from "../slices/threadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    thread: threadSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
