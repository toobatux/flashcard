const DeckCardSkeleton = () => {
  return (
    <div className="text-sm relative h-[140px] p-4 bg-white/5 hover:bg-white/10 group rounded-xl shadow-lg transition-all flex flex-col justify-between">
      <div>
        <div className="h-[18px] w-full bg-white/5 rounded-lg animate-pulse mb-1"></div>
        <div className="h-[18px] w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex items-center me-5">
        <div className="h-[20px] w-[65px] bg-white/10 animate-pulse inline-block rounded-full"></div>
      </div>
      <div className="flex items-center text-white/60">
        <div className="flex w-5 h-5 me-2 rounded-full bg-white/5 animate-pulse"></div>
        <div className="h-[20px] w-1/4 bg-white/5 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default DeckCardSkeleton;
