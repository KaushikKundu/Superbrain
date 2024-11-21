import { Router } from "express";
import User from "../db/db";
import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter  = Router();
const signupSchema = z.object({
    name: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string().min(6).max(10),
});
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(10),
});
userRouter.post("/signup", async function(req:Request, res:Response){
    try{
        const parsedBody = signupSchema.safeParse(req.body);
        const existingUser = User.findOne({ email });
        if (existingUser != null) {
            return res.status(403).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({ name, email, hashedPassword });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Invalid data" });
    }
})

userRouter.post("/signin", async (req:Request, res:Response) => {
    try{
        const {email, password} = signinSchema.safeParse(req.body);
        const existingUser = User.findOne({email,password});
        if(existingUser === null){
            res.status(403).json("no user found");
            return;
        }
        const token = jwt.sign({email:existingUser.email}, process.env.JWT_SECRET as string);
    }
})