"use client";
import { fetchWeather } from "@/redux/features/weatherDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { BiSmile } from "react-icons/bi";
import { FaCloudRain, FaTint, FaWind, FaChevronUp } from "react-icons/fa";

export const WeatherDetails = () => {
  return <WeatherCard />;
};

function WeatherCard() {
  const [cardClicked, setCardClicked] = useState(false);
  const weatherData = useAppSelector((state) => state.weatherData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWeather());
  }, [weatherData.longitude, weatherData.latitude, dispatch]);

  const cardPos = cardClicked
    ? "relative max-w-lg"
    : "absolute bottom-0 max-w-sm";

  const pending = weatherData.pending;
  console.log(pending);

  {
    if (pending) {
      return (
        <BiSmile className="absolute bottom-0 align-bottom size-24 animate-bounce" />
      );
    } else {
      return (
        <div
          onClick={() => setCardClicked(!cardClicked)}
          className={`${cardPos} z-0 w-full cursor-pointer transition transform hover:-translate-y-1 hover:scale-95 duration-300 ease-in-out p-4 rounded-lg backdrop-blur-xs `}
        >
          {/* <h2 className="text-xl font-bold text-white mb-2">{weatherType}</h2> */}
          <p className="text-lg text-white mb-2">{weatherData.cityName}</p>
          <div className="text-4xl font-extrabold text-white mb-4">
            {weatherData.temperature}°
          </div>
          {weatherData.message !== "" || weatherData.temperature == null ? (
            <div className="max-w-md mx-auto p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
              <p className="text-center text-red-500 font-semibold">
                Can't fetch data for this location
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="flex flex-col space-y-2">
            <WeatherInfoKeyValue
              icon={<FaCloudRain className="text-blue-400" />}
              infoKey="Rain Accumulation"
              infoValue={weatherData.rainAccumulation}
            />
            <WeatherInfoKeyValue
              icon={<FaCloudRain className="text-blue-400" />}
              infoKey="Rain Intensity"
              infoValue={weatherData.rainIntensity}
            />
            <div className={cardClicked ? "block" : "hidden"}>
              <WeatherInfoKeyValue
                icon={<FaTint className="text-cyan-400" />}
                infoKey="Humidity"
                infoValue={weatherData.humidity}
              />
              <WeatherInfoKeyValue
                icon={<FaWind className="text-green-400" />}
                infoKey="Wind Speed"
                infoValue={weatherData.windSpeed}
              />
              <WeatherInfoKeyValue
                icon={<FaWind className="text-green-400" />}
                infoKey="Wind Direction"
                infoValue={weatherData.windDirection}
              />
            </div>
          </div>

          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 opacity-60 p-2 rounded-lg flex flex-col gap-4 items-center cursor-pointer">
            <p className="text-sm text-white">
              {cardClicked ? "Tap to view less" : "Tap to view more"}
            </p>
            <FaChevronUp
              className={`text-xl text-white transition-transform ${
                cardClicked ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      );
    }
  }
}

const WeatherInfoKeyValue = ({
  icon,
  infoKey,
  infoValue,
}: {
  icon: React.ReactNode;
  infoKey: string;
  infoValue: number | undefined;
}) => {
  return (
    <div className="flex items-center justify-between p-2  rounded-lg">
      <p className="text-sm text-gray-300">{infoKey}</p>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-white">{infoValue}</p>
        {icon}
      </div>
    </div>
  );
};
