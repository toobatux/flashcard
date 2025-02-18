import { Prisma } from "@prisma/client";
import CourseCard from "@/app/components/DeckCard";

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: { lessons: true; author: true };
}>;

type RecentlyStudiedProps = {
  courses: CourseWithRelations[] | undefined | null;
};

export function RecentlyStudied({ courses }: RecentlyStudiedProps) {
  return (
    <>
      {courses && courses.length > 0 ? (
        <>
          <div className="rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses?.map((Course) => (
                <div key={Course.id}>
                  <CourseCard course={Course} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
