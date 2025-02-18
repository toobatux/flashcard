import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { ChevronRight } from "@mui/icons-material";
import { Course, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: { lessons: true; author: true };
}>;

type CourseCardProps = {
  course: CourseWithRelations | undefined | null;
};

// const DeckCard = ({ deck }: DeckCardProps) => {
//   return (
//     <Link
//       href={`/decks/${deck?.id}`}
//       className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
//     >
//       <div className="text-sm relative h-[102px] p-4 bg-white/5 hover:bg-white/10 border border-white/10 group rounded-lg shadow-lg transition-all">
//         <div className="text-white/85 font-bold me-4 line-clamp-2 overflow-ellipsis">
//           {deck?.title}
//         </div>
//         <div className="flex items-center mt-2">
//           <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
//             {deck?.cards.length} {deck?.cards.length === 1 ? "term" : "terms"}
//           </div>
//           <div className="flex items-center text-white/60">
//             <div className="mx-1.5">•</div>
//             <div className="text-sm">by {deck?.author.username}</div>
//           </div>
//         </div>

//         <div className="absolute z-20 hidden group-hover:flex right-3 top-1/2 transform -translate-y-1/2">
//           <ChevronRight />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default DeckCard;

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${course?.id}`}
      className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
    >
      <div className="text-sm relative h-[140px] p-4 border-2 border-white/10 hover:bg-white/5 group rounded-xl transition-all flex flex-col justify-between">
        <div className="text-white/85 h-[40px] font-semibold me-5 line-clamp-2 overflow-ellipsis">
          {course?.title}
        </div>
        <div className="flex items-center me-5">
          <div className="text-xs font-light text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
            {course?.lessons.length}{" "}
            {course?.lessons.length === 1 ? "lesson" : "lessons"}
          </div>
        </div>
        <div className="flex items-center text-white/60">
          <div className="flex w-5 h-5 me-2">
            <ClerkLoading>
              <div className="w-full h-full rounded-full bg-white/5 animate-pulse"></div>
            </ClerkLoading>
            <ClerkLoaded>
              <Image
                src={course!.author.imageURL}
                width={100}
                height={100}
                alt="Avatar"
                className="object-cover rounded-full"
              />
            </ClerkLoaded>
          </div>
          <div className="text-sm font-light">{course?.author.username}</div>
        </div>
        <div className="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 right-3 top-1/2 transform -translate-y-1/2">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
