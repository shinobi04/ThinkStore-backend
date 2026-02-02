/*
  Warnings:

  - You are about to drop the column `replacedByTokenId` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `revokedAt` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "replacedByTokenId",
DROP COLUMN "revokedAt",
DROP COLUMN "updatedAt";
