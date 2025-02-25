import { Bookmark, MoreHoriz } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="lg:my-6"></div>
      <div className="relative max-w-3xl mx-auto">
        {/* Path breadcrumbs */}
        <div className="flex gap-2">
          <Link
            href="/courses/"
            className="text-white/50 hover:text-white hover:underline transition-colors"
          >
            Courses
          </Link>
          <span className="text-white/50">{"/"}</span>
        </div>

        {/* Title */}
        <div className="bg-white/5 rounded-full w-2/3 h-[36px] lg:h-[40px] animate-pulse mt-6"></div>

        {/* Description */}
        <div className="mt-3 mb-1 h-[20px] w-full bg-white/5 rounded-full animate-pulse"></div>
        <div className="mb-4 h-[20px] w-1/2 bg-white/5 rounded-full animate-pulse"></div>

        {/* Difficulty & Number of Lessons */}
        <div className="flex w-full gap-1">
          <div className="w-1/5 h-[20px] rounded-full bg-white/5 animate-pulse"></div>
          <span className="text-white/10">•</span>
          <div className="w-1/5 h-[20px] bg-white/5 rounded-full animate-pulse"></div>
        </div>

        <div className="flex w-full items-center justify-between rounded-xl mt-1">
          {/* Progress bar */}
          <div className="w-full max-w-[200px] h-[8px] rounded-full bg-white/5"></div>

          <div className="flex items-center gap-3">
            {/* Save button */}
            <div className="flex h-[40px] w-[40px] items-center justify-center">
              <Bookmark className="text-white/50 opacity-50" />
            </div>

            {/* More button */}
            <button
              type="button"
              disabled
              className="flex items-center p-1.5 rounded-full text-white/50 font-semibold opacity-50"
            >
              <MoreHoriz />
            </button>

            {/* Learn button */}
            <button
              disabled
              className="bg-white/95 text-black opacity-50 h-[40px] py-2 px-4 rounded-xl font-medium transition-colors flex w-full items-center justify-center"
            >
              Learn
            </button>
          </div>
        </div>

        <hr className="w-full border border-white/5 mt-4 mb-8" />

        {/* Lessons */}
        <div className="grid gap-2">
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse "></div>
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse "></div>
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse "></div>
        </div>

        {/* Leaderboard positioned at the top-right */}
        {/* <div className="hidden 2xl:block absolute top-0 -right-[23rem] w-[20rem] p-4"></div>
        <div className="2xl:hidden w-full my-8"></div>
        <div className="mt-8">
          <div className="flex text-white/75 text-sm mt-1 h-[25px] items-center"></div>
        </div> */}
      </div>
    </>
  );
}
