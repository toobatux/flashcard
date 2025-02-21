"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import React from "react";
import MoreDropdown from "./MoreDropdown";
import { Course, Difficulty, Lesson } from "@prisma/client";

export type CourseWithLessons = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  difficulty: Difficulty;
  lessons: Lesson[];
};

type CourseHeaderProps = {
  course: CourseWithLessons;
  userIsAuthor: boolean;
  isReviewTime: boolean;
};

export default function CourseHeader({
  course,
  userIsAuthor,
  isReviewTime,
}: CourseHeaderProps) {
  return (
    <>
      {/* Links */}
      {/* <div className="bg-gradient-to-b from-slate-800 to-transparent md:rounded-xl"> */}
      {/* <div className="p-6"> */}
      <div className="flex gap-2 font-light">
        <Link
          href="/courses/"
          className="text-white/50 hover:text-white hover:underline transition-colors"
        >
          Course
        </Link>
        {!course?.isPublic && (
          <div className="text-white/50">
            (<span className="">Private</span>)
          </div>
        )}
        <span className="text-white/50">{"/"}</span>
      </div>

      {/* Course title and description */}
      <div className="my-6 space-y-2">
        <div className="text-black dark:text-white text-3xl md:text-4xl font-bold flex">
          {course?.title}
        </div>
        <div className="text-black dark:text-white/50 font-light">
          {course?.description}
        </div>
      </div>

      {/* Lesson difficulty and number of lessons */}
      <div className="flex w-full items-center font-light">
        <div className="text-black/50 dark:text-white/50 flex gap-2 items-center">
          <span className="capitalize">{course?.difficulty.toLowerCase()}</span>
          <span>•</span>
          <span>
            {course!.lessons.length}{" "}
            {course!.lessons.length === 1 ? "lesson" : "lessons"}
          </span>
        </div>
      </div>

      {/* Course progress, More dropdown, and Learn/Review button row */}
      {/* bg-white/5 p-4 rounded-xl */}
      <div className="flex w-full items-center justify-between mt-3">
        <ProgressBar
          completed={1}
          maxCompleted={4}
          isLabelVisible={false}
          bgColor="rgb(37, 99, 235)"
          baseBgColor="gray"
          height="8px"
          className="w-full max-w-[200px] me-3"
        />
        <div className="flex gap-3">
          <MoreDropdown
            userIsAuthor={userIsAuthor}
            courseId={course!.id}
            course={course}
            isCoursePage={true}
          />
          <div
            className={`${
              isReviewTime
                ? "bg-white/95 hover:bg-white/70"
                : "border border-white/20 text-white/50 hover:bg-white/10 hover:text-white"
            } text-black h-[40px] w-[96px] py-2 px-6 rounded-xl font-medium transition-colors flex items-center justify-center`}
          >
            Learn
          </div>
          {/* <LessonStudy/> */}
        </div>
      </div>
      {/* </div> */}
      <hr className="w-full border border-white/5 mt-4 mb-8" />
      {/* </div> */}
      {/* <hr className="w-full border border-white/5 mt-4 mb-8" /> */}
    </>
  );
}
