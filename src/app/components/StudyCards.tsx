"use client";
import { useEffect, useState } from "react";
import { Card } from "@prisma/client";
import { Check, Close, ThumbDown, ThumbUp } from "@mui/icons-material";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { updateUserScore } from "@/actions/actions";
import StudyFinishModal from "./StudyFinishModal";

type CardsProps = {
  initialCards?: Card[];
  deckId: string;
};

export default function StudyCards({ initialCards = [], deckId }: CardsProps) {
  const { user } = useUser();

  const [cards, setCards] = useState(initialCards);
  const [index, setIndex] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const hasNext = index < cards.length - 1;
  const hasPrev = index > 0;
  const card = cards[index];
  const isLastCard = index === cards.length - 1;
  const score = cards.length * 2;

  if (cards.length === 0) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full md:w-2/3 justify-center">
          <div className="flex h-[15rem] w-full group items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg mt-10 font-semibold">
            Deck is empty
          </div>
        </div>
      </div>
    );
  }

  function handleEasyClick() {
    setFlipped(false);
    setTimeout(() => switchToNextCard(), 100);
  }

  function handleHardClick() {
    setFlipped(false);
    setTimeout(() => {
      addCurrentCardToEnd();
      switchToNextCard(), 100;
    });
  }

  function switchToNextCard() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function addCurrentCardToEnd() {
    setCards((prevCard) => [...prevCard, prevCard[index]]);
  }

  function handleFlip() {
    setFlipped(!isFlipped);
  }

  function handleFinish() {
    updateUserScore(user!.id, score);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full justify-center">
          <button
            onClick={handleFlip}
            className={`relative min-h-[15rem] md:h-[20rem] lg:h-[25rem] w-full border border-white/10 shadow-lg rounded-lg mt-10 transition-transform duration-300 [transform-style:preserve-3d] cursor-pointer focus-visible:ring-white focus-visible:ring-2 focus:outline-none ${
              isFlipped
                ? "[transform:rotateY(180deg)]"
                : "[transform:rotateY(0deg)]"
            }`}
          >
            {/* Front Face (Question) */}
            <div className="absolute inset-0 h-full w-full rounded-lg bg-neutral-800 text-xl md:text-2xl lg:text-3xl [backface-visibility:hidden] overflow-y-auto flex items-center">
              <div className="p-4 flex-grow flex items-center justify-center">
                {card.question}
              </div>
            </div>

            {/* Back Face (Answer) */}
            <div className="absolute inset-0 h-full w-full rounded-lg bg-neutral-700 text-white text-xl md:text-2xl lg:text-3xl [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto flex items-center">
              <div className="p-4 flex-grow flex items-center justify-center">
                {card.answer}
              </div>
            </div>
          </button>

          <div className="flex justify-center items-center gap-4 mt-4">
            {isLastCard ? (
              // <Link href={`/decks/${deckId}`}>
              //   <button
              //     onClick={handleFinish}
              //     className="h-[42px] bg-indigo-600 py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors"
              //   >
              //     Finish
              //   </button>
              // </Link>
              <StudyFinishModal
                deckId={deckId}
                score={score}
                handleFinish={handleFinish}
              />
            ) : (
              <>
                <button
                  onClick={handleHardClick}
                  className={`h-[42px] w-[42px] border border-white/10 p-2 rounded-xl hover:bg-red-800 hover:bg-opacity-50 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors`}
                >
                  <Close />
                </button>
                <button
                  onClick={handleEasyClick}
                  className="h-[42px] w-[42px] border border-white/10 p-2 rounded-xl hover:bg-green-800 hover:bg-opacity-50 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors"
                >
                  <Check />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
