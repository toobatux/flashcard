"use server";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { Deck, User, Card } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

type DeckWithRelations = Prisma.DeckGetPayload<{
    include: { cards: true; author: true, students: true, savedBy: true, guide: true };
  }>;

// export type DeckWithRelations = {
//     id: string;
//     title: string;
//     description: string;
//     createdOn: Date;
//     updatedOn: Date;
//     authorId: string;
//     cards: { id: number; question: string; answer: string; deckId: string }[];
//     author: {
//       id: string;
//       clerkId: string;
//       email: string;
//       username: string | null;
//       imageURL: string;
//       score: number;
//     };
//     students: {
//       id: string;
//       clerkId: string;
//       email: string;
//       username: string | null;
//       imageURL: string;
//       score: number;
//     }[];
//     savedBy: {
//       id: string;
//       clerkId: string;
//       email: string;
//       username: string | null;
//       imageURL: string;
//       score: number;
//     }[];
//   };

type UserWithRelations = Prisma.UserGetPayload<{
    include: { lastStudiedDecks: true, savedDecks: true};
}>;

export async function createDeck(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isPublic = formData.get("public") === "true";
    const user = await currentUser();

    console.log("isPublic:", isPublic);

    const newDeck = await prisma.deck.create({ 
        data: { 
            title, 
            description,
            isPublic,
            author: {
                connect: { clerkId: user?.id },
            },
            isCopy: false,
        }});

    redirect(`/decks/${newDeck.id}`);
}

export async function editDeck(formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = await currentUser();
    console.log("Updating deck:" + id)

    const cards = JSON.parse(formData.get("cards") as string) as Array<{
        question: string;
        answer: string;
      }>;

      await prisma.deck.update({
        where: { id },
        data: {
          title,
          description,
          author: {
            connect: { clerkId: user?.id },
          },
        },
      });
    
      // Delete existing cards for the deck
      await prisma.card.deleteMany({
        where: { deckId: id },
      });
    
      // Create new cards for the deck
      await prisma.card.createMany({
        data: cards.map((card) => ({
          question: card.question,
          answer: card.answer,
          deckId: id,
        })),
      });

    redirect(`/decks/${id}`);
}

export async function deleteDeck(id: string) {
    await prisma.deck.delete({
        where: {id}
    });

    redirect("/decks");
}

export async function fetchPublicDecks(): Promise<DeckWithRelations[]> {
    return await prisma.deck.findMany({
        where: { isPublic: true },
        include: { cards: true, author: true, students: true, savedBy: true, guide: true },
    });
}

export async function fetchMyDecks(authorId: string): Promise<DeckWithRelations[]> {
    return await prisma.deck.findMany({
        where: { authorId: authorId },
        include: { cards: true, author: true, students: true, savedBy: true, guide: true },
    });
}

export async function fetchDeckById(id: string): Promise<DeckWithRelations | null> {
    const deck = await prisma.deck.findUnique({
        where: { id },
        include: { cards: true, author: true, students: true, savedBy: true, guide: true },
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
                    savedBy: true,
                }
            },
            savedDecks: true
        }
    });
}

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({
        where: { id: userId },
        include: {
            lastStudiedDecks: {
                include: {
                    author: true,
                    cards: true,
                    savedBy: true,
                }
            },
            savedDecks: true
        }
    })
}

export async function updateUserScore(id: string, points: number) {
    return await prisma.user.update({
        where: { id },
        data: {
            score: {increment: points},
        }
    })
}

export async function updateDeckScore(userId: string, deckId: string, scoreToAdd: number) {
    await prisma.deckScore.upsert({
        where: {
            userId_deckId: {
                userId,
                deckId,
            },
        },
        update: {
            score: {
                increment: scoreToAdd,
            },
        },
        create: {
            userId,
            deckId,
            score: scoreToAdd,
        },
    });
}

export async function getDeckScores(deckId: string) {
    return await prisma.deckScore.findMany({
        where: {
            deckId
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    imageURL: true,
                }
            }
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

export async function addDeckToSaved(clerkId: string, deckId: string) {
    await prisma.user.update({
        where: {clerkId},
        data: {
            savedDecks: {connect: { id: deckId }},
        }
    })
    console.log(`Deck ${deckId} saved for User ${clerkId}`)
}

export async function removeDeckFromSaved(clerkId: string, deckId: string) {
    await prisma.user.update({
        where: { clerkId },
        data: {
            savedDecks: { disconnect: { id: deckId } },
        },
    });
    console.log(`Deck ${deckId} removed from saved decks for User ${clerkId}`)
}

export async function isDeckSaved(clerkId: string, deckId: string) {
    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            savedBy: {
                some: {
                    id: clerkId,
                },
            },
        },
    });

    return !!deck;
} 

export async function getSavedDecksForUser(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
        include: {
            savedDecks: {
                include: {
                    cards: true,
                    author: true,
                    students: true,
                    savedBy: true,
                }
            }
        }
    })

    return user?.savedDecks;
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

export async function createDeckCopy(deckId: string, clerkId: string) {
    const newAuthor = await prisma.user.findUnique({
        where: { clerkId },
    });

    if (!newAuthor) {
        throw new Error('User not found');
    }

    const originalDeck = await prisma.deck.findUnique({
        where: { id: deckId },
        include: { cards: true },
    });

    if (!originalDeck) {
        throw new Error('Deck not found');
    }

    const newDeck = await prisma.deck.create({
        data: {
            title: `${originalDeck.title} (Copy)`,
            description: originalDeck.description,
            author: { connect: { id: newAuthor.id }},
            cards: {
                create: originalDeck.cards.map((card) => ({
                    question: card.question,
                    answer: card.answer,
                })),
            },
            isPublic: false,
            isCopy: true,
        },
    });

    console.log("Deck copied successfully:", newDeck);
    redirect(`/decks/${newDeck.id}`)
}

export async function createGuide(formData: FormData) {
    const title = formData.get("title") as string;
    const deckId = formData.get("deckId") as string | null;
    const thumbnail = formData.get("file");
    const content = formData.get("content") as string | null;
    const user = await currentUser();

    const parsedContent = content ? JSON.parse(content) : null;

    const newGuide = await prisma.guide.create({
        data: {
            title,
            content: parsedContent,
            author: {
                connect: { clerkId: user?.id },
            },
            deck: deckId ? { connect: { id: deckId } } : undefined,
        }
    });
    
    redirect(`/guides/${newGuide.id}`);
}

export async function fetchGuideById(guideId: string) {
    const guide = await prisma.guide.findUnique({
        where: { id: guideId },
        include: { author: true, deck: { include: { cards: true, author: true }} },
    });

    if(!guide) {
        notFound()
    }

    return guide;
}

export async function fetchAllGuides() {
    return await prisma.guide.findMany({
        include: { author: true }
    });
}

// APP_AWS_REGION
// APP_AWS_ACCESS_KEY
// APP_AWS_SECRET_KEY
// AWS_S3_BUCKET_NAME

export async function s3Submit(formData: FormData) {
    try {
        const region = process.env.APP_AWS_REGION;
        const accessKeyId = process.env.APP_AWS_ACCESS_KEY;
        const secretAccessKey = process.env.APP_AWS_SECRET_KEY;

        if (!region || !accessKeyId || !secretAccessKey) {
            throw new Error("AWS configuration environment variables are not set.");
        }

        const client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });

        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_S3_BUCKET_NAME || '',
            Key: nanoid()
        })

        const formDataS3 = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value);
        })
        formDataS3.append('file', formData.get('file') as string);

        console.log(url, fields);
        const response = await fetch(url, {
            method: 'POST',
            body: formDataS3
        })

        const textResponse = await response.text();
        console.log(textResponse);

        if (response.ok) {
            console.log("File uploaded!")
        } else {
            console.log("File upload error")
        }

    } catch (error: any) {
        console.error(error);
    }
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