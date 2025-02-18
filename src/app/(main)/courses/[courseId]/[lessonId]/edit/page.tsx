import { fetchLessonById } from "@/actions/actions";
import { Close, DragHandle } from "@mui/icons-material";
import React from "react";

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lessonId = Number(params.lessonId);
  const lesson = await fetchLessonById(lessonId);
  return (
    <>
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <div className="text-white/50 hover:text-white transition-colors mb-3">
          Edit
        </div>
        <div className="text-black dark:text-white text-3xl md:text-4xl font-bold flex">
          {lesson.title}
        </div>
        <form className="mt-12">
          <ul className="space-y-3">
            {lesson.terms.map((term, index) => (
              <li
                key={term.id}
                className="flex w-full items-center bg-white/5 rounded-lg"
              >
                <div className="flex flex-col w-full">
                  <div className="flex w-full justify-between py-1 px-1 border-b border-white/5">
                    <div className="flex w-6 items-center font-light text-white/50 ps-2">
                      {index + 1}
                    </div>
                    <div className="flex gap-2">
                      <DragHandle className="text-white/50" />
                      <Close className="text-white/50" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full gap-4 p-5">
                    <div
                      className={`flex flex-col font-semibold md:w-1/2 md:items-center`}
                    >
                      <label
                        htmlFor="question"
                        className="block text-xs text-white/50 mb-1"
                      >
                        TERM
                      </label>
                      <input
                        type="text"
                        name="question"
                        id="question"
                        defaultValue={term.question}
                        placeholder="Term"
                        className="w-full bg-black/5 border-2 border-white/5 p-1 rounded"
                      />
                    </div>
                    <div className={`flex flex-col md:w-1/2 md:items-center`}>
                      <label
                        htmlFor="answer"
                        className="block text-xs text-white/50 font-semibold mb-1"
                      >
                        DEFINITION
                      </label>
                      <input
                        type="text"
                        name="answer"
                        id="answer"
                        defaultValue={term.answer}
                        placeholder="Definition"
                        className="w-full bg-black/5 border-2 border-white/5 p-1 rounded"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex px-5">{term.correctCount}</div> */}
              </li>
            ))}
          </ul>
        </form>
        <div className="flex w-full mt-4 mb-40">
          <button className="flex w-full justify-center p-5 bg-blue-700 rounded-lg font-semibold">
            New card
          </button>
        </div>
      </div>
    </>
  );
}
