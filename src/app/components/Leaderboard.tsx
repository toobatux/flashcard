import { Deck, Prisma } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface LeaderboardProps {
  deck: DeckWithRelations;
}

type DeckWithRelations = Prisma.DeckGetPayload<{
  include: { students: true };
}>;

const Leaderboard = ({ deck }: LeaderboardProps) => {
  const isEmpty = deck.students.length === 0;
  return (
    <>
      {!isEmpty && (
        <>
          <div className="mt-8 mb-3 text-lg font-semibold">Leaderboard</div>
          <div className="p-2 border border-white/5 rounded-lg space-y-1 max-h-[10rem] 2xl:max-h-[15rem] overflow-auto">
            {deck?.students.map((student, index) => (
              <div
                key={index}
                className="p-2 hover:bg-white/5 rounded transition-colors"
              >
                <div className="flex gap-2">
                  <Image
                    src={student.imageURL}
                    width={20}
                    height={20}
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <div className="flex w-full justify-between">
                    <div className="text-sm">{student.username}</div>
                    <div className="text-sm text-white/50">{student.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Leaderboard;
