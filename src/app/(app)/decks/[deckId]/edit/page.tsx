import EditDeckForm from "@/app/components/EditDeckForm";

const EditDeckPage = ({ params }: { params: { deckId: string } }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="lg:my-6"></div>
      <div className="flex w-full justify-between items-center">
        <h1 className="dark:text-white text-xl md:text-2xl lg:text-3xl font-bold">
          Edit Deck
        </h1>
      </div>

      <div className="flex justify-center mt-4">
        <EditDeckForm deckId={params.deckId} />
      </div>
    </div>
  );
};

export default EditDeckPage;
