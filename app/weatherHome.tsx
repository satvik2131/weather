import React from "react";
import { SearchBar } from "./components/searchBar";
import { WeatherDetails } from "./components/weatherDetails";
import { Logo } from "./components/logo";

export const WeatherHome = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-10">
      <Logo />
      <SearchBar />
      <WeatherDetails />
    </div>
  );
};
