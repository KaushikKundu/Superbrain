import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware  = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    if(decoded === null){
        res.status(401).json("Unauthorized");
        return;
    }
    req.userId = (decoded as JwtPayload).ID;
    next();
    res.status(200).json("Authenticated");
}