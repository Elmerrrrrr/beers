import { configureStore } from "@reduxjs/toolkit";
import beerReducer from "./beerSlice";

export const store = configureStore({
  reducer: {
    allBeers: beerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
