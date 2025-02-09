"use client";

import { Add, LayersOutlined, SchoolOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

const NewButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left dropdown">
      <button
        type="button"
        className="p-1 w-[42px] h-[42px] text-sm flex items-center justify-center text-blue-700 border-2 border-blue-700 hover:border-blue-600 hover:text-blue-600 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-white focus-visible:ring-2"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Add />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20 w-full h-full"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-md app-bg border border-white/20 shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-2" role="none">
              <Link
                href="/decks/create"
                className="flex items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
                role="menuitem"
                onClick={toggleDropdown}
              >
                <LayersOutlined className="text-white/50" />
                Deck
              </Link>
              <Link
                href="/guides/create"
                className="flex w-full items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
                role="menuitem"
                onClick={toggleDropdown}
              >
                <SchoolOutlined className="text-white/50" />
                Guide
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewButton;
