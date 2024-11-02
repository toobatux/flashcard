"use client";

import React, { useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Add, Menu } from "@mui/icons-material";
import SideNav from "./SideNav";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Decks", href: "/decks" },
];

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

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
                  <button
                    onClick={toggleSideNav}
                    className="flex items-center xl:hidden m-2 px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    <Menu />
                  </button>
                  {/* <Searchbar /> */}
                </div>
                <div className="flex items-center space-x-4">
                  {isSignedIn && (
                    <Link
                      href="/decks/create"
                      className="p-1 w-[42px] h-[42px] text-sm flex items-center justify-center text-indigo-700 border-2 border-indigo-700 hover:border-indigo-600 hover:text-indigo-600 rounded-lg font-semibold transition-colors focus:outline-none focus-visible:ring-white focus-visible:ring-2"
                    >
                      <Add className="" />
                    </Link>
                  )}
                  <ClerkLoading>
                    <p>...</p>
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center">
                        <UserButton
                          appearance={{
                            elements: {
                              userButtonAvatarBox: "w-[40px] h-[40px]",
                            },
                          }}
                        />
                      </div>
                    </SignedIn>
                  </ClerkLoaded>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSideNavOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 xl:hidden"
            onClick={toggleSideNav}
          >
            <SideNav isOpenMobile={isSideNavOpen} />
          </div>
        </>
      )}
      {/* {isSideNavOpen && (
        <SideNav
        // isMobile={true}
        // closeSideNav={() => setIsSideNavOpen(false)}
        // isOpen={isSideNavOpen}
        />
      )} */}
    </>
  );
};

export default Navbar;
