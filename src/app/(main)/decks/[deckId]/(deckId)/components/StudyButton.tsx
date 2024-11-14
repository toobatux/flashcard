"use client";
import { updateRecentDecks } from "@/actions/actions";
import Link from "next/link";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

interface StudyButtonProps {
  deck: { id: string } | null;
  isEmpty: boolean;
  userId: string;
}

export default function StudyButton({
  deck,
  isEmpty,
  userId,
}: StudyButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleStudy() {
    setIsDisabled(true);
    updateRecentDecks(userId, deck!.id);
  }
  return (
    <Link
      href={`/decks/${deck?.id}/study`}
      className={`${isEmpty ? "pointer-events-none" : ""}`}
    >
      <button
        onClick={handleStudy}
        disabled={isDisabled}
        className={`bg-indigo-700 hover:bg-indigo-600 h-[40px] w-[96px] py-2 px-6 rounded-lg font-bold transition-colors flex items-center justify-center ${
          isEmpty || isDisabled ? "opacity-50" : ""
        }`}
      >
        {!isDisabled ? (
          <>Study</>
        ) : (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#ffffff"
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
