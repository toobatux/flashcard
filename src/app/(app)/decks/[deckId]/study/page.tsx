import React from "react";
import { fetchDeckById, getUser } from "@/actions/actions";
import StudyCards from "@/app/components/StudyCards";
import { Close } from "@mui/icons-material";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({ params }: { params: { deckId: string } }) {
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const deck = await fetchDeckById(params.deckId);
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex w-full justify-between items-center rounded-lg">
          <div className="text-lg font-semibold text-white/80">
            Studying: {deck?.title}
          </div>
          <Link
            href={`/decks/${deck?.id}`}
            className="flex items-center p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Close />
          </Link>
        </div>
        <div className="mt-20">
          <StudyCards initialCards={deck?.cards} deckId={deck!.id} />
        </div>
        <div className="flex justify-center items-center mt-20">
          <div className="bg-white/5 py-2 px-4 rounded-lg text-white/60">
            {user?.username}'s total score: {user?.score}
          </div>
        </div>
      </div>
    </>
  );
}
