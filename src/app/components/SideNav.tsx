"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { useState } from "react";
import Image from "next/image";
import LogoSVG from "../../../public/Slogo.svg";
import {
  HelpOutline,
  LibraryBooks,
  LibraryBooksOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { useUser } from "@clerk/nextjs";

interface SideNavProps {
  isOpenMobile: boolean;
}

const SideNav = () => {
  const path = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const user = useUser();

  const mainNavLinks: Array<{
    name: string;
    href: string;
    filled: React.ComponentType | any;
    outlined: React.ComponentType | any;
  }> = [
    { name: "Home", href: "/home", filled: HomeIcon, outlined: HomeOutlined },
    {
      name: "Courses",
      href: "/courses",
      filled: SchoolIcon,
      outlined: SchoolOutlinedIcon,
    },
    {
      name: "Guides",
      href: "/guides",
      filled: LibraryBooks,
      outlined: LibraryBooksOutlined,
    },
    {
      name: "Library",
      href: "/library",
      filled: Bookmark,
      outlined: BookmarkOutlined,
    },
  ];

  return (
    <nav
      className={`fixed z-10 md:relative md:flex-none bottom-0 left-0 w-full h-22 flex justify-start ${
        isOpen ? "md:w-56" : "md:w-[88px]"
      } md:min-h-screen navbg lg:transition-all nav-bg`}
    >
      <div className="md:fixed md:top-0 w-[inherit] h-full flex flex-col">
        <div className="flex md:flex-col w-full items-center py-2 md:px-4 gap-2">
          {/* Korean Text or Logo section remains the same */}
          <div
            className={`hidden md:flex h-[45px] w-full justify-between items-center ${
              isOpen && "ps-4"
            } mb-2`}
          >
            <Link
              href="/"
              className={`${isOpen ? "hidden md:flex" : "hidden"} gap-4`}
            >
              <Image src={LogoSVG} width={24} height={24} alt="Logo" />
              STUDY
            </Link>
            <button
              onClick={toggleNav}
              className="px-4 py-1 h-full rounded-xl hover:bg-black/10 dark:hover:bg-white/5 transition-colors"
            >
              <MenuOutlined className="text-black/40 dark:text-white/40" />
            </button>
          </div>

          {/* Main navigation links */}
          <ul className="flex md:block w-full justify-center gap-1 md:space-y-1">
            {mainNavLinks.map((link) => {
              const isActive = path.startsWith(link.href);
              const IconComponent = isActive ? link.filled : link.outlined;
              return (
                <li
                  key={link.name}
                  className={`flex-1 w-full h-[50px] items-center justify-center transition-colors rounded-xl ${
                    isActive
                      ? "bg-black dark:bg-white/5 dark:bg-opacity-10"
                      : "hover:bg-black/10 dark:hover:bg-white/5"
                  }`}
                >
                  <Link
                    href={link.href}
                    className={`flex w-full h-full items-center px-4 py-2 justify-center md:justify-start ${
                      isOpen ? "md:justify-start" : ""
                    }`}
                  >
                    <div className={`flex lg:gap-4 ${isOpen && "gap-4"}`}>
                      <span
                        className={`flex w-[24px] h-[24px] items-center justify-center ${
                          isActive
                            ? "fill-white text-white font-semibold"
                            : "fill-none text-black/60 dark:text-white/40"
                        }`}
                        style={{ fontSize: "20px" }}
                      >
                        {IconComponent && <IconComponent />}
                      </span>
                      <span
                        className={`${
                          isOpen ? "md:flex" : "hidden"
                        } hidden items-center ${
                          isActive
                            ? "text-white"
                            : "text-black/80 dark:text-white/60"
                        }`}
                      >
                        {link.name}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}

            {/* PROFILE NAV ITEM */}
            {/* <li
              className={`flex-1 w-full h-[50px] items-center justify-center hover:bg-white/5 transition-colors rounded-xl
                  
                  `}
            >
              <Link
                href=""
                className={`flex w-full h-full items-center px-4 py-2 justify-center md:justify-start ${
                  isOpen ? "md:justify-start" : ""
                }`}
              >
                <div className={`flex lg:gap-4 ${isOpen && "gap-4"}`}>
                  <span
                    className={`flex w-[24px] h-[24px] items-center justify-center `}
                    style={{ fontSize: "20px" }}
                  >
                    <Image
                      src={user?.user!.imageUrl}
                      width={24}
                      height={24}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </span>
                  <span
                    className={`${
                      isOpen ? "md:flex" : "hidden"
                    } hidden items-center `}
                  >
                    Profile
                  </span>
                </div>
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Help link at bottom */}
        <div className="hidden md:flex mt-auto mb-4 px-4">
          <Link
            href="/help/"
            className={`flex gap-4 h-[50px] w-full items-center justify-center md:justify-start px-4 py-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/5 transition-colors ${
              isOpen && "md:justify-start"
            }`}
          >
            <span className="flex w-[24px] h-[24px] items-center justify-center text-black/60 dark:text-white/40">
              <HelpOutline />
            </span>
            <span
              className={`${
                isOpen ? "md:flex" : "hidden"
              } text-black/80 dark:text-white/60`}
            >
              Help
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;

{
  /* <div className="relative group inline-block">
  <button className="bg-blue-600 text-white px-4 py-2 rounded">Hover me</button>
  <div
    className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-sm rounded px-2 py-1 z-10
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
  >
    Tooltip with smooth transition
  </div>
</div>; */
}
