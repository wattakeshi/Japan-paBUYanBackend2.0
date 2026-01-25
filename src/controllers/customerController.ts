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

    async update(req: Request, res: Response) {
        try {
            const { name, familyName, contact, address } = req.body;
            const { id } = req.params;
            if (typeof id !== "string") { return res.status(400).json({ error: "invalid ID!" }) }
            const updatedCustomer = await prisma.customer.update({
                where: { id },
                data: {
                    name,
                    familyName,
                    contact,
                    address
                }
            })
            return res.status(201).json({ updatedCustomer })
        } catch (error) {
            console.log("detailed error:", error)
        }
    }



    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { active } = req.body;
            if (typeof id !== "string") {
                return res.status(400).json({ message: "invalid ID format!" })
            }
            await prisma.customer.update({
                where: {
                    id: id

                },
                data: {
                    active: active
                }
            })
            return res.status(200).json({ message: "customer deleted!" })
        } catch (error) {
            console.log("detailed error:", error)
            return res.status(400).json({ error: "error to delete customer" })
        }
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            if (typeof id !== "string") { return res.status(400).json({ error: "Invalid ID" }) }
            const user = await prisma.customer.findUnique({
                where: { id }
            })
            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "something went wrong" })
        }
    }

}