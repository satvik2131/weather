"use client";
import React, { useState } from "react";
import {
  FaCloudSun,
  FaChevronDown,
  FaCloudRain,
  FaTint,
  FaWind,
  FaChevronUp,
} from "react-icons/fa";

interface TimeData {
  time: string;
  temperature: number;
}

export const WeatherDetails = () => {
  const timeData: TimeData[] = [
    { time: "08:00 AM", temperature: 9 },
    { time: "12:00 PM", temperature: 12 },
  ];

  return (
    <WeatherCard
      weatherType="Sunny"
      temperature={26}
      city="Jabalpur"
      timeData={timeData}
    />
  );
};

interface WeatherCardProps {
  weatherType: "Sunny" | "Cloudy";
  temperature: number;
  city: string;
  timeData: TimeData[];
}

function WeatherCard({
  weatherType,
  temperature,
  city,
  timeData,
}: WeatherCardProps) {
  const [cardClicked, setCardClicked] = useState(false);
  const cardPos = cardClicked
    ? "relative max-w-lg"
    : "absolute bottom-0 max-w-sm";

  return (
    <div
      onClick={() => setCardClicked(!cardClicked)}
      className={`${cardPos} z-0 w-full cursor-pointer transition transform hover:-translate-y-1 hover:scale-95 duration-300 ease-in-out p-4 rounded-lg backdrop-blur-xs shadow-lg`}
    >
      <h2 className="text-xl font-bold text-white mb-2">{weatherType}</h2>
      <p className="text-lg text-white mb-2">{city}</p>
      <div className="text-4xl font-extrabold text-white mb-4">
        {temperature}°
      </div>

      <div className="flex flex-col space-y-2">
        <WeatherInfoKeyValue
          icon={<FaCloudRain className="text-blue-400" />}
          infoKey="Rain Accumulation"
          infoValue="0.9"
        />
        <WeatherInfoKeyValue
          icon={<FaCloudRain className="text-blue-400" />}
          infoKey="Rain Intensity"
          infoValue="1.3"
        />
        <div className={cardClicked ? "block" : "hidden"}>
          <WeatherInfoKeyValue
            icon={<FaTint className="text-cyan-400" />}
            infoKey="Humidity"
            infoValue="0.9"
          />
          <WeatherInfoKeyValue
            icon={<FaWind className="text-green-400" />}
            infoKey="Wind Speed"
            infoValue="0.9"
          />
          <WeatherInfoKeyValue
            icon={<FaWind className="text-green-400" />}
            infoKey="Wind Direction"
            infoValue="0.9"
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

const WeatherInfoKeyValue = ({
  icon,
  infoKey,
  infoValue,
}: {
  icon: React.ReactNode;
  infoKey: string;
  infoValue: string;
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
