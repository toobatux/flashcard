"use client";
import React, { useState } from "react";

const FilterButtons = () => {
  const [activeButton, setActiveButton] = useState("All");

  const buttons = ["All", "Science", "Math", "Language"];

  return (
    <div className="flex gap-1.5 mb-6">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => setActiveButton(button)}
          className={`px-4 py-2 border-2 rounded-full text-sm ${
            activeButton === button
              ? "border-transparent bg-black dark:bg-white text-white dark:text-black"
              : "border-black/10 dark:border-white/5 text-black dark:text-white"
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
