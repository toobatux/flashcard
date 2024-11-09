import { ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { Deck, Prisma } from "@prisma/client";
import DeckCard from "./DeckCard";

type DeckWithRelations = Prisma.DeckGetPayload<{
  include: { cards: true; author: true };
}>;

type RecentlyStudiedProps = {
  decks: DeckWithRelations[] | undefined | null;
};

export function RecentlyStudied({ decks }: RecentlyStudiedProps) {
  return (
    <>
      {decks && decks.length > 0 ? (
        <>
          <div className="rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decks?.map((deck) => (
                <div key={deck.id}>
                  <DeckCard deck={deck} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
