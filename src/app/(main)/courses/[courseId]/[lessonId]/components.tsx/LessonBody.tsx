"use client";
import React, { useState } from "react";
import TermList from "../../(courseId)/components/TermList";

type LessonBodyProps = {
  terms: {
    id: number;
    question: string;
    questionAlt: string | null;
    answer: string;
    correctCount: number;
  }[];
};

export default function LessonBody({ terms }: LessonBodyProps) {
  const [isTermsOpen, setIsTermsOpen] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleTermsOpen = () => {
    setIsTermsOpen(true);
    setIsGuideOpen(false);
  };

  const handleGuideOpen = () => {
    setIsGuideOpen(true);
    setIsTermsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col w-full mt-6">
        {/* <div className="sticky top-16 z-20"> */}
        <div className="flex w-full gap-1">
          <button
            className={`w-full py-2 border-b-4 rounded-s-xl ${
              isTermsOpen
                ? "text-white bg-white/5 border-white/50"
                : "text-white/55 border-white/5"
            }`}
            onClick={handleTermsOpen}
          >
            Terms
          </button>
          <button
            className={`w-full py-2 border-b-4 rounded-e-xl ${
              isGuideOpen
                ? "text-white bg-white/5 border-white/50"
                : "text-white/55 border-white/5"
            }`}
            onClick={handleGuideOpen}
          >
            Guide
          </button>
        </div>
        {/* </div> */}
        {isTermsOpen ? (
          <TermList terms={terms} />
        ) : (
          <div className="mt-4">This is the guide</div>
        )}
      </div>
    </>
  );
}
