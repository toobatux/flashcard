import { ChevronRight } from "@mui/icons-material";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type DeckWithRelations = Prisma.DeckGetPayload<{
  include: { cards: true; author: true; savedBy: true; students: true };
}>;

type MyDecksCardProps = {
  deck: DeckWithRelations | undefined | null;
};

const MyDecksCard = ({ deck }: MyDecksCardProps) => {
  return (
    <Link
      href={`/decks/${deck?.id}`}
      className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
    >
      <div className="text-sm relative h-[105px] p-4 bg-white/5 hover:bg-white/10 group rounded-xl shadow-lg transition-all flex flex-col justify-between">
        <div className="text-white/85 h-[40px] font-semibold me-5 line-clamp-2 overflow-ellipsis">
          {deck?.title}
        </div>
        <div className="flex items-center mt-2 me-5">
          <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5">
            {deck?.cards.length} {deck?.cards.length === 1 ? "term" : "terms"}
          </div>
          {!deck?.isPublic && (
            <LockOutlinedIcon fontSize="small" className="ms-2 text-white/50" />
          )}
        </div>
        <div className="absolute z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 right-3 top-1/2 transform -translate-y-1/2">
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default MyDecksCard;
