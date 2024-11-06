import { fetchGuideById } from "@/actions/actions";
import { renderTiptapContent } from "@/app/components/TipTapContent";
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
        <div className="text-3xl font-bold">{guide.title}</div>
        {/* <div className="flex w-6 h-6 rounded-full mb-4">
          <Image
            src={guide.author.imageURL}
            width={100}
            height={100}
            className="object-cover rounded-full me-2"
            alt="Avatar"
          />
          {guide.author.username}
        </div> */}
        <div className="my-4">
          <div className="block text-xs text-white/50 mb-2">Written by</div>
          <div className="flex w-full items-center justify-between rounded-xl mt-1 mb-8 lg:mb-8">
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
          {/* <div className="flex w-full items-center">
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
          </div> */}
        </div>
        <div className="text-xs text-white/50">
          Last updated: {guide.updatedOn.toDateString()}
        </div>
        <hr className="border border-white/10 mt-4 mb-8" />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </>
  );
};

export default GuidePage;
