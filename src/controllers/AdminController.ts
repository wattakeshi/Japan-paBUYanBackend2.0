import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AdminController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const admin = await prisma.admin.findUnique({
                where: { email: email }
            });
            if (!admin) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(password, admin.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            const secret = process.env.JWT_SECRET as string || "default_secret_key";
            const token = jwt.sign(
                { id: admin.id },
                secret
            );
            return res.json({
                admin: {
                    id: admin.id,
                    email: admin.email
                },
                token
            });

        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Internal server error" });
        }
    }
}