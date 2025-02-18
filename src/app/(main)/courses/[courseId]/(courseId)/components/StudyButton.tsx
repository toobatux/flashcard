"use client";
import { updateRecentDecks } from "@/actions/actions";
import Link from "next/link";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

interface StudyButtonProps {
  lesson: { id: string } | null;
  isEmpty: boolean;
  userId: string;
}

export default function StudyButton({
  lesson,
  isEmpty,
  userId,
}: StudyButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleStudy() {
    setIsDisabled(true);
    updateRecentDecks(userId, lesson!.id);
  }
  return (
    <Link
      href={`/lessons/${lesson?.id}/study`}
      className={`${isEmpty ? "pointer-events-none" : ""}`}
    >
      <button
        onClick={handleStudy}
        disabled={isDisabled}
        className={`bg-blue-700 hover:bg-blue-600 h-[40px] w-[96px] py-2 px-6 rounded-full font-semibold transition-colors flex items-center justify-center ${
          isEmpty || isDisabled ? "opacity-50" : ""
        }`}
      >
        {!isDisabled ? (
          <>Review</>
        ) : (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#ffffff"
            secondaryColor="#ffffff"
            ariaLabel="oval-loading"
            strokeWidth={6}
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </button>
    </Link>
  );
}
