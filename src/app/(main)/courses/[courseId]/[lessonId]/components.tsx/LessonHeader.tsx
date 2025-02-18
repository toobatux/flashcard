"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MoreDropdown from "../../(courseId)/components/MoreDropdown";
import ProgressBar from "@ramonak/react-progress-bar";

type LessonHeader = {
  lesson: any;
  terms: any;
  userIsAuthor: boolean;
  isReviewTime: boolean;
};

export default function LessonHeader({
  lesson,
  terms,
  userIsAuthor,
  isReviewTime,
}: LessonHeader) {
  return (
    <>
      <div className="">
        <div className="flex gap-2 font-light mb-3">
          <Link
            href="/courses/"
            className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            Course
          </Link>
          <span className="text-black/50 dark:text-white/50">{"/"}</span>
          <Link
            href={`/courses/${lesson.courseId}`}
            className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:underline transition-colors"
          >
            {lesson.course.title}
          </Link>
          <span className="text-white/50">{"/"}</span>
        </div>
        <div className="text-black dark:text-white text-3xl md:text-4xl font-bold flex my-6">
          {lesson.id}: {lesson.title}
        </div>
        {/* <div className="flex w-full justify-between items-center mt-6 font-light">
          <div className="text-black/50 dark:text-white/50 flex gap-2 items-center">
            <span className="capitalize">
              {lesson.course?.difficulty.toLowerCase()}
            </span>
            <span>•</span>
            <span>
              {terms.length} {terms.length === 1 ? "term" : "terms"}
            </span>
          </div>
          <div className="flex gap-3">
            <MoreDropdown
              userIsAuthor={userIsAuthor}
              courseId={lesson.course.id}
            />
            <div
              className={`${
                isReviewTime
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "border border-white/20 text-white/50 hover:bg-white/10 hover:text-white"
              } text-white h-[40px] w-[96px] py-2 px-6 rounded-full font-medium transition-colors flex items-center justify-center`}
            >
              Learn
            </div>
            <LessonStudy/>
          </div>
        </div> */}
        <div className="flex w-full items-center mt-3 font-light">
          <div className="text-black/50 dark:text-white/50 flex gap-2 items-center">
            <span className="capitalize">
              {lesson.course?.difficulty.toLowerCase()}
            </span>
            <span>•</span>
            <span>
              {terms.length} {terms.length === 1 ? "term" : "terms"}
            </span>
          </div>
        </div>
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
              courseId={lesson.course.id}
              course={lesson.course}
              isCoursePage={false}
            />
            <div
              className={`${
                isReviewTime
                  ? "bg-blue-700 hover:bg-blue-600"
                  : "border border-white/20 text-white/50 hover:bg-white/10 hover:text-white"
              } text-white h-[40px] w-[96px] py-2 px-6 rounded-xl font-medium transition-colors flex items-center justify-center`}
            >
              Learn
            </div>
            {/* <LessonStudy/> */}
          </div>
        </div>
        {/* <hr className="border border-black/10 dark:border-white/5 mt-6" /> */}
      </div>
    </>
  );
}
