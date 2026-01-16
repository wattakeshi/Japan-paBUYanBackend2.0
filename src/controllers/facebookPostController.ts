import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

export class facebookPostController {
    async getAll(req: Request, res: Response) {
        try {
            const posts = await prisma.facebookPost.findMany()
            res.status(201).json({ posts })
        } catch (error) {
            return res.status(400).json({ error: "failure" })
        }
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;
        if (typeof id !== "string") return res.status(400).json({ error: "invalid ID" })
        try {
            await prisma.facebookPost.delete({
                where: { id }
            })

            res.status(200).json({ message: "post Removed!" })
        } catch (error) {
            return res.status(400).json({ error: "error to remove" })
        }

    }

    async update(req: Request, res: Response) {
        const { postName, url } = req.body;
        const { id } = req.params;
        if (typeof id != "string") { return res.status(400).json({ error: "Invalid ID" }) }
        try {
            const updated = await prisma.facebookPost.update({
                where: { id },
                data: {
                    postName,
                    url
                }
            })
            res.status(200).json({ message: "Succesfully updated!", updated })
        } catch (error) {
            return res.status(400).json({ error: "fail" })
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { postName, url } = req.body;
            if (!url) {
                return res.status(401).json({ error: "url undefined" })
            }
            const newPost = await prisma.facebookPost.create({
                data: {
                    postName,
                    url
                }
            })
            res.status(200).json({ message: "Success creating Post", newPost })
        } catch (error) {
            res.status(401).json({ error: "Failed to create post" })
        }
    }
}