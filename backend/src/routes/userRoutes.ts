import { Router } from "express";
import {UserModel} from "../db/db";
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

userRouter.post("/signup", async (req:Request,res:Response) : Promise<any> =>  {
    try{
        const parsedBody = signupSchema.safeParse(req.body);
        if(parsedBody.success === false){
            return res.status(411).json("Invalid data");
        }
        const { name, email, password } = parsedBody.data;
        const existingUser = await UserModel.findOne({email});
        if (existingUser != null) {
            return res.status(403).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await UserModel.create({ name, email, hashedPassword });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Invalid data" });
    }
})

userRouter.post("/signin", async (req:Request, res:Response):Promise<any> => {
    try{
        const parsedBody = signinSchema.safeParse(req.body);
        if(parsedBody.success === false){
            return res.status(400).json("Invalid data");
        }
        const { email, password } = parsedBody.data;
        const existingUser = await UserModel.findOne({email,password});
        if(existingUser === null){
            res.status(403).json("no user found");
            return;
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET as string);
        res.status(200).json({token});
    }catch(error){
        res.status(500).json("Internal server error");
    }
})