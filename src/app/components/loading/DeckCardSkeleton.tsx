const DeckCardSkeleton = () => {
  return (
    <div className="text-sm relative h-[160px] md:h-[180px] p-4 bg-white/5 hover:bg-white/10 group rounded-xl shadow-lg transition-all flex flex-col justify-between">
      <div>
        <div className="h-[24px] w-full bg-white/10 rounded-full animate-pulse mb-1"></div>
        {/* <div className="h-[18px] w-1/2 bg-white/10 rounded-full animate-pulse"></div> */}
        <div className="h-5 w-full mt-2 bg-white/5 animate-pulse inline-block rounded-full"></div>
        <div className="h-5 w-1/3 bg-white/5 animate-pulse inline-block rounded-full"></div>
      </div>
      <div className="flex items-center text-white/20 gap-2">
        <div className="flex w-1/4 h-5 rounded-full bg-white/5 animate-pulse"></div>
        <span>•</span>
        <div className="h-5 w-1/4 bg-white/5 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default DeckCardSkeleton;
