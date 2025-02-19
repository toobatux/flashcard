import { ChevronRight } from "@mui/icons-material";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: { lessons: true; author: true; savedBy: true; students: true };
}>;

type MyCourseCardProps = {
  course: CourseWithRelations | undefined | null;
};

const MyDecksCard = ({ course }: MyCourseCardProps) => {
  return (
    <Link
      href={`/courses/${course?.id}`}
      className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
    >
      <div className="text-sm relative h-[105px] p-4 bg-white/5 hover:bg-white/10 group rounded-xl shadow-lg transition-all flex flex-col justify-between">
        <div className="text-white/85 h-[40px] font-semibold me-5 line-clamp-2 overflow-ellipsis">
          {course?.title}
        </div>
        <div className="flex items-center mt-2 me-5">
          <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
            {course?.lessons.length}{" "}
            {course?.lessons.length === 1 ? "lesson" : "lessons"}
          </div>
          {!course?.isPublic && (
            <LockOutlinedIcon fontSize="small" className="ms-2 text-white/50" />
          )}
        </div>
        <div className="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 right-3 top-1/2 transform -translate-y-1/2">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default MyDecksCard;
