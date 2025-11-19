"use client";

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchTerm, handleSearchPet } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        placeholder="Search pets"
        value={searchTerm}
        onChange={(e) => handleSearchPet(e.target.value)}
        type="search"
        className="w-full h-full bg-white/20 px-5 rounded-md outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50"
      />
    </form>
  );
}
