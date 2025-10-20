"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = (0, express_1.Router)();
const signupSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(10),
    password: zod_1.default.string().min(4).max(10),
});
const signinSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(10),
    password: zod_1.default.string().min(4).max(10),
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = signupSchema.safeParse(req.body);
        if (parsedBody.success === false) {
            return res.status(411).json("Invalid data");
        }
        const { username, password } = parsedBody.data;
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (existingUser != null) {
            return res.status(403).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = signinSchema.safeParse(req.body);
        if (parsedBody.success === false) {
            return res
                .status(400)
                .json({ message: "Invalid username or password format" });
        }
        const { username, password } = parsedBody.data;
        const existingUser = yield db_1.UserModel.findOne({ username });
        if (!existingUser) {
            res.status(401).json({
                message: "Invalid username or password",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
userRouter.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
}));
exports.default = userRouter;
