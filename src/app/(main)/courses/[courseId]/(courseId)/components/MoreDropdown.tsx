"use client";

import {
  ContentCopy,
  EditOutlined,
  MoreHoriz,
  PublishOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { createDeckCopy, publishCourse } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import SaveDeckButton from "./SaveDeckButton";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { CourseWithLessons } from "./CourseHeader";
import Tooltip from "@/app/components/Tooltip";

interface MoreDropdownProps {
  userIsAuthor: boolean;
  courseId: string;
  course: CourseWithLessons;
  isCoursePage: boolean;
}

const MoreDropdown = ({
  userIsAuthor,
  courseId,
  course,
  isCoursePage,
}: MoreDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateCopy = async () => {
    setIsDisabled(true);
    createDeckCopy(courseId, user!.id);
  };

  const handlePublish = async () => {
    publishCourse(courseId);
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left dropdown">
      <Tooltip text="More">
        <button
          type="button"
          className="flex w-[40px] h-[40px] items-center justify-center hover:bg-white/10 rounded-xl text-white/50 hover:text-white  transition-colors"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <MoreHoriz />
        </button>
      </Tooltip>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20 w-full h-full"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl app-bg border border-white/20 shadow-xl ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-2" role="none">
              {isCoursePage && !course.isPublic && userIsAuthor && (
                <button
                  onClick={handlePublish}
                  className="flex w-full items-center gap-3 py-3 px-2 text-sm  text-white/70 hover:bg-white/10 rounded-lg"
                >
                  <PublishOutlined className="text-white/50" />
                  Publish course
                </button>
              )}
              {userIsAuthor && (
                <Link
                  href={`/courses/${courseId}/edit`}
                  className="flex items-center gap-3 py-3 px-2 text-sm  text-white/70 hover:bg-white/10 rounded-lg"
                  role="menuitem"
                >
                  <EditOutlined className="text-white/50" />
                  Edit
                </Link>
              )}
              {/* {!userIsAuthor && (
                <>
                  <SaveDeckButton clerkId={user!.id} courseId={courseId} />
                </>
              )} */}
              {/* <button
                onClick={handleCreateCopy}
                disabled={isDisabled}
                className={`flex w-full items-center gap-3 py-3 px-2 text-sm  text-white/70 hover:bg-white/10 rounded ${
                  isDisabled && "opacity-50"
                }`}
                role="menuitem"
              >
                <ContentCopy className="text-white/50" />
                Create a copy
              </button> */}
              <button
                onClick={handleCreateCopy}
                disabled={isDisabled}
                className={`flex w-full items-center gap-3 py-3 px-2 text-sm  text-white/70 hover:bg-white/10 rounded-lg ${
                  isDisabled && "opacity-50"
                }`}
                role="menuitem"
              >
                <RestartAltOutlinedIcon className="text-white/50" />
                Reset progress
              </button>
              {userIsAuthor && (
                <>
                  <div className="w-full py-2">
                    <hr className="border-t border-white/20" />
                  </div>
                  <DeleteModal courseId={courseId} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoreDropdown;
