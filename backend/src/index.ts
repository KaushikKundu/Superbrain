import express from "express";
import {connectDb} from "./db";
import userRouter from "./routes/authRoutes";
import contentRouter from "./routes/contentRoutes";
import brainRouter from "./routes/brainRoutes"
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth";
import path from "path";
import fs from "fs";
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
// Serve frontend when built (frontend/dist) — in production the backend can serve the static files.
const staticPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(staticPath)) {
    app.use(express.static(staticPath));

    // Serve index.html for all non-API routes (SPA fallback)
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(staticPath, 'index.html'));
    });
} else {
    //route
    app.get("/", (req,res) => {
        res.send("Hello World");
    })
}
app.get("/check", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

connectDb().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})