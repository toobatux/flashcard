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

// const SideNav = () => {
//   const pathName = usePathname();
//   return (
//     <aside className="hidden md:block fixed top-16 left-0 h-full w-[5rem] xl:w-[15rem] border-r border-white/10 p-1 pt-4 px-4 transition-all">
//       <nav className="grid space-y-1 text-sm">
//         {navLinks.map((link) => {
//           const isActive = pathName.startsWith(link.href);
//           const IconComponent = isActive ? link.filled : link.outlined;
//           return (
//             <Link
//               href={link.href}
//               key={link.name}
//               className={
//                 isActive
//                   ? "flex items-center lg:gap-3 text-indigo-300 font-bold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-white focus-visible:ring-2"
//                   : "flex items-center lg:gap-3 text-gray-300 font-bold py-2 px-3 rounded-lg hover:bg-white/5 no-underline focus:outline-none focus-visible:ring-white focus-visible:ring-2"
//               }
//             >
//               {IconComponent && <IconComponent />}
//               <div className="hidden xl:block">{link.name}</div>
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default SideNav;

interface SideNavProps {
  isOpenMobile: boolean;
}

const SideNav = ({ isOpenMobile }: SideNavProps) => {
  const pathName = usePathname();
  return (
    <aside
      className={`${
        isOpenMobile ? "w-1/2" : "hidden md:block"
      } fixed top-16 left-0 h-full w-[5rem] xl:w-[15rem] bg-neutral-900 border-r border-white/10 p-1 pt-4 px-4 transition-all`}
    >
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
                  ? "flex items-center text-indigo-300 font-bold py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-white focus-visible:ring-2"
                  : "flex items-center text-gray-300 font-bold py-2 px-3 rounded-lg hover:bg-white/5 no-underline focus:outline-none focus-visible:ring-white focus-visible:ring-2"
              }
            >
              {IconComponent && <IconComponent />}
              <div
                className={`${
                  isOpenMobile ? "block ms-3" : "hidden xl:block xl:ms-3"
                }`}
              >
                {link.name}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;

// interface SideNavProps {
//   isMobile: boolean;
//   closeSideNav: () => void;
//   isOpen: boolean;
// }

// const SideNav = ({ isMobile, closeSideNav, isOpen }: SideNavProps) => {
//   const pathName = usePathname();

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30"
//           onClick={closeSideNav}
//         />
//       )}

//       {/* SideNav */}
//       <aside
//         className={`fixed top-16 left-0 h-full bg-neutral-900 z-40 p-4 pt-16
//           ${isMobile ? "w-1/2" : "w-[5rem] xl:w-[15rem]"}
//           ${isMobile && !isOpen ? "hidden" : ""} transition-all`}
//       >
//         <nav className="grid space-y-1 text-sm">
//           {navLinks.map((link) => {
//             const isActive = pathName.startsWith(link.href);
//             const IconComponent = isActive ? link.filled : link.outlined;

//             return (
//               <Link
//                 href={link.href}
//                 key={link.name}
//                 className={`flex items-center ${
//                   isActive
//                     ? "text-indigo-300 font-bold bg-white/5 hover:bg-white/10"
//                     : "text-gray-300 font-bold hover:bg-white/5"
//                 } py-2 px-3 rounded-lg focus:outline-none focus-visible:ring-white focus-visible:ring-2`}
//               >
//                 <IconComponent />
//                 {/* Show name only on xl screens */}
//                 <div className="hidden xl:block ml-3">{link.name}</div>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default SideNav;
