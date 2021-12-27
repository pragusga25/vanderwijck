-- DropForeignKey
ALTER TABLE "PriItemLog" DROP CONSTRAINT "PriItemLog_supplierId_fkey";

-- AlterTable
ALTER TABLE "PriItemLog" ALTER COLUMN "supplierId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PriItemLog" ADD CONSTRAINT "PriItemLog_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
