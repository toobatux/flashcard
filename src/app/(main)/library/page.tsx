import React from "react";
import { fetchMyDecks, getUser } from "@/actions/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import MyDecksCard from "@/app/(main)/library/components/MyDecksCard";
import SavedDecks from "@/app/(main)/library/components/SavedDecks";

export default async function MyDecks() {
  auth().protect();
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

  const decks = await fetchMyDecks(user.id);

  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">
            Library
          </div>
        </div>

        <div className="my-8 lg:my-12">
          <div className="mb-3 text-lg text-white/70">My Decks</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map((deck) => (
              <div key={deck.id}>
                <MyDecksCard deck={deck} />
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 lg:my-12">
          <div className="mb-3 text-lg text-white/70">Saved Decks</div>
          <SavedDecks clerkId={clerkUser!.id} />
        </div>
      </div>
    </>
  );
}
