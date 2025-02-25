import React from "react";

type TooltipProps = {
  children: JSX.Element;
  text: string;
};

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    <div className="relative group flex items-center rounded-xl">
      {children}

      <div className="absolute top-[-80%] left-[-10%] bg-black/5 dark:bg-white/5 text-black dark:text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {text}
      </div>
    </div>
  );
}
