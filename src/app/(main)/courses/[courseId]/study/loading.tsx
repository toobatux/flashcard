export default function Loading() {
  return (
    <>
      <div className="absolute inset-0 z-40 w-full h-full app-bg">
        <div className="max-w-3xl mx-auto">
          <div className="flex h-[40px] w-full items-center rounded-lg">
            <div className="text-lg font-semibold text-white/80 me-2">
              Studying:
            </div>
            <div className="h-[28px] w-1/2 bg-white/5 rounded-lg animate-pulse"></div>
          </div>
          <div className="mt-[7.5rem]">
            <div className="relative min-h-[15rem] md:h-[20rem] lg:h-[25rem] w-full border bg-white/5 border-white/10 shadow-lg rounded-lg"></div>
          </div>
          <div className="flex justify-center items-center mt-20">
            <div className="bg-white/5 h-[40px] rounded-lg text-white/60 animate-pulse">
              {/* {user?.username}'s total score: {user?.score} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
