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
          <div className="my-8 lg:my-12">
            <div className="text-lg text-white/70 mb-3">Recently studied</div>
            <div className="rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {decks?.map((deck) => (
                  // <Link
                  //   href={`/decks/${deck.id}`}
                  //   key={deck.id}
                  //   className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
                  // >
                  //   <div className="text-sm relative h-full p-4 bg-white/5 border border-white/10 hover:bg-white/10 group rounded-lg shadow-lg transition-all">
                  //     <div className="text-white/85 font-bold">
                  //       {deck.title}
                  //     </div>
                  //     <div className="flex items-center mt-2">
                  //       <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
                  //         {deck.cards.length}{" "}
                  //         {deck.cards.length === 1 ? "term" : "terms"}
                  //       </div>
                  //       <div className="flex items-center text-white/60">
                  //         {/* <Image
                  //           src={deck.author.imageURL}
                  //           width={20}
                  //           height={20}
                  //           alt="avatar"
                  //           className="rounded-full me-1.5"
                  //           quality={20}
                  //         /> */}
                  //         <div className="mx-1.5">•</div>
                  //         <div className="text-sm">
                  //           by {deck.author.username}
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <div className="absolute z-20 hidden group-hover:flex right-3 top-1/2 transform -translate-y-1/2">
                  //       <ChevronRight />
                  //     </div>
                  //   </div>
                  // </Link>
                  <div key={deck.id}>
                    <DeckCard deck={deck} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
