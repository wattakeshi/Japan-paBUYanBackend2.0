-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "requestedproducts" ADD COLUMN     "costPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "salePrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
