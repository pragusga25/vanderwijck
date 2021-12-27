/*
  Warnings:

  - Added the required column `supplierId` to the `PriItemLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriItemLog" ADD COLUMN     "supplierId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PriItemLog" ADD CONSTRAINT "PriItemLog_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
