import { Add } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { fetchMyDecks, getUser } from "@/actions/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import MyDecksCard from "@/app/components/MyDecksCard";
import SavedDecks from "@/app/components/SavedDecks";

export default async function MyDecks() {
  auth().protect();
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const decks = await fetchMyDecks(user!.id);
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">
            Library
          </div>
        </div>

        <div className="font-semibold mb-3 mt-6">My Decks</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decks.map((deck) => (
            <div key={deck.id}>
              <MyDecksCard deck={deck} />
            </div>
          ))}
        </div>

        <SavedDecks clerkId={clerkUser!.id} />
      </div>
    </>
  );
}
