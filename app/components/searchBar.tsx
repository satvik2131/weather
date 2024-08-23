"use client";

import React, { useState } from "react";
import locations from "../locations/locations.json";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { setLocation } from "../../redux/features/locationSearchBarSlice";
import { useAppDispatch } from "@/redux/hooks";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

type ResultItem = {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleOnSearch = (
    searchString: string,
    results: ResultItem[]
  ): void => {
    console.log(searchString, results);
  };

  const handleOnHover = (result: ResultItem): void => {
    console.log(result);
  };

  const handleOnSelect = (item: ResultItem): void => {
    dispatch(setLocation(item));
  };

  const handleOnFocus = (): void => {
    console.log("Focused");
  };

  const formatResult = (item: ResultItem): JSX.Element => {
    return (
      <>
        <span className="text-left">
          {item.cityName}, {item.localityName}
        </span>
      </>
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col items-center justify-center mt-10"
    >
      <div className="flex items-center w-full max-w-xl">
        <ReactSearchAutocomplete
          className="w-full z-10 min-w-[250px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[550px] px-4 py-2 "
          items={locations}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          fuseOptions={{ keys: ["cityName", "localityName"] }} // Specify the keys to search
          resultStringKeyName="localityName" // Display locality name in the input field
        />
      </div>
      <div className="flex space-x-4 mt-6"></div>
    </form>
  );
};
