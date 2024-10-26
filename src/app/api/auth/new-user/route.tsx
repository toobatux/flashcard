import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import prisma from "@/db";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse("User does not exist", { status: 400 });
  }

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.username,
      },
    });
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/decks",
    },
  });
}
