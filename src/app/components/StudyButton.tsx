"use client";
import { updateRecentDecks } from "@/actions/actions";
import Link from "next/link";
import React, { useState } from "react";

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
        className={`bg-indigo-700 hover:bg-indigo-600 py-2 px-6 rounded-lg font-bold transition-colors ${
          isEmpty || isDisabled ? "opacity-50" : ""
        }`}
      >
        Study
      </button>
    </Link>
  );
}
