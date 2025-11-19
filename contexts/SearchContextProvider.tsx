"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type SearchContextValues = {
  searchTerm: string;
  handleSearchPet: (query: string) => void;
};
export const SearchContext = createContext<SearchContextValues | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchPet = (query: string) => {
    setSearchTerm(query);
  };
  return (
    <SearchContext.Provider value={{ searchTerm, handleSearchPet }}>
      {children}
    </SearchContext.Provider>
  );
}
