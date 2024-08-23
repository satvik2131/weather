import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
}

const initialState: LocationState = {
  cityName: "",
  localityName: "",
  localityId: "",
  latitude: 0,
  longitude: 0,
};

export const LocationSearchBarSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = LocationSearchBarSlice.actions;

export default LocationSearchBarSlice.reducer;
