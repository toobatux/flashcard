import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthorCardProps = {
  author: User;
};

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="border-2 border-white/5 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-white/50">Created by</div>
        <div className="flex h-full">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex items-center text-black dark:text-white/80 font-semibold hover:underline"
          >
            {author.imageURL && (
              <Image
                src={author.imageURL}
                width={100}
                height={100}
                className="rounded-full me-2 object-cover w-8 h-8"
                alt="Avatar"
              />
            )}
            {author.username}
          </Link>
        </div>
      </div>
    </div>
  );
}
