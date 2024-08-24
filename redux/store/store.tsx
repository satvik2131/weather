import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import weatherDataReducer from "../features/weatherDataSlice";

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// export type WeaatherStatae = ReturnTyp<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
