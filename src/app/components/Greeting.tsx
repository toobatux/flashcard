"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <>
      {/* <div>Hello, {user?.emailAddresses[0].toString()}</div> */}
      <div className="text-xl md:text-2xl lg:text-3xl font-bold">
        {greeting}, {user?.username}
      </div>
    </>
  );
};

export default Greeting;
