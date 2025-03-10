import { Router, Request, Response } from "express";
import {ContentModel} from "../db/db";
import { authMiddleware } from "../middlewares/auth";

const  brainRouter = Router();
brainRouter.post("/",authMiddleware, async (req: Request, res: Response) => {
    
})
export default brainRouter;
