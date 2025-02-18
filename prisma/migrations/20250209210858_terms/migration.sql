/*
  Warnings:

  - You are about to drop the `UserTermStudy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTermStudy" DROP CONSTRAINT "UserTermStudy_termId_fkey";

-- DropForeignKey
ALTER TABLE "UserTermStudy" DROP CONSTRAINT "UserTermStudy_userId_fkey";

-- DropTable
DROP TABLE "UserTermStudy";

-- CreateTable
CREATE TABLE "UserTermProgress" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "termId" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTermProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTermProgress_userId_termId_key" ON "UserTermProgress"("userId", "termId");

-- AddForeignKey
ALTER TABLE "UserTermProgress" ADD CONSTRAINT "UserTermProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTermProgress" ADD CONSTRAINT "UserTermProgress_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
