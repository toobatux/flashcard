"use server";
import prisma from "@/db";
import { Difficulty, Prisma } from "@prisma/client";
import { Course, User, Lesson } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

type CourseWithRelations = Prisma.CourseGetPayload<{
    include: { lessons: true; author: true, students: true, savedBy: true, guide: true };
  }>;

export interface TermWithProgress {
    id: string;
    question: string;
    answer: string;
    progress: { correctCount: number };
  }

type UserWithRelations = Prisma.UserGetPayload<{
    include: { lastStudiedCourses: true, savedCourses: true };
}>;

export async function createCourse(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isPublic = formData.get("public") === "true";
    const user = await currentUser();

    const difficultyString = formData.get("difficulty") as string;

    let difficulty: Difficulty;
    switch(difficultyString) {
        case "BEGINNER":
            difficulty = Difficulty.BEGINNER;
            break;
        case "INTERMEDIATE":
            difficulty = Difficulty.INTERMEDIATE;
            break;
        case "ADVANCED":
            difficulty = Difficulty.ADVANCED;
            break;
        default:
            console.log("Difficulty: ", difficultyString);
            throw new Error("Invalid difficulty value");
    }

    console.log("isPublic:", isPublic);

    const newCourse = await prisma.course.create({ 
        data: { 
            title, 
            description,
            isPublic: false,
            difficulty: difficulty,
            author: {
                connect: { clerkId: user?.id },
            },
            isCopy: false,
        }});

    redirect(`/courses/${newCourse.id}`);
}

export async function editCourse(formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const user = await currentUser();
    console.log("Updating deck:" + id)

    const cards = JSON.parse(formData.get("cards") as string) as Array<{
        question: string;
        answer: string;
      }>;

      await prisma.course.update({
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
      await prisma.lesson.deleteMany({
        where: { courseId: id },
      });
    
      // Create new cards for the deck
    //   await prisma.lesson.createMany({
    //     data: cards.map((card) => ({
    //       question: card.question,
    //       answer: card.answer,
    //       deckId: id,
    //     })),
    //   });

    redirect(`/decks/${id}`);
}

export async function deleteCourse(id: string) {
    await prisma.course.delete({
        where: {id}
    });

    redirect("/courses");
}

export async function publishCourse(id: string) {
    await prisma.course.update({
        where: { id },
        data: {
            isPublic: true
        }
    })

    redirect(`/courses/${id}`);
}

export async function fetchPublicCourses(): Promise<CourseWithRelations[]> {
    return await prisma.course.findMany({
        where: { isPublic: true },
        include: { lessons: true, author: true, students: true, savedBy: true, guide: true },
    });
}

export async function fetchMyCourses(authorId: string): Promise<CourseWithRelations[]> {
    return await prisma.course.findMany({
        where: { authorId: authorId },
        include: { lessons: true, author: true, students: true, savedBy: true, guide: true },
    });
}

export async function fetchCourseById(id: string) {
    const clerkUser = await currentUser();
    const clerkId = clerkUser?.id;
    const course = await prisma.course.findUnique({
        where: { id },
        include: { lessons: true, author: true, students: true, savedBy: {
            where: { clerkId }
        }, guide: true },
    });

    if(!course) {
        notFound()
    }

    return {
        ...course,
        savedByUser: course.savedBy.length > 0
    };
}

export async function fetchLessonById(id: number) {
    const lesson = await prisma.lesson.findUnique({
        where: {id},
        include: {
            terms: true,
            course: {
                select: {
                    id: true,
                    title: true,
                    difficulty: true,
                    author: true,
                    _count: {
                        select: {
                            lessons: true
                        }
                    }
                }
            },
        }
    })

    if(!lesson) {
        notFound()
    }

    return lesson;
}

export async function getTermsWithProgress(lessonId: number, userId: string) {
    const terms = await prisma.term.findMany({
        where: {
            lessonId
        },
        include: {
            progress: {
                where: {
                    userId
                },
            },
        },
    })

    return terms.map(term => ({
        id: term.id,
        question: term.question,
        questionAlt: term.questionAlt,
        answer: term.answer,
        correctCount: term.progress[0]?.correctCount ?? 0
    }))
}

export async function getUser(clerkId: string): Promise<UserWithRelations | null> {
    return await prisma.user.findUnique({
        where: { clerkId },
        include: {
            lastStudiedCourses: {
                include: {
                    author: true,
                    lessons: true,
                    savedBy: true,
                }
            },
            savedCourses: true,
        }
    });
}

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({
        where: { id: userId },
        include: {
            lastStudiedCourses: {
                include: {
                    author: true,
                    lessons: true,
                    savedBy: true,
                }
            },
            savedCourses: true
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

export async function updateDeckScore(userId: string, courseId: string, scoreToAdd: number) {
    await prisma.courseScore.upsert({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
        update: {
            score: {
                increment: scoreToAdd,
            },
        },
        create: {
            userId,
            courseId,
            score: scoreToAdd,
        },
    });
}

export async function getCourseScores(courseId: string) {
    return await prisma.courseScore.findMany({
        where: {
            courseId
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

export async function getTermWithProgress(lessonId: number, userId: string){
    return await prisma.term.findMany({
        where: {
            lessonId
        },
        include: {
            progress: {
                where: {
                    userId
                }
            }
        }
    })
}

export async function getTermProgress(lessonId: number, userId: string) {
    return await prisma.term.findMany({
        where: {
            lessonId
        },
        select: {
            id: true,
            question: true,
            questionAlt: true,
            answer: true,
            progress: {
                where: {
                    userId
                },
                select: {
                    correctCount: true
                }
            }
        }
    });
}


export async function updateRecentDecks(clerkId: string, courseId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
        include: { lastStudiedCourses: true },
    });

    // Keep only the last 2 studied decks
    const updatedDecks = [...user!.lastStudiedCourses.map(course => course.id), courseId].slice(-2);

    await prisma.user.update({
        where: { clerkId },
        data: {
            lastStudiedCourses: {
                set: updatedDecks.map(id => ({id})),
            }
        }
    })

    await prisma.course.update({
        where: { id: courseId },
        data: {
            students: {
                connect: {id: user?.id}
            }
        }
    })
}

export async function saveCourse(clerkId: string, courseId: string) {
    await prisma.user.update({
        where: {clerkId},
        data: {
            savedCourses: {connect: { id: courseId }},
        }
    })
    console.log(`Course ${courseId} saved for User ${clerkId}`)
}

export async function unsaveCourse(clerkId: string, courseId: string) {
    await prisma.user.update({
        where: { clerkId },
        data: {
            savedCourses: { disconnect: { id: courseId } },
        },
    });
    console.log(`Course ${courseId} removed from saved for User ${clerkId}`)
}

export async function isCourseSaved(clerkId: string, deckId: string) {
    const deck = await prisma.course.findFirst({
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

export async function getSavedCoursesForUser(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId },
        include: {
            savedCourses: {
                include: {
                    lessons: true,
                    author: true,
                    students: true,
                    savedBy: true,
                }
            }
        }
    })

    return user?.savedCourses;
}

export async function create(formData: FormData) {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const deckId = formData.get("deckId") as string;

    await prisma.lesson.create({
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