-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PIPE', 'FITTING', 'VALVES');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ISSUE_REQUEST_SENT', 'MATERIAL_REQUEST_SENT', 'PURCHASE_REQUEST_SENT', 'CHECKOUT', 'CREATING_PURCHASE_ORDER', 'PURCHASE_ORDER_SENT', 'DELIVERY', 'DELIVERED', 'ISSUE_GOOD_SENT', 'CANCELLED', 'SELECTED_FOR_CHECKOUT', 'BOOK_REQUEST');

-- CreateEnum
CREATE TYPE "Incoterms" AS ENUM ('FCA', 'CIF', 'DEP');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "booked" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "subcodeValue" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemLog" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rejectedReason" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locationId" INTEGER,
    "transactionId" INTEGER NOT NULL,
    "purchaseRequestId" INTEGER,

    CONSTRAINT "ItemLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriItemLog" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incoterm" "Incoterms" NOT NULL,
    "purchaseRequestId" INTEGER NOT NULL,
    "parentItemLogId" INTEGER NOT NULL,

    CONSTRAINT "PriItemLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsOnSuppliers" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "ItemsOnSuppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "category" "Category" NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcode" (
    "value" TEXT NOT NULL,

    CONSTRAINT "Subcode_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "requestedBy" TEXT NOT NULL,
    "approvalBy" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequest" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "PurchaseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_code_key" ON "Item"("code");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subcodeValue_fkey" FOREIGN KEY ("subcodeValue") REFERENCES "Subcode"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "PurchaseRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriItemLog" ADD CONSTRAINT "PriItemLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriItemLog" ADD CONSTRAINT "PriItemLog_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "PurchaseRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriItemLog" ADD CONSTRAINT "PriItemLog_parentItemLogId_fkey" FOREIGN KEY ("parentItemLogId") REFERENCES "ItemLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnSuppliers" ADD CONSTRAINT "ItemsOnSuppliers_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnSuppliers" ADD CONSTRAINT "ItemsOnSuppliers_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
