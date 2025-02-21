import { fetchCourseById, getCourseScores, getUser } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Cards from "@/app/(main)/courses/[courseId]/(courseId)/components/Cards";
import StudyButton from "@/app/(main)/courses/[courseId]/(courseId)/components/StudyButton";
import Leaderboard from "@/app/(main)/courses/[courseId]/(courseId)/components/Leaderboard";
import MoreDropdown from "@/app/(main)/courses/[courseId]/(courseId)/components/MoreDropdown";
import KeyboardMessage from "@/app/(main)/courses/[courseId]/(courseId)/components/KeyboardMessage";
import GuideCard from "@/app/components/GuideCard";
import CardTable from "@/app/(main)/courses/[courseId]/(courseId)/components/TermList";
import AuthorCard from "./components/AuthorCard";
import ProgressBar from "@ramonak/react-progress-bar";
import CourseHeader from "./components/CourseHeader";

export default async function CoursePage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseById(courseId);
  const lessons = course?.lessons;
  const courseScores = await getCourseScores(courseId);
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const userIsAuthor = user?.id === course?.author.id;
  const isEmpty = lessons?.length === 0;
  const isReviewTime = true;

  console.log(user?.activeCourseId);

  return (
    <>
      <div className="lg:my-6 transition-all"></div>
      <div className="flex flex-col xl:flex-row gap-2">
        <div className="relative flex flex-col w-full max-w-3xl mx-auto">
          <CourseHeader
            course={course}
            userIsAuthor={userIsAuthor}
            isReviewTime={isReviewTime}
          />
          <ul className="grid w-full gap-2">
            {lessons?.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`${course?.id}/${lesson.id}`}
                  className={`flex w-full h-full p-6 border-2 ${
                    user?.activeCourseId === lesson.lessonNumber
                      ? "border-blue-600"
                      : "border-white/10"
                  } hover:bg-white/5 rounded-2xl transition-colors`}
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Leaderboard positioned at the top-right */}
          <div className="hidden 2xl:block absolute top-0 -right-[22rem] w-[20rem] p-4">
            {/* <AuthorCard author={course!.author} /> */}
            {course?.guide && (
              <>
                <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                  Read the guide
                </div>
                {/* <GuideCard guide={course.guide} isSmall={true} /> */}
              </>
            )}

            {/* <Leaderboard courseScores={courseScores} /> */}
          </div>

          {course && course?.lessons.length > 0 ? (
            <div className="hidden lg:block mb-6">
              <KeyboardMessage />
            </div>
          ) : (
            <></>
          )}

          {/* <Cards cards={lessons} /> */}

          {/* <div className="2xl:hidden w-full my-14">
          {course?.guide && (
            <>
              <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                Read the guide
              </div>
              <GuideCard guide={course.guide} isSmall={false} />
            </>
          )}
          </div> */}

          {/* <CardTable cards={lessons} /> */}

          {/* <div className="2xl:hidden w-full my-8">
          <Leaderboard courseScores={courseScores} />
          </div> */}
          <div className="mt-10 font-light">
            <div className="text-white/50 text-xs">Last updated</div>
            <div className="flex text-white/75 text-sm mt-1 h-[25px] items-center">
              {course?.updatedOn.toDateString().split(" ").slice(1).join(" ")}
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto">
          Leaderboard
          {/* <Leaderboard deckScores={} /> */}
        </div>
      </div>
    </>
  );
}
