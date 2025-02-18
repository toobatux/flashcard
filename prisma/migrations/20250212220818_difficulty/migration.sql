/*
  Warnings:

  - The values [Beginner,Intermediate,Advanced] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
ALTER TABLE "Course" ALTER COLUMN "difficulty" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
ALTER TABLE "Course" ALTER COLUMN "difficulty" SET DEFAULT 'BEGINNER';
COMMIT;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "difficulty" SET DEFAULT 'BEGINNER';
