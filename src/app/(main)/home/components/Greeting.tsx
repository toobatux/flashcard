"use client";

import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import GreetingSkeleton from "./GreetingSkeleton";

interface GreetingProps {
  user: User | null;
}

const Greeting = ({ user }: GreetingProps) => {
  const [greeting, setGreeting] = useState<string | null>(null);

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

  if (!user || greeting === null) {
    return <GreetingSkeleton />;
  }

  return (
    <>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold">
        {greeting}, {user?.username}
      </div>
    </>
  );
};

export default Greeting;
