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

export default async function DeckPage({
  params,
}: {
  params: { deckId: string };
}) {
  const deck = await fetchDeckById(params.deckId);
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
      {/* <Link
        href="/decks/"
        className="inline-block focus-visible:ring-white focus-visible:ring-2 focus:outline-none rounded-lg"
      >
        <div className="flex items-center">
          <div className="text-gray-200 text-lg hover:underline">Back</div>
        </div>
      </Link> */}
      {/* <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="max-w-3xl mx-auto">
        <div className="text-3xl font-semibold flex">{deck?.title}</div>
        <div className="text-white/50 mt-2 mb-4">{deck?.description}</div>
        <div className="flex w-full justify-between rounded-xl mb-8 lg:mb-12">
          <div>
            <div className="block text-xs text-white/50">Created by</div>
            <div className="flex items-center mt-2 h-[25px] text-white/80 font-semibold">
              <Image
                src={deck?.author.imageURL}
                width={25}
                height={25}
                className="rounded-full me-2"
              />
              {deck?.author.username}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {userIsAuthor && <EditModal deck={deck!} />}
            <button className="flex items-center border border-white/50 hover:border-white/65 hover:bg-white/10 p-2 rounded-lg text-white font-semibold transition-colors">
              <MoreHoriz />
            </button>
            <StudyButton deck={deck} isEmpty={isEmpty} userId={user!.id} />
          </div>
        </div>
        <Cards cards={cards} />
        <div className="w-full md:w-1/3">
          <div className="mt-8 mb-3 text-lg font-semibold">Leaderboard</div>
          <div className="p-2 bg-white/5 rounded-lg space-y-1">
            {deck?.students.map((student, index) => (
              <div
                key={index}
                className="font-semibold p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex gap-2">
                  <Image
                    src={student.imageURL}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm">{student.username}</div>
                    <div className="text-sm text-white/50">{student.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {userIsAuthor && (
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
        )}

        <div className="flex w-full justify-center">
          <div className="flex flex-col w-full md:w-2/3 items-center gap-y-4 gap-x-2 py-4">
            {cards!.length > 0 ? (
              <>
                <div className="font-semibold text-xl mt-8">In this deck</div>
                {cards?.map((card, index) => (
                  <div key={card.id}>
                    <hr className="mb-4 border border-white/5" />
                    <div className="flex">
                      <div className="flex items-center me-4">{index + 1}</div>
                      <input
                        type="text"
                        name="question"
                        id="question"
                        value={card.question}
                        className="w-full rounded-lg border border-white/15 bg-white/5 py-1.5 px-2 text-gray-200 focus:border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        name="answer"
                        id="answer"
                        value={card.answer}
                        className="w-full ms-2 rounded-lg border border-white/15 bg-white/5 py-1.5 px-2 text-gray-200 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-white text-center mt-12">
                No cards in this deck
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="text-white/50 text-xs">Last updated</div>
          <div className="flex text-white/75 text-sm mt-2 h-[25px] items-center">
            {deck?.updatedOn.toDateString()}
          </div>
        </div>
      </div> */}
      <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="text-3xl font-semibold flex">{deck?.title}</div>
        <div className="text-white/50 mt-2 mb-4">{deck?.description}</div>

        <div className="flex w-full justify-between rounded-xl mb-8 lg:mb-12">
          <div>
            <div className="block text-xs text-white/50">Created by</div>
            <div className="flex items-center mt-2 h-[25px] text-white/80 font-semibold">
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
            </div>
          </div>
          <div className="flex items-center gap-3">
            {userIsAuthor && <EditModal deck={deck!} />}
            <button className="flex items-center border border-white/50 hover:border-white/65 hover:bg-white/10 p-2 rounded-lg text-white font-semibold transition-colors">
              <MoreHoriz />
            </button>
            <StudyButton deck={deck} isEmpty={isEmpty} userId={user!.id} />
          </div>
        </div>

        {/* Leaderboard positioned at the top-right */}
        <div className="hidden 2xl:block absolute top-0 -right-[20rem] w-1/3 p-4">
          <Leaderboard deck={deck!} />
        </div>

        {/* Main content */}
        <Cards cards={cards} />

        {userIsAuthor && (
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
        )}

        <div className="2xl:hidden w-full">
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
