import { MoreHoriz } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="lg:my-4"></div>
      <div className="relative max-w-3xl mx-auto">
        <Link
          href="/courses/"
          className="text-white/50 hover:text-white hover:underline transition-colors"
        >
          Course
        </Link>
        <div className="bg-white/5 rounded-full w-2/3 h-[36px] lg:h-[40px] animate-pulse mt-3"></div>
        <div className="mt-4 mb-1 h-[20px] w-full bg-white/5 rounded-full animate-pulse"></div>
        <div className="mb-7 h-[20px] w-1/2 bg-white/5 rounded-full animate-pulse"></div>
        <div className="flex w-full items-center justify-between rounded-xl mt-2">
          <div className="flex w-full gap-1">
            <div className="w-1/5 h-[20px] rounded-full bg-white/5 animate-pulse"></div>
            <div className="w-1/5 h-[20px] bg-white/5 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="flex items-center border-2 border-white/20 p-1.5 rounded-full text-white/50 font-semibold opacity-50"
            >
              <MoreHoriz />
            </button>
            <button
              className="bg-blue-700 h-[40px] w-[96px] py-2 px-6 rounded-full font-semibold transition-colors flex items-center justify-center opacity-50"
              disabled
            >
              Review
            </button>
          </div>
        </div>
        <hr className="w-full border border-white/5 mt-4 mb-8" />
        <div className="grid gap-2">
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse bg-white/5"></div>
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse bg-white/5"></div>
          <div className="relative h-[76px] w-full border-2 border-white/5 rounded-2xl animate-pulse bg-white/5"></div>
        </div>
        {/* Leaderboard positioned at the top-right */}
        <div className="hidden 2xl:block absolute top-0 -right-[23rem] w-[20rem] p-4"></div>
        <div className="2xl:hidden w-full my-8"></div>
        <div className="mt-8">
          <div className="flex text-white/75 text-sm mt-1 h-[25px] items-center"></div>
        </div>
      </div>
    </>
  );
}
