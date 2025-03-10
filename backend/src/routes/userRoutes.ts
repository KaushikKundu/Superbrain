import { Router } from "express";
import { UserModel } from "../db/db";
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
            console.log(existingUser);
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
                return res.status(400).json("Invalid data");
            }
            const { username, password } = parsedBody.data;
            const existingUser = await UserModel.findOne({ username });
            if (existingUser === null) {
                res.status(403).json("no user found");
                return;
            }
            const result = await bcrypt.compare(password, existingUser.password);
            console.log(result);
            if (result == true) {
                const token = jwt.sign(
                    { id: existingUser._id },
                    process.env.JWT_SECRET as string
                );
                res.status(200).json({ token });
            } else {
                res.status(403).json({ message: "wrong password" });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json("Internal server error");
        }
    }
);
export default userRouter;
