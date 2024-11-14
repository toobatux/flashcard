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
import NewButton from "./NewButton";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Decks", href: "/decks" },
];

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const isLanding = usePathname() === "/";

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <>
      {/* border-b border-black dark:border-white/15 */}
      <div className="sticky top-0 z-40 w-full h-16 bg-black dark:bg-neutral-900 border-b border-black dark:border-white/10 flex items-center">
        <div className="flex w-full h-full justify-center ms-2 me-4">
          <div className="flex-auto w-full h-full flex items-center">
            <div className="w-full">
              <div className="relative flex justify-between">
                <div className="flex items-center gap-2 w-1/4">
                  {/* <div className="hidden xl:block">
                    <Link
                      href="/"
                      className="text-lg font-semibold me-5 focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded"
                    >
                      Flashcards
                    </Link>
                  </div> */}
                  {!isLanding && (
                    <button
                      onClick={toggleSideNav}
                      className="flex items-center m-2 px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                      <Menu />
                    </button>
                  )}
                  <Link href="/">
                    <div className="font-bold text-lg">Flashcards</div>
                  </Link>
                  {/* <Searchbar /> */}
                </div>
                <div className="hidden md:flex items-center justify-center w-2/4 max-w-[30rem] md:pl-[5rem]">
                  <Searchbar />
                </div>
                <div className="flex items-center justify-end space-x-4 w-1/4">
                  {isSignedIn &&
                    (isLanding ? (
                      <Link
                        href="/home"
                        className="py-1.5 px-4 border-2 border-indigo-700 rounded-full font-bold"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <NewButton />
                    ))}

                  <ClerkLoading>
                    <div className="w-[40px] h-[40px] bg-white/5 animate-pulse rounded-full"></div>
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
            className="fixed inset-0 bg-black/50 z-30"
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
