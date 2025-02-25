import { getSavedCoursesForUser } from "@/actions/actions";
import CourseCard from "@/app/components/DeckCard";
import { currentUser } from "@clerk/nextjs/server";

export default async function SavedDecks() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    console.error("Error: no clerkUser found");
    return <div>Error: User not authenticated.</div>;
  }

  const savedCourses = await getSavedCoursesForUser(clerkUser.id);

  // if (!savedCourses || savedCourses.length === 0) return null;

  return (
    <>
      {savedCourses?.map((savedCourse) => (
        <li key={savedCourse.id}>
          <CourseCard course={savedCourse} />
        </li>
      ))}
    </>
  );
}
