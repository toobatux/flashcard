"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Layers from "@mui/icons-material/Layers";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import SchoolIcon from "@mui/icons-material/School";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { useState } from "react";

const mainNavLinks: Array<{
  name: string;
  href: string;
  filled: React.ComponentType;
  outlined: React.ComponentType;
}> = [
  { name: "Home", href: "/home", filled: HomeIcon, outlined: HomeOutlined },
  { name: "Decks", href: "/decks", filled: Layers, outlined: LayersOutlined },
  {
    name: "Guides",
    href: "/guides",
    filled: SchoolIcon,
    outlined: SchoolOutlinedIcon,
  },
  {
    name: "Library",
    href: "/library",
    filled: Bookmark,
    outlined: BookmarkOutlined,
  },
];

interface SideNavProps {
  isOpenMobile: boolean;
}

const SideNav = () => {
  const path = usePathname();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed z-10 md:relative md:flex-none bottom-0 left-0 w-full h-22 flex justify-start ${
        isOpen ? "md:w-64" : "md:w-[88px]"
      } md:min-h-screen navbg lg:transition-all nav-bg`}
    >
      {/* border-t-2 md:border-t-0 md:border-r-2 border-white/10 */}
      <div className="md:fixed md:top-0 w-[inherit]">
        <div className="flex md:flex-col w-full items-center justify-around p-2 md:p-4 gap-2">
          {/* Korean Text or Logo */}
          <div className="hidden md:flex w-full justify-center items-center px-4 pt-1 pb-4">
            {/* <span className="hidden lg:flex w-full font-bold p-2">Korean</span> */}
            <button
              onClick={toggleNav}
              className="flex w-full justify-start gap-4"
            >
              <span className="hidden md:flex w-[24px] h-[24px] text-2xl items-end justify-center">
                &#128507;
              </span>
              <div className={`${isOpen ? "hidden md:flex" : "hidden"}`}>
                STUDYAPP
              </div>
            </button>
          </div>

          <ul className="flex md:block w-full justify-center gap-1 md:space-y-1">
            {mainNavLinks.map((link) => {
              const isActive = path === link.href;
              const IconComponent = isActive ? link.filled : link.outlined;
              return (
                <li
                  key={link.name}
                  className={`flex-1 w-full h-[45px] items-center justify-center transition-colors rounded-lg ${
                    isActive
                      ? "bg-black/10 dark:bg-white/5 bg-opacity-10"
                      : "hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <Link
                    href={link.href}
                    className={`flex w-full h-full items-center px-4 py-1 justify-center md:justify-start  ${
                      isOpen ? "md:justify-start" : ""
                    }`}
                  >
                    <div className={`flex lg:gap-4 ${isOpen ? "gap-4" : ""}`}>
                      <span
                        className={`flex w-[24px] h-[24px] items-center justify-center ${
                          isActive
                            ? "dark:fill-white dark:text-white  font-semibold"
                            : "fill-none stroke-black/50 dark:text-white/50"
                        }`}
                        style={{ fontSize: "20px" }}
                      >
                        {/* {link.icon} */}
                        {IconComponent && <IconComponent />}
                      </span>
                      <span
                        className={`${
                          isOpen ? "md:flex" : "hidden"
                        } hidden items-center ${
                          isActive ? "dark:text-white" : "dark:text-white/80"
                        } text-sm`}
                      >
                        {link.name}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
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
