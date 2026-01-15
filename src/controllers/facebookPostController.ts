import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"

export class facebookPostController {
    async create(req: Request, res: Response) {
        try {
            const { postName, url } = req.body;
            if (!url) {
                return res.status(401).json({ error: "url undefined" })
            }
            await prisma.facebookPost.create({
                data: {
                    postName,
                    url
                }
            })
            res.status(200).json({ message: "Success creating Post" })
        } catch (error) {
            res.status(401).json({ error: "Failed to create post" })
        }
    }
}