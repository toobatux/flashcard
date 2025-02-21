import React from "react";
import { fetchAllGuides } from "@/actions/actions";
import Link from "next/link";
import GuideCard from "@/app/components/GuideCard";

const GuidesPage = async () => {
  const guides = await fetchAllGuides();
  return (
    <>
      <div className="lg:my-6">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">Guides</div>
        <ul className="grid my-6 grid-cols-1 lg:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <li key={guide.id} className="list-none">
              <GuideCard guide={guide} isSmall={false} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GuidesPage;
