import { Router } from "express";
import { UserModel } from "../db";
import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userRouter = Router();
const signupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(10),
});
const signinSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(4).max(10),
});

userRouter.post(
    "/signup",
    async (req: Request, res: Response): Promise<any> => {
        try {
            const parsedBody = signupSchema.safeParse(req.body);
            if (parsedBody.success === false) {
                return res.status(411).json("Invalid data");
            }
            const { username, password } = parsedBody.data;
            const existingUser = await UserModel.findOne({ username });
            if (existingUser != null) {
                return res.status(403).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({ username, password: hashedPassword });
            res.status(201).json({ message: "User created successfully" });
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }
);

userRouter.post(
    "/signin",
    async (req: Request, res: Response): Promise<any> => {
        try {
            const parsedBody = signinSchema.safeParse(req.body);
            if (parsedBody.success === false) {
                return res
                    .status(400)
                    .json({ message: "Invalid username or password format" });
            }

            const { username, password } = parsedBody.data;
            const existingUser = await UserModel.findOne({ username });

            if (!existingUser) {
                res.status(401).json({
                    message: "Invalid username or password",
                });
                return;
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ message: "Invalid username or password" });
            }

            const token = jwt.sign(
                { id: existingUser._id },
                process.env.JWT_SECRET as string,
                { expiresIn: "24h" }
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false, 
                sameSite:
                    process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
     
            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: existingUser._id,
                    username: existingUser.username,
                },
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);
export default userRouter;
