import { fetchPublicDecks } from "@/actions/actions";
import DeckCard from "@/app/components/DeckCard";

const DeckCardList = async () => {
  const decks = await fetchPublicDecks();
  return (
    <>
      {decks.map((deck) => (
        <li key={deck.id}>
          <DeckCard deck={deck} />
        </li>
      ))}
    </>
  );
};

export default DeckCardList;
