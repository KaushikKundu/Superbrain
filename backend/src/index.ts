import express from "express";
import {connectDb} from "./db/db";
    
const app = express();
const userRouter = express.Router();
const contentRouter = express.Router();
const brainRouter = express.Router();

//middlewares
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1/brain", brainRouter);
app.use("/api/v1/content", contentRouter);

//routes
app.get("/", (req,res) => {
    res.send("Hello World");
})

connectDb().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})