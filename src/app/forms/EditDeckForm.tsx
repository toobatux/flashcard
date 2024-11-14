// import { editDeck, fetchDeckById } from "@/actions/actions";

// interface EditDeckFormProps {
//   // deck: Deck | undefined;
//   deckId: string;
// }

// export default async function EditDeckForm({ deckId }: EditDeckFormProps) {
//   const deck = await fetchDeckById(deckId);
//   return (
//     <form action={editDeck} className="flex flex-col gap-y-4 w-full">
//       <div>
//         <input type="hidden" name="id" value={deck?.id} />
//         <label
//           htmlFor="title"
//           className="block tracking-wide text-sm text-white/90 font-bold"
//         >
//           Title
//         </label>
//         <input
//           type="text"
//           name="title"
//           id="title"
//           defaultValue={deck?.title}
//           placeholder="Deck Title"
//           className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
//         />
//       </div>
//       <div>
//         <div className="flex justify-between items-center">
//           <label
//             htmlFor="desc"
//             className="block tracking-wide text-sm text-white/90 font-bold"
//           >
//             Description
//           </label>
//           <span className="block tracking-wide text-sm text-white/50">
//             Optional
//           </span>
//         </div>
//         <textarea
//           name="description"
//           id="desc"
//           defaultValue={deck?.description}
//           rows={2}
//           placeholder="Deck description"
//           className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
//         ></textarea>
//       </div>
//       <hr className="border border-white/10" />
//       <button
//         type="submit"
//         className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-2 px-4 mt-4 transition-colors"
//       >
//         Save
//       </button>
//     </form>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { editDeck, fetchDeckById } from "@/actions/actions";
import { Add, Close } from "@mui/icons-material";

interface Card {
  id?: number; // Prisma uses Int as the Card ID
  question: string;
  answer: string;
}

interface EditDeckFormProps {
  deckId: string;
}

export default function EditDeckForm({ deckId }: EditDeckFormProps) {
  const [deck, setDeck] = useState<Awaited<ReturnType<typeof fetchDeckById>>>();
  const [cards, setCards] = useState<Card[]>([]);
  const [isPublic, setIsPublic] = useState(deck?.isPublic || false);

  useEffect(() => {
    setIsPublic(deck?.isPublic || false); // Update state if deck changes
  }, [deck?.isPublic]);

  const handleCheckboxChange = () => {
    setIsPublic(!isPublic);
  };

  // Fetch deck and set initial state on mount
  useEffect(() => {
    const loadDeck = async () => {
      const data = await fetchDeckById(deckId);
      setDeck(data);
      setCards(data!.cards); // Initialize with existing cards
    };
    loadDeck();
  }, [deckId]);

  const handleCardChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setCards(updatedCards);
  };

  const addCard = () => setCards([...cards, { question: "", answer: "" }]);

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Add cards as JSON to the form data
    formData.append("cards", JSON.stringify(cards));

    await editDeck(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
      <input type="hidden" name="id" value={deck?.id} />

      <div>
        <label
          htmlFor="title"
          className="block text-sm text-white/90 font-bold"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={deck?.title}
          placeholder="Deck Title"
          className="w-full mt-2 border border-white/10 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="desc" className="block text-sm text-white/90 font-bold">
          Description
        </label>
        <textarea
          name="description"
          id="desc"
          defaultValue={deck?.description || ""}
          rows={2}
          placeholder="Deck description"
          className="w-full mt-2 border border-white/10 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:border-blue-500"
        ></textarea>
      </div>

      <label
        className={`inline-flex items-center mb-4 ${
          deck?.isCopy
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
      >
        <span className="me-3 tracking-wide text-sm text-white/90 font-bold">
          Public deck
        </span>
        <input
          type="checkbox"
          name="public"
          id="public"
          value="true"
          onChange={handleCheckboxChange}
          checked={isPublic}
          className="sr-only peer"
          disabled={deck?.isCopy}
        />
        <div className="relative inline-block w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
      </label>

      <div className="mt-6 mb-2 text-lg lg:text-xl font-semibold">
        Cards in this deck
      </div>
      <div className="">
        <div className="flex w-full items-center gap-4 py-3 text-white/50">
          <div className="w-[4rem]">#</div>
          <div className="w-full">Question</div>
          <div className="w-full">Answer</div>
          <div className="w-[5rem]"></div>
        </div>
        {cards.map((card, index) => (
          <div key={card.id}>
            <div className="flex w-full items-center py-3 border-t-2 border-white/5 group">
              <div className="flex w-full gap-4 items-center">
                <div className="text-white/50 w-[4rem]">{index + 1}</div>
                <input
                  type="text"
                  name={`cards[${index}][question]`}
                  placeholder="Question"
                  value={card.question}
                  onChange={(e) =>
                    handleCardChange(index, "question", e.target.value)
                  }
                  className="w-full font-semibold bg-white/5 p-2 rounded-lg"
                />
                <input
                  type="text"
                  name={`cards[${index}][answer]`}
                  placeholder="Answer"
                  value={card.answer}
                  onChange={(e) =>
                    handleCardChange(index, "answer", e.target.value)
                  }
                  className="w-full bg-white/5 p-2 rounded-lg"
                />
              </div>
              <div className="flex w-[4rem] justify-center items-center">
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="hidden group-hover:flex items-center p-1 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <Close />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <hr className="w-full border border-white/15" />
        <button
          type="button"
          onClick={addCard}
          className="bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg py-2 px-2 transition-colors"
        >
          <Add />
        </button>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-2 px-4 mt-4"
      >
        Save
      </button>
    </form>
  );
}
