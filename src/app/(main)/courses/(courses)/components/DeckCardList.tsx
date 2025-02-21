import { fetchPublicCourses } from "@/actions/actions";
import DeckCard from "@/app/components/DeckCard";
import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";
import { Suspense } from "react";

const DeckCardList = async () => {
  const courses = await fetchPublicCourses();
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense
          fallback={Array.from({ length: 20 }, (_, i) => (
            <DeckCardSkeleton key={i} />
          ))}
        >
          {courses.map((course) => (
            <li key={course.id}>
              <DeckCard course={course} />
            </li>
          ))}
        </Suspense>
      </ul>
    </>
  );
};

export default DeckCardList;
