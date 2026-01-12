import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

export class CustomerController {
    async create(req: Request, res: Response) {
        try {
            const { name, familyName, contact, address } = req.body;
            const costumer = await prisma.customer.create({
                data: {
                    name,
                    familyName,
                    contact,
                    address
                }
            });
            return res.status(201).json({ message: "succesfully created customer", costumer })
        } catch (error) {
            console.log("erro detalhado", error)
            return res.status(400).json({ error: "error to create customer" })
        }
    }
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (typeof id !== "string") {
                return res.status(400).json({ message: "invalid ID format!" })
            }
            await prisma.customer.delete({
                where: {
                    id: id

                }
            })
            return res.status(200).json({ message: "customer deleted!" })
        } catch (error) {
            console.log("detailed error:", error)
            return res.status(400).json({ error: "error to delete customer" })
        }
    }

}