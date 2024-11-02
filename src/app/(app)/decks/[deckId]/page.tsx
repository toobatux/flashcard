import {
  createCard,
  fetchDeckById,
  updateRecentDecks,
} from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import Cards from "@/app/components/Cards";
import StudyButton from "@/app/components/StudyButton";
import EditModal from "@/app/components/EditModal";
import { MoreHoriz } from "@mui/icons-material";
import Leaderboard from "@/app/components/Leaderboard";
import MoreDropdown from "@/app/components/MoreDropdown";
import KeyboardMessage from "@/app/components/KeyboardMessage";

export default async function DeckPage({
  params: { deckId },
}: {
  params: { deckId: string };
}) {
  const deck = await fetchDeckById(deckId);
  const cards = deck?.cards;
  const user = await currentUser();
  const userIsAuthor = user?.id === deck?.author.clerkId;
  const isEmpty = cards?.length === 0;
  console.log(deck?.id);
  // function handleStudy() {
  //   updateRecentDecks(user!.id, deck!.id);
  // }

  return (
    <>
      <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        {!deck?.isPublic && (
          <div className="inline-block text-indigo-400 font-semibold text-xs mb-2">
            Private
          </div>
        )}
        <div className="text-xl md:text-2xl lg:text-3xl font-bold flex">
          {deck?.title}
        </div>
        <div className="text-white/50 mt-3 mb-6">{deck?.description}</div>

        <div className="flex w-full justify-between rounded-xl mb-8 lg:mb-8">
          <div>
            <div className="block text-xs text-white/50">Created by</div>
            <Link
              href={`/profile/${deck?.author.clerkId}`}
              className="flex items-center mt-2 h-[25px] text-white/80 font-semibold"
            >
              {deck?.author.imageURL && (
                <Image
                  src={deck?.author.imageURL}
                  width={25}
                  height={25}
                  className="rounded-full me-2"
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
        <div className="hidden 2xl:block absolute top-0 -right-[20rem] w-1/3 p-4">
          <Leaderboard deck={deck!} />
        </div>

        {deck && deck?.cards.length > 0 ? (
          <div className="hidden lg:block mb-6">
            <KeyboardMessage />
          </div>
        ) : (
          <></>
        )}

        {/* Main content */}
        <Cards cards={cards} />

        {/* {userIsAuthor && (
          <div className="flex w-full justify-center mt-20">
            <div className="flex flex-col w-full md:w-2/3 items-center space-y-6 py-8">
              <form
                action={createCard}
                className="w-full flex sm:flex-row sm:gap-4"
              >
                <input type="hidden" name="deckId" value={deck?.id} />
                <div className="w-full">
                  <label
                    htmlFor="question"
                    className="block text-sm font-bold tracking-wide text-gray-200"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    placeholder="Question..."
                    className="w-full mt-2 rounded-lg border border-white/15 bg-white/5 py-1.5 px-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="answer"
                    className="block text-sm font-bold tracking-wide text-gray-200"
                  >
                    Answer
                  </label>
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    placeholder="Answer..."
                    className="w-full mt-2 rounded-lg border border-white/15 bg-white/5 py-1.5 px-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end justify-center sm:justify-start">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )} */}

        {deck && deck.cards.length > 0 && (
          <>
            <div className="mt-[6rem] mb-2 text-lg lg:text-xl font-semibold">
              Cards in this deck
            </div>
            {deck?.cards.map((card, index) => (
              <div key={card.id}>
                <div className="flex w-full items-center gap-6 p-3 rounded-lg bg-white/5 mb-2">
                  <div className="text-white/50 ms-2">{index + 1}</div>
                  <div className="w-full">{card.question}</div>
                  <div className="w-full">{card.answer}</div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="2xl:hidden w-full my-[3rem]">
          <Leaderboard deck={deck!} />
        </div>

        <div className="mt-8">
          <div className="text-white/50 text-xs">Last updated</div>
          <div className="flex text-white/75 text-sm mt-2 h-[25px] items-center">
            {deck?.updatedOn.toDateString()}
          </div>
        </div>
      </div>
    </>
  );
}
