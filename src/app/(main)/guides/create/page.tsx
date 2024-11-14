import { fetchMyDecks, getUser } from "@/actions/actions";
import NewGuideForm from "@/app/forms/NewGuideForm";
import { currentUser } from "@clerk/nextjs/server";

const NewGuide = async () => {
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const myDecks = await fetchMyDecks(user!.id);
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="relative max-w-3xl mx-auto">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">
            New Guide
          </div>
          <NewGuideForm myDecks={myDecks} />
        </div>
      </div>
    </>
  );
};

export default NewGuide;
