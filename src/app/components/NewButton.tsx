"use client";

import {
  Add,
  ExpandMore,
  LayersOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
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
        className="px-2 py-2 gap-1 text-sm flex items-center justify-center text-white/75 border-2 border-white/75 hover:border-white hover:text-white rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-white focus-visible:ring-2"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex md:hidden">
          <Add fontSize="small" />
        </span>
        <div className="hidden md:flex">
          <span className="px-4">Create</span>
          <ExpandMore fontSize="small" />
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20 w-full h-full"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute right-0 z-20 mt-2 w-[116px] origin-top-right rounded-xl app-bg border border-white/20 shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-2" role="none">
              <Link
                href="/courses/create"
                className="flex items-center gap-2 py-3 px-2 text-sm text-white/70 hover:bg-white/10 rounded-lg"
                role="menuitem"
                onClick={toggleDropdown}
              >
                {/* <LayersOutlined className="text-white/50" fontSize="small" /> */}
                Course
              </Link>
              <Link
                href="/guides/create"
                className="flex w-full items-center gap-2 py-3 px-2 text-sm text-white/70 hover:bg-white/10 rounded-lg"
                role="menuitem"
                onClick={toggleDropdown}
              >
                {/* <SchoolOutlined className="text-white/50" fontSize="small" /> */}
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
