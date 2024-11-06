import React from "react";
import { fetchAllGuides } from "@/actions/actions";
import Link from "next/link";

const GuidesPage = async () => {
  const guides = await fetchAllGuides();
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">Guides</div>
        <div className="grid my-6 grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link href={`/guides/${guide.id}`} key={guide.id}>
              <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10">
                <div className="font-bold mb-2">{guide.title}</div>
                <div> By {guide.author.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuidesPage;
