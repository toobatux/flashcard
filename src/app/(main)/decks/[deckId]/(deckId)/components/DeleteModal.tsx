"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useEffect, useState as useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { HighlightOff } from "@mui/icons-material";
import { deleteDeck } from "@/actions/actions";
import { Oval } from "react-loader-spinner";

interface DeleteModalProps {
  deckId: string;
}

const DeleteModal = ({ deckId }: DeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [mounted, setMounted] = useLayoutEffect(false); // Ensure it mounts only on the client
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Fix Next.js hydration issue
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    setIsDisabled(true);
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
        <div className="text-xl font-bold mb-4">Delete deck?</div>
        <div className="text-white/60">This cannot be undone.</div>
        <div className="flex mt-6 gap-2">
          <button
            className={`h-[42px] px-4 py-2 flex-1 font-semibold text-sm border border-white/15 text-white/50 rounded-lg transition-colors ${
              isDisabled ? "opacity-50" : "hover:text-white hover:bg-white/10"
            }`}
            onClick={toggleModal}
            disabled={isDisabled}
          >
            Cancel
          </button>
          <button
            className={`h-[42px] px-4 py-2 flex-1 justify-center items-center font-semibold text-sm bg-red-600 bg-opacity-40 text-white rounded-lg transition-colors ${
              isDisabled ? "opacity-50" : "hover:bg-red-500 hover:bg-opacity-50"
            }`}
            onClick={handleDelete}
            disabled={isDisabled}
          >
            {!isDisabled ? (
              <>Delete</>
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
                wrapperClass="flex justify-center"
              />
            )}
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
