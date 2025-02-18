import { fetchMyCourses, getUser } from "@/actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import MyCoursesCard from "./MyCoursesCard";

const MyDecksList = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    console.error("Error: no clerkUser found");
    return <div>Error: User not authenticated.</div>;
  }

  const user = await getUser(clerkUser!.id);

  if (!user) {
    console.error("Error: No user found");
    return <div>Error: User data not found</div>;
  }

  const courses = await fetchMyCourses(user.id);
  return (
    <>
      {courses.map((course) => (
        <li key={course.id}>
          <MyCoursesCard course={course} />
        </li>
      ))}
    </>
  );
};

export default MyDecksList;
