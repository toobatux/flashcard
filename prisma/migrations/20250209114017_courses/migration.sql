/*
  Warnings:

  - You are about to drop the column `deckId` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeckScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LastStudiedDecks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `Guide` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SELECT');

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_authorId_fkey";

-- DropForeignKey
ALTER TABLE "DeckScore" DROP CONSTRAINT "DeckScore_deckId_fkey";

-- DropForeignKey
ALTER TABLE "DeckScore" DROP CONSTRAINT "DeckScore_userId_fkey";

-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_deckId_fkey";

-- DropForeignKey
ALTER TABLE "_LastStudiedDecks" DROP CONSTRAINT "_LastStudiedDecks_A_fkey";

-- DropForeignKey
ALTER TABLE "_LastStudiedDecks" DROP CONSTRAINT "_LastStudiedDecks_B_fkey";

-- DropForeignKey
ALTER TABLE "_SavedDecks" DROP CONSTRAINT "_SavedDecks_A_fkey";

-- DropIndex
DROP INDEX "Guide_deckId_key";

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "deckId",
ADD COLUMN     "courseId" TEXT;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Deck";

-- DropTable
DROP TABLE "DeckScore";

-- DropTable
DROP TABLE "_LastStudiedDecks";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500),
    "difficulty" "Difficulty" NOT NULL DEFAULT 'Beginner',
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "isCopy" BOOLEAN NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(500) NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'SELECT',
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeOptions" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "ChallengeOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseScore" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LastStudiedCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseScore_userId_courseId_key" ON "CourseScore"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "_LastStudiedCourses_AB_unique" ON "_LastStudiedCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_LastStudiedCourses_B_index" ON "_LastStudiedCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_courseId_key" ON "Guide"("courseId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeOptions" ADD CONSTRAINT "ChallengeOptions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseScore" ADD CONSTRAINT "CourseScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseScore" ADD CONSTRAINT "CourseScore_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LastStudiedCourses" ADD CONSTRAINT "_LastStudiedCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LastStudiedCourses" ADD CONSTRAINT "_LastStudiedCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedDecks" ADD CONSTRAINT "_SavedDecks_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
