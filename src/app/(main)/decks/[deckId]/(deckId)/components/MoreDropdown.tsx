"use client";

import { ContentCopy, EditOutlined, MoreHoriz } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { createDeckCopy } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import SaveDeckButton from "./SaveDeckButton";

interface MoreDropdownProps {
  userIsAuthor: boolean;
  deckId: string;
}

const MoreDropdown = ({ userIsAuthor, deckId }: MoreDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateCopy = async () => {
    setIsDisabled(true);
    createDeckCopy(deckId, user!.id);
  };

  return (
    <div className="relative inline-block text-left dropdown">
      {/* <button
        type="button"
        className="flex items-center border-2 border-white/50 hover:border-white/65 hover:bg-white/10 p-1.5 rounded-lg text-white font-semibold transition-colors"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreHoriz />
      </button> */}

      <div className="relative group flex items-center">
        <button
          type="button"
          className="flex items-center border-2 border-white/20 hover:border-white/25 hover:bg-white/10 p-1.5 rounded-full text-white font-semibold transition-colors"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <MoreHoriz />
        </button>

        <div className="absolute top-[-90%] left-[-10%] bg-white/5 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          More
        </div>
      </div>

      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20 w-full h-full"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md app-bg border border-white/20 shadow-lg ring-1 ring-black ring-opacity-5"
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
                disabled={isDisabled}
                className={`flex w-full items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded ${
                  isDisabled && "opacity-50"
                }`}
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
                  <DeleteModal deckId={deckId} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoreDropdown;
