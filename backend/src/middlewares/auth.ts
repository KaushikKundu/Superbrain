import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export const authMiddleware  = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "You are not logged in" });
        return;
    }
    console.log("token:"+ token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" })
    }
}