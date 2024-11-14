import React, { Suspense } from "react";
import { RecentlyStudied } from "./components/RecentlyStudied";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/actions/actions";
import Greeting from "./components/Greeting";
import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";
import GreetingSkeleton from "@/app/(main)/home/components/GreetingSkeleton";

async function fetchUserData() {
  const clerkUser = await currentUser();
  if (!clerkUser) return undefined;
  return getUser(clerkUser.id);
}

export default async function Home() {
  auth().protect();
  const user = await fetchUserData();

  return (
    <>
      <div className="lg:my-6 my-4">
        <Suspense fallback={<GreetingSkeleton />}>
          <Greeting user={user} />
        </Suspense>

        <div className="my-8 lg:my-12">
          <div className="text-lg text-white/70 mb-3">Recently studied</div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DeckCardSkeleton />
                <DeckCardSkeleton />
              </div>
            }
          >
            <RecentlyStudied decks={user?.lastStudiedDecks} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
