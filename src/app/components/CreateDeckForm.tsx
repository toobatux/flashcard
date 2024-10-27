"use client";

import { createDeck } from "@/actions/actions";
import Link from "next/link";
import { useActionState } from "react";

export default function CreateDeckForm() {
  return (
    <form action={createDeck} className="flex flex-col gap-y-4 w-full">
      <div>
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
          rows={2}
          placeholder="Deck description"
          className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl p-2 mt-2 transition-colors"
      >
        Create Deck
      </button>
      <Link href="/decks">
        <button
          type="button"
          className="w-full border border-white/15 text-white/50 font-semibold rounded-xl p-2 hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
      </Link>
    </form>
  );
}
