"use client";
import { Term } from "@prisma/client";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Bolt,
  BoltOutlined,
  Lightbulb,
  LightbulbOutlined,
  SwapHoriz,
} from "@mui/icons-material";

interface TermListProps {
  terms: any;
}

const TermList = ({ terms }: TermListProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [termHidden, setTermHidden] = useState(false);
  const [defHidden, setDefHidden] = useState(false);

  const handleFlipped = () => {
    if (defHidden) {
      setDefHidden(false);
      setTermHidden(true);
    }

    if (termHidden) {
      setTermHidden(false);
      setDefHidden(true);
    }

    setIsFlipped(!isFlipped);
  };

  const handleHideTerms = () => {
    setTermHidden(!termHidden);
  };

  const handleHideDefs = () => {
    setDefHidden(!defHidden);
  };

  return (
    <>
      <div className="relative w-full">
        <div className="flex flex-col w-full">
          <div className="flex w-full justify-center items-center rounded-xl border-2 bg-white dark:bg-transparent dark:border-white/5 px-5 py-4 mt-6 mb-3">
            <div className="flex items-center gap-4 font-light">
              <div className="flex gap-1 items-center text-sm text-black/50 dark:text-white/50">
                <LightbulbOutlined fontSize="small" />
                Ready to learn
              </div>
              <div className="flex gap-1 items-center text-sm text-black/50 dark:text-white/50">
                <Lightbulb fontSize="small" />
                Ready to review
              </div>
            </div>
          </div>
          {terms && terms.length > 0 && (
            <>
              <ul className="space-y-3 mb-2">
                {terms.map((term) => (
                  <li
                    key={term.id}
                    className="flex w-full group items-center py-5 bg-white dark:bg-white/5 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      <div
                        className={`flex font-semibold md:w-2/5 items-center px-5 ${
                          termHidden ? "blur" : "blur-none"
                        }`}
                      >
                        <div className="flex flex-col">
                          {term.questionAlt && (
                            <div className="text-sm text-black/50 dark:text-white/50 font-light mb-1">
                              {term.questionAlt}
                            </div>
                          )}
                          {term.question}
                        </div>
                      </div>
                      <div
                        className={`${
                          defHidden ? "blur" : "blur-none"
                        } md:w-3/5 px-5 font-light flex items-center`}
                      >
                        {term.answer}
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row items-center px-5">
                      {/* {term.correctCount} */}
                      <div className="flex w-full md:w-[100px] justify-end">
                        {term.correctCount > 0 && term.correctCount < 2 ? (
                          <ProgressBar
                            completed={term.correctCount}
                            maxCompleted={2}
                            isLabelVisible={false}
                            bgColor="rgb(37, 99, 235)"
                            baseBgColor="gray"
                            width="40px"
                            height="5px"
                          />
                        ) : term.correctCount === 0 ? (
                          <LightbulbOutlined
                            fontSize="small"
                            className="text-black/50 dark:text-white/50"
                          />
                        ) : (
                          <div className="flex w-[100px] md:w-full justify-end font-light items-center gap-1 text-black/50 dark:text-white/50">
                            <Lightbulb fontSize="small" />
                            <div className="text-xs">in 2 days</div>
                          </div>
                        )}
                      </div>
                      {/* <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <BookmarkBorderIcon className="fill-white/30 hover:fill-white transition-colors" />
                      </div> */}
                    </div>
                  </li>
                ))}
              </ul>

              {/* <div className="border-2 border-white/5 rounded-xl mt-6 mb-4">
                <div className="flex w-full justify-center items-center px-5 py-4">
                  <div className="flex items-center gap-4 font-light">
                    <div className="flex gap-1 items-center text-sm text-black/50 dark:text-white/50">
                      <LightbulbOutlined fontSize="small" />
                      Ready to learn
                    </div>
                    <div className="flex gap-1 items-center text-sm text-black/50 dark:text-white/50">
                      <Lightbulb fontSize="small" />
                      Ready to review
                    </div>
                  </div>
                </div>
                <ul className="">
                  {terms.map((term) => (
                    <li
                      key={term.id}
                      className="flex w-full items-center py-5 border-t border-white/5"
                    >
                      <div className="flex flex-col md:flex-row w-full gap-4">
                        <div
                          className={`flex font-semibold md:w-2/5 items-center px-5 ${
                            termHidden ? "blur" : "blur-none"
                          }`}
                        >
                          <div className="flex flex-col">
                            {term.questionAlt && (
                              <div className="text-sm text-black/50 dark:text-white/50 font-light mb-1">
                                {term.questionAlt}
                              </div>
                            )}
                            {term.question}
                          </div>
                        </div>
                        <div
                          className={`${
                            defHidden ? "blur" : "blur-none"
                          } md:w-3/5 px-5 font-light flex items-center`}
                        >
                          {term.answer}
                        </div>
                      </div>
                      <div className="flex gap-4 flex-row items-center px-5">
                      
                        <div className="flex w-full md:w-[100px] justify-end">
                          {term.correctCount > 0 && term.correctCount < 2 ? (
                            <ProgressBar
                              completed={term.correctCount}
                              maxCompleted={2}
                              isLabelVisible={false}
                              bgColor="rgb(37, 99, 235)"
                              baseBgColor="gray"
                              width="40px"
                              height="5px"
                            />
                          ) : term.correctCount === 0 ? (
                            <LightbulbOutlined
                              fontSize="small"
                              className="text-black/50 dark:text-white/50"
                            />
                          ) : (
                            <div className="flex w-[100px] md:w-full justify-end font-light items-center gap-1 text-black/50 dark:text-white/50">
                              <Lightbulb fontSize="small" />
                              <div className="text-xs">in 2 days</div>
                            </div>
                          )}
                        </div>
                        {/* <div>
                        <BookmarkBorderIcon className="fill-white/30 hover:fill-white transition-colors" />
                      </div> 
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </>
          )}
        </div>
        <div className="sticky right-10 mx-auto max-w-lg justify-center bottom-[70px] md:bottom-5 text-sm px-4">
          <div className="flex w-full justify-center gap-2 nav-bg p-2 rounded-2xl shadow-xl">
            {isFlipped ? (
              <button
                onClick={handleHideTerms}
                className={`w-3/4 px-4 py-3 border-2 rounded-xl transition-colors ${
                  termHidden
                    ? "bg-white/10 border-transparent hover:bg-white/15"
                    : "border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {termHidden ? "Show terms" : "Hide terms"}
              </button>
            ) : (
              <button
                onClick={handleHideDefs}
                className={`w-3/4 px-4 py-3 border-2 rounded-xl transition-colors ${
                  defHidden
                    ? "bg-white/10 border-transparent hover:bg-white/15"
                    : "border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {defHidden ? "Show definitions" : "Hide definitions"}
              </button>
            )}
            <button
              onClick={handleFlipped}
              className={`w-1/4 px-4 py-3 border-2 border-white/5 rounded-2xl hover:bg-white/5 transition-colors`}
            >
              <SwapHoriz />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermList;
