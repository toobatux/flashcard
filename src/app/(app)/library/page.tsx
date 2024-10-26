import { Add } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { fetchMyDecks, getUser } from "@/actions/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import MyDecksCard from "@/app/components/MyDecksCard";

export default async function MyDecks() {
  auth().protect();
  const clerkUser = await currentUser();
  const user = await getUser(clerkUser!.id);
  const decks = await fetchMyDecks(user!.id);
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold">
            Library
          </div>
        </div>

        <div className="font-semibold mb-3 mt-6">My Decks</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decks.map((deck) => (
            // <Link
            //   href={`/decks/${deck.id}`}
            //   key={deck.id}
            //   className="focus:outline-none focus-visible:ring-white focus-visible:ring-2 rounded-lg"
            // >
            //   <div className="relative h-full p-4 bg-white/5 border border-white/10 hover:bg-white/10 group rounded-lg shadow-lg transition-all">
            //     <div className="text-white/85 font-bold">{deck.title}</div>
            //     <div className="text-xs text-white/55 bg-white/10 inline-block rounded-full px-2 py-0.5 mt-1.5">
            //       {deck.cards.length}{" "}
            //       {deck.cards.length === 1 ? "term" : "terms"}
            //     </div>
            //     {/* <div className="text-neutral-200 mb-2">
            //         {deck.description}
            //       </div> */}
            //     <div className="flex items-center mt-3">
            //       <Image
            //         src={deck.author.imageURL}
            //         width={20}
            //         height={20}
            //         alt="avatar"
            //         className="rounded-full me-2"
            //         quality={20}
            //       />
            //       <div className="text-white/60 text-sm">
            //         {deck.author.username}
            //       </div>
            //     </div>
            //     <div className="absolute z-20 hidden group-hover:flex right-3 top-1/2 transform -translate-y-1/2">
            //       <ChevronRight />
            //     </div>
            //   </div>
            // </Link>
            <div key={deck.id}>
              <MyDecksCard deck={deck} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
