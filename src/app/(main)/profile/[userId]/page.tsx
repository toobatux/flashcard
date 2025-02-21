import { getUserById } from "@/actions/actions";
//import { RecentlyStudied } from "@/app/components/RecentlyStudied";
import Image from "next/image";
import React from "react";

export default async function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  //const user = await getUser(userId);
  const user = await getUserById(userId);
  return (
    <>
      <div className="lg:my-6"></div>
      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageURL}
            width={100}
            height={100}
            alt={user?.username || " "}
            className="rounded-full object-cover w-16 h-16"
          />
          <div className="flex flex-col">
            <div className="text-2xl text-white font-semibold">
              {user?.username}
            </div>
            <div className="text-white/50">{user?.score} xp</div>
          </div>
        </div>
      </div>
    </>
  );
}
