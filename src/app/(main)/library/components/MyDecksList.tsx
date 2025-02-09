import { fetchMyDecks, getUser } from "@/actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import MyDecksCard from "./MyDecksCard";

const MyDecksList = async () => {
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
      {decks.map((deck) => (
        <li key={deck.id}>
          <MyDecksCard deck={deck} />
        </li>
      ))}
    </>
  );
};

export default MyDecksList;
