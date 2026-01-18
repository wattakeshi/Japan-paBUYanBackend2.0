-- DropForeignKey
ALTER TABLE "requestedproducts" DROP CONSTRAINT "requestedproducts_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_customerId_fkey";

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestedproducts" ADD CONSTRAINT "requestedproducts_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "wishlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
