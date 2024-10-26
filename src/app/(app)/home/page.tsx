import React from "react";
import { RecentlyStudied } from "../../components/RecentlyStudied";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/actions/actions";
import Greeting from "../../components/Greeting";

export default async function Home() {
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  return (
    <>
      <div className="lg:my-6 my-4">
        <Greeting />
        <RecentlyStudied decks={user?.lastStudiedDecks} />
      </div>
    </>
  );
}
