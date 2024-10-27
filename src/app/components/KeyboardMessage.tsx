"use client";

import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

const KeyboardMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check local storage to see if message was dismissed
  useEffect(() => {
    const messageDismissed = localStorage.getItem("messageDismissed");
    if (!messageDismissed) setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("messageDismissed", "true");
  };

  return (
    isVisible && (
      <div className="p-2 border border-indigo-500 text-white/80 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="ms-2 font-semibold">Try the keyboard</span>
          <button
            onClick={handleClose}
            className="text-white font-bold hover:text-gray-200"
          >
            <div className="flex items-center p-2 rounded-full hover:bg-white/10 transition-colors">
              <Close />
            </div>
          </button>
        </div>
        <div className="p-2">
          <kbd className="bg-white/5 rounded p-1">Space</kbd> to flip cards,{" "}
          <kbd className="bg-white/5 rounded p-1">&larr;</kbd> and{" "}
          <kbd className="bg-white/5 rounded p-1">&rarr;</kbd> to navigate
          between cards.
        </div>
      </div>
    )
  );
};

export default KeyboardMessage;
