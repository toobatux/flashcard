"use client";

import { createDeck } from "@/actions/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

interface FormData {
  title?: string;
  description?: string;
  isPublic: boolean;
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isPublic: e.target.checked });
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
      deckData.append("public", formData.isPublic ? "true" : "false");
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

      <label className="inline-flex items-center cursor-pointer">
        <span className="me-3 tracking-wide text-sm text-white/90 font-bold">
          Public deck
        </span>
        <input
          type="checkbox"
          name="public"
          id="public"
          checked={formData.isPublic}
          onChange={handleCheckboxChange}
          value="true"
          defaultChecked={true}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
      </label>

      <button
        type="submit"
        className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded-xl p-2 mt-2 transition-colors"
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
