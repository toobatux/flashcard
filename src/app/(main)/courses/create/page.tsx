import CreateDeckForm from "@/app/forms/CreateDeckForm";

export default function Create() {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="lg:my-6"></div>
        <div className="flex w-full justify-between items-center">
          <h1 className="dark:text-white text-xl font-bold">Create a Course</h1>
        </div>
        <hr className="border border-white/5 mt-4" />

        <div className="flex max-w-xl mx-auto justify-center mt-8">
          <CreateDeckForm />
        </div>
      </div>
    </>
  );
}
