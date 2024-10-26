"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { Deck, User, Card } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

type DeckWithRelations = Prisma.DeckGetPayload<{
    include: { cards: true; author: true, students: true };
  }>;

type UserWithRelations = Prisma.UserGetPayload<{
    include: { lastStudiedDecks: true;};
}>;

export async function createDeck(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = await currentUser();

    await prisma.deck.create({ 
        data: { 
            title, 
            description,
            author: {
                connect: { clerkId: user?.id },
            }
        }});

    redirect("/decks");
}

export async function editDeck(formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = await currentUser();
    console.log("Updating deck:" + id)

    await prisma.deck.update({ 
        where: { id },
        data: { 
            title, 
            description,
            author: {
                connect: { clerkId: user?.id },
            }
        }});

    redirect(`/decks/${id}`);
}

export async function deleteDeck(id: string) {
    await prisma.deck.delete({
        where: {id}
    });

    redirect("/decks");
}

export async function fetchDecks(): Promise<DeckWithRelations[]> {
    return await prisma.deck.findMany({
        include: { cards: true, author: true, students: true },
    });
}

export async function fetchMyDecks(authorId: string): Promise<DeckWithRelations[]> {
    return await prisma.deck.findMany({
        where: { authorId: authorId },
        include: { cards: true, author: true, students: true },
    });
}

export async function fetchDeckById(id: string): Promise<DeckWithRelations | null> {
    const deck = await prisma.deck.findUnique({
        where: { id },
        include: { cards: true, author: true, students: true },
    });

    if(!deck) {
        notFound()
    }

    return deck;
}

export async function getUser(clerkId: string): Promise<UserWithRelations | null> {
    return await prisma.user.findUnique({
        where: { clerkId },
        include: {
            lastStudiedDecks: {
                include: {
                    author: true,
                    cards: true,
                }
            },
        }
    });
}

export async function updateUserScore(clerkId: string, points: number) {
    return await prisma.user.update({
        where: { clerkId },
        data: {
            score: {increment: points},
        }
    })
}

export async function updateRecentDecks(clerkId: string, deckId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
        include: { lastStudiedDecks: true },
    });

    // Keep only the last 2 studied decks
    const updatedDecks = [...user!.lastStudiedDecks.map(deck => deck.id), deckId].slice(-2);

    await prisma.user.update({
        where: { clerkId },
        data: {
            lastStudiedDecks: {
                set: updatedDecks.map(id => ({id})),
            }
        }
    })

    await prisma.deck.update({
        where: { id: deckId },
        data: {
            students: {
                connect: {id: user?.id}
            }
        }
    })
}

export async function createCard(formData: FormData) {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const deckId = formData.get("deckId") as string;

    await prisma.card.create({
        data: {
            question,
            answer,
            deck: {
                connect: { id: deckId },
            }
        }
    })
}

// type User = {
//     id: string;
//     clerkId: string;
//     username: string | null;
//     email: string;
//     imageURL: string;
//     score: number;
//     lastStudiedDecks?: Deck[];
// }

// type CustomDeck = {
//     id: string;
//     title: string;
//     description?: string;
//     createdOn: Date;
//     updatedOn: Date;
//     authorId: string;
//     author: User;
//     cards: Card[];
// }

// type Card = {
//     id: string;
//     question: string;
//     answer: string;
//     deckId: string;
//     deck: CustomDeck; 
// }