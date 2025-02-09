import React, { Suspense } from "react";
import { fetchMyDecks, getUser } from "@/actions/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import MyDecksCard from "@/app/(main)/library/components/MyDecksCard";
import SavedDecks from "@/app/(main)/library/components/SavedDecks";
import MyDecksList from "./components/MyDecksList";
import MyDecksCardSkeleton from "@/app/components/loading/MyDecksCardSkeleton";
import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";

export default async function MyDecks() {
  auth().protect();

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
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense
              fallback={Array.from({ length: 4 }, (_, i) => (
                <MyDecksCardSkeleton key={i} />
              ))}
            >
              <MyDecksList />
            </Suspense>
          </ul>
        </div>

        <div className="my-8 lg:my-12">
          <div className="mb-3 text-lg text-white/70">Saved Decks</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense
              fallback={Array.from({ length: 4 }, (_, i) => (
                <DeckCardSkeleton key={i} />
              ))}
            >
              <SavedDecks />
            </Suspense>
          </ul>
        </div>
      </div>
    </>
  );
}
