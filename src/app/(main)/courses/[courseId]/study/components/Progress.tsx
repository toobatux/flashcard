"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

const Progress = () => {
  return (
    <ProgressBar
      completed={2}
      maxCompleted={5}
      isLabelVisible={false}
      bgColor="rgb(37, 99, 235)"
      baseBgColor="rgb(42, 42, 48)"
      height="10px"
      className=""
    />
  );
};

export default Progress;
