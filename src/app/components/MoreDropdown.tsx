"use client";

import { ContentCopy, EditOutlined, MoreHoriz } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import { createDeckCopy, isDeckSaved } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import SaveDeckButton from "./SaveDeckButton";

interface MoreDropdownProps {
  userIsAuthor: boolean;
  deckId: string;
}

const MoreDropdown = ({ userIsAuthor, deckId }: MoreDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  const handleCreateCopy = async () => {
    createDeckCopy(deckId, user!.id);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left dropdown">
      <button
        type="button"
        className="flex items-center border-2 border-white/50 hover:border-white/65 hover:bg-white/10 p-1.5 rounded-lg text-white font-semibold transition-colors"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreHoriz />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-neutral-900 border border-white/20 shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="p-2" role="none">
            {userIsAuthor && (
              <Link
                href={`/decks/${deckId}/edit`}
                className="flex items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
                role="menuitem"
              >
                <EditOutlined className="text-white/50" />
                Edit
              </Link>
            )}
            {!userIsAuthor && (
              <>
                <SaveDeckButton clerkId={user!.id} deckId={deckId} />
              </>
            )}
            <button
              onClick={handleCreateCopy}
              className="flex w-full items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
              role="menuitem"
            >
              <ContentCopy className="text-white/50" />
              Create a copy
            </button>
            {userIsAuthor && (
              <>
                <div className="w-full py-2">
                  <hr className="border-t border-white/20" />
                </div>
                {/* <button
                  type="button"
                  className="flex items-center gap-3 w-full text-left py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
                  role="menuitem"
                >
                  <HighlightOff className="text-white/50" />
                  Delete
                </button> */}
                <DeleteModal deckId={deckId} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreDropdown;
