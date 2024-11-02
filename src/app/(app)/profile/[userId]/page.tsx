import { getUser } from "@/actions/actions";
import { RecentlyStudied } from "@/app/components/RecentlyStudied";
import Image from "next/image";
import React from "react";

export default async function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await getUser(userId);

  return (
    <>
      <div className="md:my-4 lg:my-8"></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Image
            src={user!.imageURL}
            width={60}
            height={60}
            alt={user?.username || " "}
            className="rounded-full"
          />
          <div className="text-2xl text-white font-semibold">
            {user?.username}
          </div>
        </div>
      </div>
    </>
  );
}
