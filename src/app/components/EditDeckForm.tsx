import { editDeck } from "@/actions/actions";
import { Deck } from "@prisma/client";

interface EditDeckFormProps {
  deck: Deck | undefined;
  handleClose: () => void;
}

export default function EditDeckForm({ deck, handleClose }: EditDeckFormProps) {
  return (
    <form action={editDeck} className="flex flex-col gap-y-4 w-full">
      <div>
        <input type="hidden" name="id" value={deck?.id} />
        <label
          htmlFor="title"
          className="block tracking-wide text-sm text-white/90 font-bold"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          // value={deck?.title}
          placeholder="Deck Title"
          className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="desc"
            className="block tracking-wide text-sm text-white/90 font-bold"
          >
            Description
          </label>
          <span className="block tracking-wide text-sm text-white/50">
            Optional
          </span>
        </div>
        <textarea
          name="description"
          id="desc"
          // value={deck?.description}
          rows={2}
          placeholder="Deck description"
          className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl py-2 px-4 mt-4 transition-colors"
      >
        Save
      </button>
    </form>
  );
}
