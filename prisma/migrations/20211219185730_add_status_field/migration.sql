/*
  Warnings:

  - You are about to drop the column `approvalBy` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "approvalBy",
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "status" "Status" NOT NULL;
