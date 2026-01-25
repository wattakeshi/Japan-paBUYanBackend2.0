import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
// model RequestedProduct {
//   id         String   @id @default(uuid())
//   name       String
//   details    String?
//   qty        Int      @default(1)
//   status     String   @default("unseen")
//   wishlistId String
//   wishlist   Wishlist @relation(fields: [wishlistId], references: [id])

//   @@map("requestedproducts")
// }

export class RequestedProductsController {
    async create(req: Request, res: Response) {
        const { productlist } = req.body;
        if (!Array.isArray(productlist) || productlist.length === 0) {
            return res.status(400).json({ error: "The products list must be a non-empty array." });
        }

        try {
            const formattedProducts = productlist.map((p: any) => ({
                name: String(p.name),
                details: p.details || "",
                qty: Number(p.qty) || 1,
                wishlistId: String(p.wishlistId),
                status: "unseen"
            }));

            const newProduct = await prisma.requestedProduct.createMany({
                data:
                    formattedProducts
            })

            return res.status(200).json({ message: "success creating products!", newProduct })
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "fail to create products" })
        }
    }
    async update(req: Request, res: Response) {
        const { status } = req.body;
        const { id } = req.params;
        if (typeof id !== "string" || !id) { return res.status(400).json("Invalid ID") }
        try {
            const change = await prisma.requestedProduct.update({
                where: { id },
                data: { status: status }
            })
            res.status(200).json({ message: "success updating product" })
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "fail to update product" })
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        if (typeof id !== "string") { return res.status(400).json({ error: "Invalid ID!" }) }
        const { status, costPrice, salePrice, quantity } = req.body;

        try {
            const updateData: any = {};

            if (status) updateData.status = status;

            if (costPrice !== undefined) updateData.costPrice = Number(costPrice);
            if (salePrice !== undefined) updateData.salePrice = Number(salePrice);
            if (quantity !== undefined) updateData.qty = Number(quantity);

            const updated = await prisma.requestedProduct.update({
                where: { id },
                data: updateData
            });

            return res.json(updated);
        } catch (error) {
            console.error("Erro Prisma:", error);
            return res.status(400).json({ error: "Erro ao atualizar produto. Verifique se os campos existem no banco." });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await prisma.requestedProduct.findMany();
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar produtos" });
        }
    }
} 