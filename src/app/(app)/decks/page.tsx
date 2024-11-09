import { fetchPublicDecks } from "@/actions/actions";
import { auth } from "@clerk/nextjs/server";
import DeckCard from "../../components/DeckCard";

export default async function Decks() {
  auth().protect();
  // const { userId }: { userId: string | null } = auth();
  const decks = await fetchPublicDecks();
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">Decks</div>
        </div>

        <div className="my-8 lg:my-12">
          <div className="mb-3 text-lg text-white/70">All Decks</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map((deck) => (
              <div key={deck.id}>
                <DeckCard deck={deck} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
