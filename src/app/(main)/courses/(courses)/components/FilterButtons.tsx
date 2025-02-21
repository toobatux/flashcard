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
              ? "border-transparent bg-white text-black"
              : "border-white/5 text-white"
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
