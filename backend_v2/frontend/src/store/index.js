import { configureStore, createSlice } from "@reduxjs/toolkit";
import logger from "redux-logger";
import sessionReducer from "./sessionSlice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
