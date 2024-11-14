import React from "react";

interface DeckHeaderProps {
  title: string;
  description: string | null;
  authorId: string;
  authorImageURL: string;
  authorUsername: string;
}

const DeckHeader = () => {
  return (
    <>
      <div className="text-black dark:text-white text-2xl lg:text-3xl font-bold flex">
        {deck?.title}
      </div>
      <div className="text-black dark:text-white/50 mt-3 mb-6">
        {deck?.description}
      </div>

      <div className="block text-xs text-black/90 dark:text-white/50">
        Created by
      </div>
      <div className="flex w-full items-center justify-between rounded-xl mt-1 mb-8 lg:mb-8">
        <div className="flex h-full">
          <Link
            href={`/profile/${deck?.author.clerkId}`}
            className="flex items-center text-black dark:text-white/80 font-semibold hover:underline"
          >
            {deck?.author.imageURL && (
              <Image
                src={deck?.author.imageURL}
                width={100}
                height={100}
                className="rounded-full me-2 object-cover w-8 h-8"
                alt="Avatar"
              />
            )}
            {deck?.author.username}
          </Link>
        </div>
        <div className="flex items-center gap-3"></div>
      </div>
    </>
  );
};

export default DeckHeader;
