import { fetchCourseById } from "@/actions/actions";
import EditDeckForm from "@/app/forms/EditDeckForm";
import Link from "next/link";

export default async function EditDeckPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await fetchCourseById(params.courseId);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="lg:my-6">
        <Link href={`/courses/${params.courseId}`} className="hover:underline">
          Back to course
        </Link>
      </div>
      <div className="w-full items-center">
        <div className="text-white/50 mb-3">Editing</div>
        <h1 className="dark:text-white text-xl font-bold">{course?.title}</h1>
      </div>
      <hr className="border border-white/5 mt-4" />

      <div className="flex max-w-xl mx-auto justify-center mt-8">
        {/* <EditDeckForm course={course} /> */}
      </div>
    </div>
  );
}
