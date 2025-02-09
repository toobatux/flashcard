import { getSavedDecksForUser } from "@/actions/actions";
import DeckCard from "@/app/components/DeckCard";
import { currentUser } from "@clerk/nextjs/server";

export default async function SavedDecks() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    console.error("Error: no clerkUser found");
    return <div>Error: User not authenticated.</div>;
  }

  const savedDecks = await getSavedDecksForUser(clerkUser.id);

  if (!savedDecks || savedDecks.length === 0) return null;

  return (
    <>
      {savedDecks.map((savedDeck) => (
        <li key={savedDeck.id}>
          <DeckCard deck={savedDeck} />
        </li>
      ))}
    </>
  );
}
