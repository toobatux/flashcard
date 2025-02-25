import React, { Suspense } from "react";
import { fetchMyCourses, getUser, getUserById } from "@/actions/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import SavedDecks from "@/app/(main)/library/components/SavedDecks";
import MyDecksList from "./components/MyDecksList";
import MyDecksCardSkeleton from "@/app/components/loading/MyDecksCardSkeleton";
import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";
import Image from "next/image";

export default async function MyDecks() {
  auth().protect();
  const clerkUser = await currentUser();
  const user = await getUserById(clerkUser!.id);
  console.log(user);
  return (
    <>
      <div className="lg:my-6">
        <div className="flex items-center gap-4 mb-10">
          <Image
            src={clerkUser?.imageUrl}
            width={100}
            height={100}
            alt={user?.username || " "}
            className="rounded-full object-cover w-16 h-16"
          />
          <div className="flex flex-col">
            <div className="text-2xl text-white font-semibold">
              {clerkUser?.username}
            </div>
            <div className="text-white/50">{user?.score} xp</div>
          </div>
        </div>
        {/* <div className="flex w-full justify-between items-center">
          <div className="text-xl md:text-3xl font-bold">Library</div>
        </div> */}

        <div className="my-8 md:my-12">
          <div className="mb-3 text-lg text-white/70">My Courses</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense
              fallback={Array.from({ length: 4 }, (_, i) => (
                <MyDecksCardSkeleton key={i} />
              ))}
            >
              <MyDecksList />
            </Suspense>
          </ul>
        </div>

        <div className="my-8 lg:my-12">
          <div className="mb-3 text-lg text-white/70">Saved Courses</div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense
              fallback={Array.from({ length: 4 }, (_, i) => (
                <DeckCardSkeleton key={i} />
              ))}
            >
              <SavedDecks />
            </Suspense>
          </ul>
        </div>
      </div>
    </>
  );
}
