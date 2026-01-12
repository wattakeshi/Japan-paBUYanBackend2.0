-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlists" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requestedproducts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'unseen',
    "wishlistId" TEXT NOT NULL,

    CONSTRAINT "requestedproducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facebookposts" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facebookposts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestedproducts" ADD CONSTRAINT "requestedproducts_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "wishlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
