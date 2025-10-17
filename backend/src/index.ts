import express from "express";
import {connectDb} from "./db";
import userRouter from "./routes/authRoutes";
import contentRouter from "./routes/contentRoutes";
import brainRouter from "./routes/brainRoutes"
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth";
const app = express(); 

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1/content",authMiddleware, contentRouter);
app.use("/api/v1/brain",authMiddleware,brainRouter);

//route
app.get("/", (req,res) => {
    res.send("Hello World");
})

connectDb().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})