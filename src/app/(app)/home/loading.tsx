import DeckCardSkeleton from "@/app/components/loading/DeckCardSkeleton";
import GreetingSkeleton from "@/app/components/loading/GreetingSkeleton";

export default function Loading() {
  return (
    <>
      <div className="lg:my-6 my-4">
        <GreetingSkeleton />
        <div className="my-8 lg:my-12">
          <div className="text-lg text-white/70 mb-3">Recently studied</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DeckCardSkeleton />
            <DeckCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
