"use client";

import { createCourse } from "@/actions/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

interface FormData {
  title?: string;
  description?: string;
  isPublic: boolean;
  difficulty: string;
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

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, isPublic: e.target.checked });
  // };

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: e.target.value,
    }));
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
      const courseData = new FormData();
      courseData.append("title", formData.title || "");
      if (formData.description) {
        courseData.append("description", formData.description);
      }
      courseData.append("difficulty", formData.difficulty || "BEGINNER");
      // courseData.append("public", formData.isPublic ? "true" : "false");
      createCourse(courseData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 w-full rounded-2xl p-5"
    >
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
          placeholder="Course title"
          className="w-full mt-2 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
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
          <span className="block tracking-wide text-sm font-light text-white/50">
            Optional
          </span>
        </div>
        <textarea
          name="description"
          id="desc"
          onChange={handleChange}
          rows={2}
          placeholder="Course description"
          className="w-full mt-2 bg-white/5 rounded-lg py-1.5 px-2 placeholder-white/50 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col">
          <label
            htmlFor="difficulty"
            className="block tracking-wide text-sm text-white/90 font-bold"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            required
            value={formData.difficulty}
            onChange={handleDifficulty}
            className="bg-white/5 py-1.5 px-2 rounded-lg mt-2"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        {/* <div className="flex flex-col gap-2">
          <label className="">
            <span className="me-3 tracking-wide text-sm text-white/90 font-bold">
              Publish on create?
            </span>
          </label>
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
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </div> */}
      </div>

      <div className="flex flex-col-reverse md:flex-row mt-10 gap-3 md:gap-2">
        <Link href="/courses" className="w-full md:w-1/3">
          <button
            type="button"
            className="w-full px-4 py-2 border border-white/15 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Create course
        </button>
      </div>
    </form>
  );
}
