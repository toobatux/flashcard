import { Deck, DeckScore, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LeaderboardProps {
  deckScores: {
    user: {
      id: string;
      username: string | null; // Allow username to be nullable
      imageURL: string;
    };
    deckId: string;
    id: string;
    score: number;
    userId: string;
  }[];
}

// interface LeaderboardProps {
//   deckScores: (DeckScore & {
//     user: { id: string; username: string; imageURL: string };
//   })[];
// }

const Leaderboard = ({ deckScores }: LeaderboardProps) => {
  const isEmpty = deckScores.length === 0;
  const sortedDeckScores = [...deckScores].sort((a, b) => b.score - a.score);

  return (
    <>
      {!isEmpty && (
        <>
          <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
            Leaderboard
          </div>
          <div className="p-2 border-2 border-white/5 rounded-lg space-y-1 max-h-[10rem] 2xl:max-h-[15rem] overflow-auto">
            {sortedDeckScores.map((deckScore, index) => (
              <Link
                key={index}
                href={`/profile/${deckScore.user.id}`}
                className="flex w-full items-center justify-between p-2 hover:bg-white/5 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={deckScore.user.imageURL}
                    width={100}
                    height={100}
                    alt="Avatar"
                    className="rounded-full object-cover w-6 h-6"
                  />
                  <div className="text-sm">{deckScore.user.username}</div>
                </div>
                <div>
                  <div className="text-sm text-white/50">{deckScore.score}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Leaderboard;
