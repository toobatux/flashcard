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
        <LessonBody terms={terms} />
      </div>
    </>
  );
}
