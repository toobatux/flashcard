import { ChevronRight } from "@mui/icons-material";
import { Deck, Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type DeckWithRelations = Prisma.DeckGetPayload<{
  include: { cards: true; author: true };
}>;

type DeckCardProps = {
  deck: DeckWithRelations | undefined | null;
};

// const DeckCard = ({ deck }: DeckCardProps) => {
//   return (
//     <Link
//       href={`/decks/${deck?.id}`}
//       className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
//     >
//       <div className="text-sm relative h-[102px] p-4 bg-white/5 hover:bg-white/10 border border-white/10 group rounded-lg shadow-lg transition-all">
//         <div className="text-white/85 font-bold me-4 line-clamp-2 overflow-ellipsis">
//           {deck?.title}
//         </div>
//         <div className="flex items-center mt-2">
//           <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
//             {deck?.cards.length} {deck?.cards.length === 1 ? "term" : "terms"}
//           </div>
//           <div className="flex items-center text-white/60">
//             <div className="mx-1.5">•</div>
//             <div className="text-sm">by {deck?.author.username}</div>
//           </div>
//         </div>

//         <div className="absolute z-20 hidden group-hover:flex right-3 top-1/2 transform -translate-y-1/2">
//           <ChevronRight />
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default DeckCard;

const DeckCard = ({ deck }: DeckCardProps) => {
  return (
    <Link
      href={`/decks/${deck?.id}`}
      className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
    >
      <div className="text-sm relative h-[102px] p-4 bg-white/5 hover:bg-white/10 border border-white/10 group rounded-lg shadow-lg transition-all flex flex-col justify-between">
        <div className="text-white/85 font-bold me-4 line-clamp-2 overflow-ellipsis">
          {deck?.title}
        </div>
        <div className="flex items-center mt-2">
          <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
            {deck?.cards.length} {deck?.cards.length === 1 ? "term" : "terms"}
          </div>
          <div className="flex items-center text-white/60">
            <div className="mx-1.5">•</div>
            <div className="text-sm">by {deck?.author.username}</div>
          </div>
        </div>
        <div className="absolute z-20 hidden group-hover:flex right-3 top-1/2 transform -translate-y-1/2">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default DeckCard;
