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

const homeNavLinks: Array<{
  name: string;
  href: string;
  filled: React.ComponentType;
  outlined: React.ComponentType;
}> = [
  { name: "Home", href: "/home", filled: HomeIcon, outlined: HomeOutlined },
  {
    name: "Library",
    href: "/library",
    filled: Bookmark,
    outlined: BookmarkOutlined,
  },
];

const mainNavLinks: Array<{
  name: string;
  href: string;
  filled: React.ComponentType;
  outlined: React.ComponentType;
}> = [
  { name: "Decks", href: "/decks", filled: Layers, outlined: LayersOutlined },
  {
    name: "Guides",
    href: "/guides",
    filled: SchoolIcon,
    outlined: SchoolOutlinedIcon,
  },
];

interface SideNavProps {
  isOpenMobile: boolean;
}

const SideNav = ({ isOpenMobile }: SideNavProps) => {
  const pathName = usePathname();
  return (
    <aside
      className={`${
        isOpenMobile
          ? "w-1/2 md:w-1/4 xl:w-1/6"
          : "hidden md:block transition-all w-[5rem]"
      } fixed top-16 left-0 h-full bg-neutral-300 dark:bg-neutral-900 border-r border-white/10 p-1 pt-4 px-4 transition-all`}
    >
      <nav className="text-sm">
        <div className="grid space-y-1">
          {homeNavLinks.map((link) => {
            const isActive = pathName.startsWith(link.href);
            const IconComponent = isActive ? link.filled : link.outlined;
            return (
              <Link
                href={link.href}
                key={link.name}
                className={
                  isActive
                    ? "flex relative items-center text-indigo-400 group font-bold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-white focus-visible:ring-2 transition-colors"
                    : "flex relative items-center text-white/50 group font-bold py-2 px-3 rounded-lg hover:bg-white/5 no-underline focus:outline-none focus-visible:ring-white focus-visible:ring-2 transition-colors"
                }
              >
                {IconComponent && <IconComponent />}
                <div
                  className={`${
                    isOpenMobile ? "block ms-3" : "hidden  xl:ms-3"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
        <hr className="border border-white/10 my-4" />
        <div className="grid space-y-1">
          {mainNavLinks.map((link) => {
            const isActive = pathName.startsWith(link.href);
            const IconComponent = isActive ? link.filled : link.outlined;
            return (
              <Link
                href={link.href}
                key={link.name}
                className={
                  isActive
                    ? "flex items-center text-indigo-400 font-bold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-white focus-visible:ring-2 transition-colors"
                    : "flex items-center text-white/50 font-bold py-2 px-3 rounded-lg hover:bg-white/5 no-underline focus:outline-none focus-visible:ring-white focus-visible:ring-2 transition-colors"
                }
              >
                {IconComponent && <IconComponent />}
                <div
                  className={`${
                    isOpenMobile ? "block ms-3" : "hidden xl:ms-3"
                  }`}
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
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
