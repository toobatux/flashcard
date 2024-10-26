import React from "react";
import Search from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <div className="relative min-w-full flex items-center group">
      <input
        className="block w-full pl-12 bg-white/10 dark:bg-neutral-800 rounded-full py-2 px-2 text-gray-200 dark:text-white placeholder-neutral-400 focus:outline-white/60 focus:outline-none focus:outline-2"
        placeholder="Search decks, guides, places..."
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-neutral-400 group-hover:text-neutral-300 group-focus-within:text-neutral-300" />
      </div>
    </div>
  );
};

export default Searchbar;
