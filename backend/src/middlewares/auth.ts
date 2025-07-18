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
export const authMiddleware  = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}