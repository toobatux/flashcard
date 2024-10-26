"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState as useLayoutEffect } from "react";
import EditDeckForm from "./EditDeckForm";
import { Deck } from "@prisma/client";

interface EditModalProps {
  deck: Deck | undefined;
}

const EditModal = ({ deck }: EditModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useLayoutEffect(false); // Ensure it mounts only on the client

  useEffect(() => {
    setMounted(true); // Fix Next.js hydration issue
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClose = () => {
    setIsOpen(false);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleClose}
    >
      <div
        className="bg-neutral-800 rounded-lg shadow-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Deck</h2>
        <EditDeckForm deck={deck} handleClose={handleClose} />

        <button
          className="mt-4 px-4 py-2 h-[40px] w-full border border-white/15 hover:bg-white/10 text-white/60 hover:text-white rounded-xl transition-colors"
          onClick={toggleModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Button to Open Modal */}
      <button
        className="flex items-center border border-white/50 hover:border-white/65 hover:bg-white/10 py-2 px-4 rounded-lg text-white font-semibold transition-colors"
        onClick={toggleModal}
      >
        Edit
      </button>

      {/* Render Modal via Portal if Open */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default EditModal;
