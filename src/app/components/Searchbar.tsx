import React from "react";
import Search from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <div className="relative min-w-full flex items-center group">
      <input
        className="block w-full pl-12 bg-black/5 dark:bg-white/5 hover:bg-white/10 transition-all duration-200 rounded-lg py-2 px-2 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 outline focus:outline-black/60 dark:focus:outline-white/60 outline-transparent focus:hover:bg-white/5 items-center"
        placeholder="What do you want to learn?"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-neutral-400 group-hover:text-neutral-300 group-focus-within:text-neutral-300" />
      </div>
    </div>
  );
};

export default Searchbar;
