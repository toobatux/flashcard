"use client";
import { saveCourse, unsaveCourse } from "@/actions/actions";
import Tooltip from "@/app/components/Tooltip";
import { useUser } from "@clerk/nextjs";
import { Bookmark, BookmarkBorderOutlined } from "@mui/icons-material";
import React, { useState, useTransition } from "react";

interface SaveCourseButtonProps {
  courseId: string;
  initialSaved: boolean;
}

const SaveCourseButton = ({
  courseId,
  initialSaved,
}: SaveCourseButtonProps) => {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  const user = useUser();

  const toggleSave = () => {
    startTransition(async () => {
      try {
        if (isSaved) {
          await unsaveCourse(user?.user!.id, courseId);
        } else {
          await saveCourse(user?.user!.id, courseId);
        }
        setIsSaved(!isSaved);
      } catch (error) {
        console.log("Error toggling save status:", error);
      }
    });
  };

  return (
    <Tooltip text={`${isSaved ? "Unsave" : "Save"}`}>
      <button
        onClick={toggleSave}
        disabled={isPending}
        className="w-[40px] h-[40px] items-center justify-center rounded-xl hover:bg-white/5 text-black/60 dark:text-white/55 hover:text-black dark:hover:text-white transition-colors"
      >
        {isSaved ? <Bookmark /> : <BookmarkBorderOutlined />}
      </button>
    </Tooltip>
  );
};

export default SaveCourseButton;
