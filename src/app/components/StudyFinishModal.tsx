"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState as useLayoutEffect } from "react";
import EditDeckForm from "./EditDeckForm";
import { Deck } from "@prisma/client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

interface StudyFinishModalProps {
  deckId: string;
  score: number;
  handleFinish: () => void;
}

const StudyFinishModal = ({
  deckId,
  score,
  handleFinish,
}: StudyFinishModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useLayoutEffect(false); // Ensure it mounts only on the client
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Fix Next.js hydration issue
  }, []);

  const openModal = () => {
    setIsOpen(true);
    handleFinish();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRestart = () => {
    setIsOpen(false);
    setTimeout(() => router.push(`/decks/${deckId}/study`), 50);
  };

  const handleContinue = () => {
    router.push(`/decks/${deckId}/`);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      //   onClick={handleClose}
    >
      <div
        className="bg-neutral-800 rounded-lg shadow-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Great job!</h2>
        You earned {score} points.
        <div className="flex gap-2 mt-4">
          {/* <div className="w-full">
            <button
              className="h-[42px] px-4 py-2 w-full border border-white/15 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-colors"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div> */}
          <button
            className="h-[42px] bg-indigo-600 w-full py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Button to Open Modal */}
      <button
        className="h-[42px] bg-indigo-600 py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 focus-visible:ring-white focus-visible:ring-2 focus:outline-none transition-colors"
        onClick={openModal}
      >
        Finish
      </button>

      {/* Render Modal via Portal if Open */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default StudyFinishModal;
