import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface LocalityWeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

interface WeatherResponse {
  status: number;
  message: string;
  device_type: number;
  locality_weather_data: LocalityWeatherData;
}

export interface WeatherData {
  cityName: string;
  localityName: string;
  temperature?: number | undefined;
  latitude: number;
  longitude: number;
  rainAccumulation?: number | undefined;
  rainIntensity?: number | undefined;
  humidity?: number | undefined;
  windSpeed?: number | undefined;
  windDirection?: number | undefined;
  pending?: boolean;
  message?: string;
}

const initialState: WeatherData = {
  cityName: "Pune",
  localityName: "Kalyani Nagar (Pune)",
  latitude: 18.546538,
  longitude: 73.906594,
  rainAccumulation: 0,
  rainIntensity: 0,
  humidity: 0,
  windSpeed: 0,
  windDirection: 0,
  pending: true,
  message: "",
};

export const fetchWeather = createAsyncThunk(
  "currentweather",
  async (name, { getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const long = state.weatherData.longitude;
      const lat = state.weatherData.latitude;

      const currentWeather: WeatherResponse = await getWeatherData({
        long: long,
        lat: lat,
      });

      console.log("weather--", currentWeather);

      return currentWeather;
    } catch (e) {
      console.log(e);
    }
  }
);

const getWeatherData = async ({ long, lat }: { long: number; lat: number }) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch(
      `https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=${lat}&longitude=${long}`,
      {
        method: "GET",
        headers: {
          "X-Zomato-Api-Key": apiKey!!,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const WeatherDataSlice = createSlice({
  name: "currentweather/getweather",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<WeatherData>) => {
      state.cityName = action.payload.cityName;
      state.localityName = action.payload.localityName;
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.temperature = action.payload?.locality_weather_data.temperature;
        state.humidity = action.payload?.locality_weather_data.humidity;
        state.rainAccumulation =
          action.payload?.locality_weather_data.rain_accumulation;
        state.rainIntensity =
          action.payload?.locality_weather_data.rain_intensity;
        state.windDirection =
          action.payload?.locality_weather_data.wind_direction;
        state.windSpeed = action.payload?.locality_weather_data.wind_speed;
        state.message = action.payload?.message;
        state.pending = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        // state.weather[0].loading = false;
        console.log(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = WeatherDataSlice.actions;

export default WeatherDataSlice.reducer;
