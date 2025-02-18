import React from "react";
import { fetchCourseById, getUser } from "@/actions/actions";
import StudyCards from "@/app/(main)/courses/[courseId]/study/components/StudyCards";
import { Close } from "@mui/icons-material";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import ProgressBar from "@ramonak/react-progress-bar";
import Progress from "./components/Progress";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const course = await fetchCourseById(params.courseId);
  return (
    <>
      <div className="absolute inset-0 z-40 w-full h-full app-bg">
        <div className="max-w-3xl mx-auto mt-2 p-5">
          <div className="flex w-full justify-between items-center rounded-lg">
            <div className="text-lg font-semibold text-white/80">
              Studying: {course?.title}
            </div>
            <Link
              href={`/courses/${course?.id}`}
              className="flex items-center p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Close />
            </Link>
          </div>
          <div className="w-full justify-center mt-4">
            <Progress />
          </div>
          <div className="mt-20">
            {/* <StudyCards
            initialCards={deck?.cards}
            deckId={deck!.id}
            user={user}
          /> */}
          </div>
          <div className="flex justify-center items-center mt-20">
            <div className="bg-white/5 py-2 px-4 rounded-lg text-white/60">
              {user?.username}'s total score: {user?.score}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
