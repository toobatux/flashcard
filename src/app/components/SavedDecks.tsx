import { getSavedDecksForUser } from "@/actions/actions";
import DeckCard from "./DeckCard";

interface SavedDecksProps {
  clerkId: string;
}

export default async function SavedDecks({ clerkId }: SavedDecksProps) {
  const savedDecks = await getSavedDecksForUser(clerkId);
  return (
    <>
      <div className="font-semibold mb-3 mt-6">Saved Decks</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedDecks?.map((savedDeck) => (
          <div key={savedDeck.id}>
            <DeckCard deck={savedDeck} />
          </div>
        ))}
      </div>
    </>
  );
}
