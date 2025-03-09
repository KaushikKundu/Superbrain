import express from "express";
import {connectDb} from "./db/db";
import userRouter from "./routes/userRoutes";
import contentRouter from "./routes/contentRoutes";
const app = express(); 

//middlewares
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1/content", contentRouter);

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