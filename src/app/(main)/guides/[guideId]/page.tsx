import { fetchGuideById } from "@/actions/actions";
import MyDecksCard from "@/app/(main)/library/components/MyDecksCard";
import { renderTiptapContent } from "@/app/(main)/guides/components/TipTapContent";
import { MoreHoriz, ThumbUpOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuidePage = async ({
  params: { guideId },
}: {
  params: { guideId: string };
}) => {
  const guide = await fetchGuideById(guideId);
  const htmlContent = renderTiptapContent(guide.content);
  return (
    <>
      <div className="my-2 md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="text-2xl lg:text-3xl font-bold leading-[2rem]">
          {guide.title}
        </div>
        <div className="my-4">
          <div className="block text-xs text-white/50 mb-2">Written by</div>
          <div className="flex w-full items-center justify-between rounded-xl mt-1 mb-4">
            <div className="flex h-full">
              <Link
                href={`/profile/${guide.author.clerkId}`}
                className="flex items-center text-white/80 font-semibold hover:underline"
              >
                {guide.author.imageURL && (
                  <Image
                    src={guide.author.imageURL}
                    width={100}
                    height={100}
                    className="rounded-full me-2 object-cover w-8 h-8"
                    alt="Avatar"
                  />
                )}
                {guide.author.username}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center text-white/65 border-2 border-white/50 hover:border-white/65 hover:bg-white/10 p-1.5 rounded-lg text-white font-semibold transition-colors"
              >
                <MoreHoriz />
              </button>
              <button
                type="button"
                className="flex items-center text-white/65 border-2 border-white/50 hover:border-white/65 hover:bg-white/10 p-1.5 rounded-lg text-white font-semibold transition-colors"
              >
                <ThumbUpOutlined />
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs text-white/50">
          Last updated:{" "}
          {guide.updatedOn.toDateString().split(" ").slice(1).join(" ")}
        </div>

        {guide.deck && (
          <div className="mb-8">
            <div className="mt-8 mb-3 text-lg text-white/70">Review deck</div>
            <MyDecksCard deck={guide.deck} />
          </div>
        )}

        <hr className="border border-white/10 mt-4 mb-8" />

        <div className="tiptap">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <div className="my-12"></div>
      </div>
    </>
  );
};

export default GuidePage;
