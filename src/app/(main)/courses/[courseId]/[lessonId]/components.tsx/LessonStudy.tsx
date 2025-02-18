import Link from "next/link";
import React from "react";

const LessonStudy = (lessonId: { params: { lessonId: string } }) => {
  return (
    // <Link
    //   href={`/${lessonId}/study`}
    //   className="bg-blue-700 hover:bg-blue-600 h-[40px] w-[96px] py-2 px-6 rounded-full font-medium transition-colors flex items-center justify-center"
    // >
    //   Learn
    // </Link>
    <div className="bg-blue-700 hover:bg-blue-600 h-[40px] w-[96px] py-2 px-6 rounded-full font-medium transition-colors flex items-center justify-center">
      Learn
    </div>
  );
};

export default LessonStudy;
