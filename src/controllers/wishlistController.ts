import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js"
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    family: 4,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
} as any);

export class wishlistController {
    async create(req: Request, res: Response) {
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ error: "Invalid or none customer ID" })
        }
        try {
            const wishlistData = await prisma.wishlist.create({
                data: {
                    customerId
                }
            });
            try {
                await transporter.sendMail({
                    from: `"PaBUYan System" <${process.env.SMTP_USER}>`,
                    to: process.env.PABUYAN_OWNER_EMAIL,
                    subject: "New Wishlist sent!",
                    text: `A new wishlist was created!. ID: ${wishlistData.id}`,
                    html: `<p>You have a new wishlist to check!. ID: <strong>${wishlistData.id}</strong></p>`
                });
                console.log("E-mail de notificação enviado!");
            } catch (mailError) {
                console.error("Erro ao enviar e-mail, mas a wishlist foi criada:", mailError);
            }


            return res.status(201).json({ wishlistData })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: "fail to create wishlist" })
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

    async getAdminDashboard(req: Request, res: Response) {
        try {
            const data = await prisma.wishlist.findMany({
                include: {
                    customer: true,
                    requestedProducts: true
                },
                orderBy: { createdAt: 'desc' }
            });
            return res.json(data);
        } catch (error) {
            return res.status(400).json({ error: "fail to receive data" });
        }
    }

    async updateWishlistStatus(req: Request, res: Response) {
        const { id } = req.params;
        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid ID" })
        }
        const { status } = req.body;

        try {
            const updatedWishlist = await prisma.wishlist.update({
                where: { id },
                data: { status }
            });

            return res.json(updatedWishlist);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao atualizar status da wishlist" });
        }
    }
}