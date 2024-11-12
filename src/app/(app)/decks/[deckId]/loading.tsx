import { MoreHoriz } from "@mui/icons-material";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-white/5 rounded-full w-2/3 h-[32px] lg:h-[36px] animate-pulse"></div>
        <div className="mt-3 mb-1 h-[24px] w-full bg-white/5 rounded-full animate-pulse"></div>
        <div className="mb-6 h-[24px] w-1/2 bg-white/5 rounded-full animate-pulse"></div>

        <div className="block text-xs text-black/90 dark:text-white/50">
          Created by
        </div>
        <div className="flex w-full items-center justify-between rounded-xl mt-1 mb-8 lg:mb-8">
          <div className="flex w-full gap-1">
            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse"></div>
            <div className="w-1/3 h-[32px] bg-white/5 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="flex items-center border-2 border-white/50 p-1.5 rounded-lg text-white font-semibold opacity-50"
            >
              <MoreHoriz />
            </button>
            <button
              className="bg-indigo-700 py-2 px-6 rounded-lg font-bold transition-colors opacity-50"
              disabled
            >
              Study
            </button>
          </div>
        </div>

        <div className="relative min-h-[15rem] md:h-[20rem] lg:h-[25rem] w-full border bg-white/5 border-white/10 shadow-lg rounded-lg"></div>

        {/* Leaderboard positioned at the top-right */}
        <div className="hidden 2xl:block absolute top-0 -right-[23rem] w-[20rem] p-4">
          {/* {deck?.guide && (
            <>
              <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                Read the guide
              </div>
              <Link href={`/guides/${deck.guide.id}`}>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10">
                  <div className="font-bold mb-2">{deck.guide.title}</div>
                </div>
              </Link>
            </>
          )}

          <Leaderboard deck={deck!} /> */}
        </div>
        {/* 
        {deck && deck?.cards.length > 0 ? (
          <div className="hidden lg:block mb-6">
            <KeyboardMessage />
          </div>
        ) : (
          <></>
        )} */}

        {/* Main content */}
        {/* <Cards cards={cards} /> */}

        {/* {deck && deck.cards.length > 0 && (
          <>
            <div className="my-8 mb-4 text-lg lg:text-xl font-semibold">
              Cards in this deck
            </div>
            <div className="border-2 border-white/5 rounded-lg">
              <div className="flex w-full items-center gap-3 ps-3 p-3 text-white/50">
                <div className="ms-2 w-[5rem]">#</div>
                <div className="ms-2 w-full">Question</div>
                <div className="ms-2 w-full">Answer</div>
              </div>
              {deck?.cards.map((card, index) => (
                <div key={card.id}>
                  <div className="flex w-full items-center gap-6 p-3 border-t-2 border-white/5 hover:bg-white/5">
                    <div className="text-white/50 ms-2 w-[5rem]">
                      {index + 1}
                    </div>
                    <div className="w-full font-semibold">{card.question}</div>
                    <div className="w-full me-2">{card.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )} */}

        <div className="2xl:hidden w-full my-8">
          {/* {deck?.guide && (
            <>
              <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                Read the guide
              </div>
              <Link href={`/guides/${deck.guide.id}`}>
                <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10">
                  <div className="font-bold mb-2">{deck.guide.title}</div>
                </div>
              </Link>
            </>
          )} */}

          {/* <Leaderboard deck={deck!} /> */}
        </div>

        <div className="mt-8">
          {/* <div className="text-white/50 text-xs">Last updated</div> */}
          <div className="flex text-white/75 text-sm mt-1 h-[25px] items-center">
            {/* {deck?.updatedOn.toDateString()} */}
          </div>
        </div>
      </div>
    </>
  );
}
