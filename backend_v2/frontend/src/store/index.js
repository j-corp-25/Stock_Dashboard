import { configureStore, createSlice } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* additional middleware if needed */),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
