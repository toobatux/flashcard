import { fetchPublicCourses } from "@/actions/actions";
import { auth } from "@clerk/nextjs/server";
import DeckCard from "@/app/components/DeckCard";
import { Suspense } from "react";
import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";
import DeckCardList from "./components/DeckCardList";
import FilterButtons from "./components/FilterButtons";

export default async function Decks() {
  auth().protect();
  // const { userId }: { userId: string | null } = auth();
  return (
    <>
      <div className="flex w-full justify-between items-center lg:mt-6">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">Courses</div>
      </div>

      <div className="my-4 lg:my-8">
        <FilterButtons />
        {/* <div className="mb-3 text-lg text-white/70">All Courses</div> */}
        <DeckCardList />
      </div>
    </>
  );
}
