import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        res.status(401).json({ error: "Token error" });
        return;
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme as string)) {
        res.status(401).json({ error: "Token malformatted" });
        return;
    }
    const secret: string = process.env.JWT_SECRET as string;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    jwt.verify(token as string, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: "Token invalid" });
            return;
        }
        return next();
    });
};