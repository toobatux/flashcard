"use client";
import { useEffect, useState } from "react";
import { Card } from "@prisma/client";
import {
  ArrowForward,
  ArrowBack,
  ErrorOutlineOutlined,
} from "@mui/icons-material";

type CardsProps = {
  cards?: Card[];
};

export default function Cards({ cards = [] }: CardsProps) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const hasNext = index < cards.length - 1;
  const hasPrev = index > 0;

  if (cards.length === 0) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex flex-col text-white/80 rounded-lg w-full bg-indigo-600 bg-opacity-10">
          <div className="flex items-center p-4 font-semibold text-indigo-200">
            <ErrorOutlineOutlined className="" />
            <div className="flex-1 text-center pr-7">This deck is empty</div>
          </div>
        </div>
      </div>
    );
  }

  function handleNextClick() {
    setFlipped(false);
    setTimeout(() => switchToNextCard(), 100);
  }

  function handlePrevClick() {
    setFlipped(false);
    setTimeout(() => switchToPrevCard(), 100);
  }

  function switchToNextCard() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function switchToPrevCard() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleFlip() {
    setFlipped(!isFlipped);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        handlePrevClick();
        break;
      case "ArrowRight":
        handleNextClick();
        break;
      case " ":
        e.preventDefault();
        handleFlip();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  let card = cards[index];

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full justify-center">
          <button
            onClick={handleFlip}
            className={`relative min-h-[15rem] md:h-[20rem] lg:h-[25rem] w-full border border-white/10 shadow-lg rounded-lg transition-all duration-300 [transform-style:preserve-3d] cursor-pointer focus-visible:ring-white focus-visible:ring-2 focus:outline-none ${
              isFlipped
                ? "[transform:rotateY(180deg)]"
                : "[transform:rotateY(0deg)]"
            }`}
          >
            {/* Front Face (Question) */}
            <div className="absolute inset-0 h-full w-full rounded-lg bg-[#2A2A30] text-xl md:text-2xl lg:text-3xl [backface-visibility:hidden] overflow-y-auto flex items-center">
              <div className="p-4 flex-grow flex items-center justify-center">
                {card.question}
              </div>
            </div>

            {/* Back Face (Answer) */}
            <div className="absolute inset-0 h-full w-full rounded-lg bg-[#2A2A30] text-white text-xl md:text-2xl lg:text-3xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto flex items-center">
              <div className="p-4 flex-grow flex items-center justify-center">
                {card.answer}
              </div>
            </div>
          </button>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrevClick}
              disabled={!hasPrev}
              className={`border-2 border-white/10 py-2 px-6 rounded-full focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors ${
                !hasPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"
              }`}
            >
              <ArrowBack />
            </button>
            <div className="flex min-w-[50px] justify-center items-center">
              {index + 1} / {cards.length}
            </div>
            <button
              onClick={handleNextClick}
              className="border-2 border-white/10 py-2 px-6 rounded-full hover:bg-white/5 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors"
            >
              <ArrowForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
