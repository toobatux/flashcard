import { fetchPublicCourses } from "@/actions/actions";
import DeckCard from "@/app/components/DeckCard";

const DeckCardList = async () => {
  const courses = await fetchPublicCourses();
  return (
    <>
      {courses.map((course) => (
        <li key={course.id}>
          <DeckCard course={course} />
        </li>
      ))}
    </>
  );
};

export default DeckCardList;
