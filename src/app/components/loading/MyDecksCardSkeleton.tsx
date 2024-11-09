import React from "react";

const MyDecksCardSkeleton = () => {
  return (
    <div className="text-sm relative h-[105px] p-4 bg-white/5 hover:bg-white/10 group rounded-xl shadow-lg transition-all flex flex-col justify-between">
      <div>
        <div className="h-[18px] w-full bg-white/5 rounded-lg animate-pulse mb-1"></div>
        <div className="h-[18px] w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex items-center me-5">
        <div className="h-[20px] w-[65px] bg-white/10 animate-pulse inline-block rounded-full"></div>
      </div>
    </div>
  );
};

export default MyDecksCardSkeleton;
