import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
export class wishlistController {
    async create(req: Request, res: Response) {
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ error: "Invalid or none customer ID" })
        }
        try {
            const newWishlist = await prisma.wishlist.create({
                data: {
                    customerId
                }
            })
            return res.status(201).json({ message: "wishlist created!", newWishlist })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: "fail to create wishlist" })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const getWishlist = prisma.wishlist.findMany(
                {
                    include: {
                        requestedProducts: true,
                        customer: true
                    }
                }
            )
            return res.status(200).json({ getWishlist })
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "fail fetch" })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        if (typeof status !== "string" || !status) { return res.status(400).json({ error: "Invalid status" }) }
        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" })
        }
        try {
            const update = await prisma.wishlist.update({
                where: { id },
                data: {
                    status: status
                }

            })
            return res.status(200).json({ message: "success updating wishlist", update })
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Fail to update wishlist" })
        }
    }
}