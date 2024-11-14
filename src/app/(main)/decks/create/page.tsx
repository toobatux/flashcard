import CreateDeckForm from "@/app/forms/CreateDeckForm";

export default function Create() {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="lg:my-6"></div>
        <div className="flex w-full justify-between items-center">
          <h1 className="dark:text-white text-xl md:text-2xl lg:text-3xl font-bold">
            New Deck
          </h1>
        </div>

        <div className="flex justify-center mt-4">
          <CreateDeckForm />
        </div>
      </div>
    </>
  );
}
