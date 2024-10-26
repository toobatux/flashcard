"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState as useLayoutEffect } from "react";
import EditDeckForm from "./EditDeckForm";
import { Deck } from "@prisma/client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { HighlightOff } from "@mui/icons-material";
import { deleteDeck } from "@/actions/actions";

interface DeleteModalProps {
  deckId: string;
}

const DeleteModal = ({ deckId }: DeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useLayoutEffect(false); // Ensure it mounts only on the client
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Fix Next.js hydration issue
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    deleteDeck(deckId);
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
        <h2 className="text-xl font-bold mb-4">Delete deck</h2>
        <div className="mb-1 text-white/50">
          Are you sure you want to delete this deck?
        </div>
        <div className="text-white/50">This cannot be undone.</div>
        <div className="flex mt-6 gap-2">
          <button
            className="h-[42px] px-4 py-2 flex-1 border border-white/15 hover:bg-white/10 text-white rounded-lg transition-colors"
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button
            className="h-[42px] px-4 py-2 flex-1 border border-red-600 border-opacity-60 bg-red-600 bg-opacity-50 hover:bg-red-500 text-white rounded-lg transition-colors"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Button to Open Modal */}
      <button
        type="button"
        className="flex items-center gap-3 w-full text-left py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
        role="menuitem"
        onClick={toggleModal}
      >
        <HighlightOff className="text-white/50" />
        Delete
      </button>

      {/* Render Modal via Portal if Open */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default DeleteModal;
