"use client";

import { createDeck } from "@/actions/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

interface FormData {
  title?: string;
  description?: string;
}

interface FormErrors {
  title?: string;
}

export default function CreateDeckForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title || formData.title.length < 4) {
      newErrors.title = "Title must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const deckData = new FormData();
      deckData.append("title", formData.title || "");
      if (formData.description) {
        deckData.append("description", formData.description);
      }
      createDeck(deckData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
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
          onChange={handleChange}
          placeholder="Deck Title"
          className="w-full mt-2 border border-white/15 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
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
          onChange={handleChange}
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
