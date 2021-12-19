/*
  Warnings:

  - Added the required column `remarkId` to the `ItemLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemLog" ADD COLUMN     "remarkId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_remarkId_fkey" FOREIGN KEY ("remarkId") REFERENCES "Remark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
