import React from "react";
import { RecentlyStudied } from "../../components/RecentlyStudied";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/actions/actions";
import Greeting from "../../components/Greeting";

async function fetchUserData() {
  const clerkUser = await currentUser();
  if (!clerkUser) return undefined;
  return getUser(clerkUser.id);
}

export default async function Home() {
  const user = await fetchUserData();

  return (
    <>
      <div className="lg:my-6 my-4">
        <Greeting user={user} />

        <div className="my-8 lg:my-12">
          <div className="text-lg text-white/70 mb-3">Recently studied</div>
          <RecentlyStudied decks={user?.lastStudiedDecks} />
        </div>
      </div>
    </>
  );
}
