"use client";

import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { createGuide } from "@/actions/actions";
import Tiptap from "./Tiptap";
import { Deck } from "@prisma/client";

interface NewGuideFormProps {
  myDecks: Deck[];
}

const NewGuideForm = ({ myDecks }: NewGuideFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);

  const handleEditorChange = (newContent: JSONContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!content) {
      alert("content is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(content));

    if (selectedDeckId) {
      formData.append("deckId", selectedDeckId);
    }

    createGuide(formData);
  };

  return (
    <>
      <div className="my-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Guide Title"
              className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="deck"
              className="block tracking-wide text-sm text-white/90 font-bold"
            >
              Associated Deck
            </label>
            <select
              id="deckDropdown"
              onChange={(e) => setSelectedDeckId(e.target.value)}
              className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
            >
              <option value="" className="bg-neutral-800">
                None
              </option>
              {myDecks.map((deck) => (
                <option
                  key={deck.id}
                  value={deck.id}
                  className="bg-neutral-800"
                >
                  {deck.title}
                </option>
              ))}
            </select>
          </div>
          <Tiptap onChange={handleEditorChange} />
          <button
            type="submit"
            className="flex w-full items-center justify-center p-3 bg-indigo-700 hover:bg-indigo-600 transition-colors font-semibold rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewGuideForm;
