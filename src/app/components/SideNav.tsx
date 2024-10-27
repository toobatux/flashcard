"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Layers from "@mui/icons-material/Layers";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkOutlined from "@mui/icons-material/BookmarkBorderOutlined";

const navLinks: Array<{
  name: string;
  href: string;
  filled: React.ComponentType;
  outlined: React.ComponentType;
}> = [
  { name: "Home", href: "/home", filled: HomeIcon, outlined: HomeOutlined },
  { name: "Decks", href: "/decks", filled: Layers, outlined: LayersOutlined },
  {
    name: "Library",
    href: "/library",
    filled: Bookmark,
    outlined: BookmarkOutlined,
  },
];

const SideNav = () => {
  const pathName = usePathname();
  return (
    <aside className="hidden md:block fixed top-16 left-0 h-full w-[5rem] xl:w-[15rem] border-r border-white/10 p-1 pt-4 px-4">
      <nav className="grid space-y-1 text-sm">
        {navLinks.map((link) => {
          const isActive = pathName.startsWith(link.href);
          const IconComponent = isActive ? link.filled : link.outlined;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={
                isActive
                  ? "flex items-center lg:gap-3 text-indigo-300 font-bold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-white focus-visible:ring-2"
                  : "flex items-center lg:gap-3 text-gray-300 font-bold py-2 px-3 rounded-lg hover:bg-white/5 no-underline focus:outline-none focus-visible:ring-white focus-visible:ring-2"
              }
            >
              {IconComponent && <IconComponent />}
              <div className="hidden xl:block">{link.name}</div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;
