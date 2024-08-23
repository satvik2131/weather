import React from "react";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["greek"] });

export const Logo = () => {
  return (
    <div
      className={`flex items-center space-x-0 ${inter.className} pt-5 font-light text-8xl`}
    >
      <span className="text-blue-500">G</span>
      <span className="text-red-500">o</span>
      <span className="text-yellow-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </div>
  );
};
