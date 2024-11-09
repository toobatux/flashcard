import React from "react";
import { fetchAllGuides } from "@/actions/actions";
import Link from "next/link";
import GuideCard from "@/app/components/GuideCard";

const GuidesPage = async () => {
  const guides = await fetchAllGuides();
  return (
    <>
      <div className="lg:my-6 my-4">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold">Guides</div>
        <div className="grid my-6 grid-cols-1 lg:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <div key={guide.id}>
              <GuideCard guide={guide} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuidesPage;
