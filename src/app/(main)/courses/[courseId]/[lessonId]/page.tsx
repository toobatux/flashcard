import {
  fetchLessonById,
  getTermsWithProgress,
  getUser,
} from "@/actions/actions";
import React from "react";
import TermList from "../(courseId)/components/TermList";
import { currentUser } from "@clerk/nextjs/server";
import LessonHeader from "./components.tsx/LessonHeader";
import Leaderboard from "../(courseId)/components/Leaderboard";
import LessonBody from "./components.tsx/LessonBody";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default async function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lessonId = Number(params.lessonId);
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const lesson = await fetchLessonById(lessonId);
  const terms = await getTermsWithProgress(lessonId, user!.id);
  const userIsAuthor = user?.id === lesson?.course.author.clerkId;
  const isReviewTime = true;

  return (
    <>
      <div className="lg:my-6 transition-all"></div>
      <div className="relative flex flex-col w-full max-w-3xl mx-auto">
        <LessonHeader
          lesson={lesson}
          terms={terms}
          userIsAuthor={userIsAuthor}
          isReviewTime={isReviewTime}
        />
        {/* <TermList terms={terms} /> */}

        <div className="flex w-full justify-between gap-2 mt-4 text-sm text-white/50">
          {lesson.lessonNumber > 1 && (
            <Link
              href={`/courses/${lesson.courseId}/${lesson.lessonNumber - 1}`}
              className="flex items-center px-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronLeft />
              <span className="px-2">Lesson {lesson.lessonNumber - 1}</span>
            </Link>
          )}
          {lesson.lessonNumber < lesson.course._count.lessons && (
            <Link
              href={`/courses/${lesson.courseId}/${lesson.lessonNumber + 1}`}
              className="flex items-center px-2 py-2 ml-auto rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="px-2">Lesson {lesson.lessonNumber + 1}</span>
              <ChevronRight />
            </Link>
          )}
        </div>
        {/* <hr className="border border-black/10 dark:border-white/5" /> */}

        <LessonBody terms={terms} />
      </div>
    </>
  );
}
