"use client";

import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";
import { Add, Menu } from "@mui/icons-material";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Decks", href: "/decks" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { isSignedIn } = useUser();

  return (
    <>
      <div className="sticky top-0 z-40 w-full h-16 bg-neutral-900 flex items-center border-b border-white/15">
        <div className="flex w-full h-full justify-center ms-2 xl:ms-4 me-4">
          <div className="flex-auto w-full h-full flex items-center">
            <div className="w-full">
              <div className="relative flex justify-between">
                <div className="flex items-center">
                  <div className="hidden xl:block">
                    <Link
                      href="/"
                      className="text-lg font-semibold me-5 focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded"
                    >
                      Flashcards
                    </Link>
                  </div>
                  <div className="block xl:hidden m-2 px-3 py-2 rounded-lg hover:bg-white/5">
                    <Menu />
                  </div>
                  {/* <Searchbar /> */}
                </div>
                <div className="flex items-center space-x-4">
                  {isSignedIn && (
                    <Link
                      href="/decks/create"
                      className="p-1.5 text-sm flex items-center text-indigo-600 border border-indigo-600 hover:border-indigo-400 hover:text-indigo-400 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-white focus-visible:ring-2"
                    >
                      <Add fontSize="small" className="" />
                    </Link>
                  )}
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
