/*
  Warnings:

  - You are about to drop the column `purchaseRequestId` on the `ItemLog` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `PriItemLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemLog" DROP CONSTRAINT "ItemLog_purchaseRequestId_fkey";

-- DropForeignKey
ALTER TABLE "PriItemLog" DROP CONSTRAINT "PriItemLog_itemId_fkey";

-- AlterTable
ALTER TABLE "ItemLog" DROP COLUMN "purchaseRequestId";

-- AlterTable
ALTER TABLE "PriItemLog" DROP COLUMN "itemId";
