import { Guide, Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type GuideWithRelations = Prisma.GuideGetPayload<{
  include: { author: true };
}>;

type GuideCardProps = {
  guide: GuideWithRelations | undefined | null;
  isSmall: boolean;
};

const GuideCard = ({ guide, isSmall }: GuideCardProps) => {
  return (
    <>
      <Link href={`/guides/${guide?.id}`}>
        <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex space-x-3">
            <div
              className={` ${
                isSmall ? "min-w-14 min-h-14" : "min-w-24 min-h-24"
              } rounded-lg bg-white/10`}
            ></div>
            <div className="flex flex-col justify-between">
              <div className="text-white/85 h-[50px] font-semibold line-clamp-2 overflow-ellipsis">
                {guide?.title}
              </div>
              {/* <div className="text-sm"> By {guide?.author.username}</div> */}
              {!isSmall && (
                <div className="text-sm text-white/50">
                  {guide?.createdOn
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default GuideCard;
