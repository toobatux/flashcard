-- CreateTable
CREATE TABLE "UserTermStudy" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "termId" INTEGER NOT NULL,
    "studyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTermStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTermStudy_userId_termId_key" ON "UserTermStudy"("userId", "termId");

-- AddForeignKey
ALTER TABLE "UserTermStudy" ADD CONSTRAINT "UserTermStudy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTermStudy" ADD CONSTRAINT "UserTermStudy_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
