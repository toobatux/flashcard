import { fetchDeckById, getDeckScores } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Cards from "@/app/(main)/decks/[deckId]/(deckId)/components/Cards";
import StudyButton from "@/app/(main)/decks/[deckId]/(deckId)/components/StudyButton";
import Leaderboard from "@/app/(main)/decks/[deckId]/(deckId)/components/Leaderboard";
import MoreDropdown from "@/app/(main)/decks/[deckId]/(deckId)/components/MoreDropdown";
import KeyboardMessage from "@/app/(main)/decks/[deckId]/(deckId)/components/KeyboardMessage";
import GuideCard from "@/app/components/GuideCard";
import CardTable from "@/app/(main)/decks/[deckId]/(deckId)/components/CardTable";

export default async function DeckPage({
  params: { deckId },
}: {
  params: { deckId: string };
}) {
  const deck = await fetchDeckById(deckId);
  const cards = deck?.cards;
  const deckScores = await getDeckScores(deckId);
  const user = await currentUser();
  const userIsAuthor = user?.id === deck?.author.clerkId;
  const isEmpty = cards?.length === 0;

  return (
    <>
      <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        {!deck?.isPublic && (
          <div className="inline-block text-indigo-400 font-semibold text-xs mb-2">
            Private
          </div>
        )}
        <div className="text-black dark:text-white text-2xl lg:text-3xl font-bold flex">
          {deck?.title}
        </div>
        <div className="text-black dark:text-white/50 mt-3 mb-6">
          {deck?.description}
        </div>

        <div className="block text-xs text-black/90 dark:text-white/50">
          Created by
        </div>
        <div className="flex w-full items-center justify-between rounded-xl mt-1 mb-8 lg:mb-8">
          <div className="flex h-full">
            <Link
              href={`/profile/${deck?.author.clerkId}`}
              className="flex items-center text-black dark:text-white/80 font-semibold hover:underline"
            >
              {deck?.author.imageURL && (
                <Image
                  src={deck?.author.imageURL}
                  width={100}
                  height={100}
                  className="rounded-full me-2 object-cover w-8 h-8"
                  alt="Avatar"
                />
              )}
              {deck?.author.username}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {/* {userIsAuthor && <EditModal deck={deck!} />} */}
            <MoreDropdown userIsAuthor={userIsAuthor} deckId={deck!.id} />
            <StudyButton deck={deck} isEmpty={isEmpty} userId={user!.id} />
          </div>
        </div>

        {/* Leaderboard positioned at the top-right */}
        <div className="hidden 2xl:block absolute top-0 -right-[22rem] w-[20rem] p-4">
          {deck?.guide && (
            <>
              <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                Read the guide
              </div>
              <GuideCard guide={deck.guide} isSmall={true} />
            </>
          )}

          <Leaderboard deckScores={deckScores} />
        </div>

        {deck && deck?.cards.length > 0 ? (
          <div className="hidden lg:block mb-6">
            <KeyboardMessage />
          </div>
        ) : (
          <></>
        )}

        <Cards cards={cards} />
        <CardTable cards={cards} />

        <div className="2xl:hidden w-full my-8">
          {deck?.guide && (
            <>
              <div className="mt-[3rem] mb-4 text-lg lg:text-xl font-semibold">
                Read the guide
              </div>
              <GuideCard guide={deck.guide} isSmall={false} />
            </>
          )}

          <Leaderboard deckScores={deckScores} />
        </div>

        <div className="mt-12">
          <div className="text-white/50 text-xs">Last updated</div>
          <div className="flex text-white/75 text-sm mt-1 h-[25px] items-center">
            {deck?.updatedOn.toDateString().split(" ").slice(1).join(" ")}
          </div>
        </div>
      </div>
    </>
  );
}
