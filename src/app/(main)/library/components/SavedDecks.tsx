import { getSavedDecksForUser } from "@/actions/actions";
import DeckCard from "@/app/components/DeckCard";

interface SavedDecksProps {
  clerkId: string;
}

export default async function SavedDecks({ clerkId }: SavedDecksProps) {
  const savedDecks = await getSavedDecksForUser(clerkId);

  if (!savedDecks || savedDecks.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedDecks.map((savedDeck) => (
          <div key={savedDeck.id}>
            <DeckCard deck={savedDeck} />
          </div>
        ))}
      </div>
    </>
  );
}
