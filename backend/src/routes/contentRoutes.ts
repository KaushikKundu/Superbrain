import { Router, Request, Response } from "express";
import {ContentModel} from "../db/db";
import { authMiddleware } from "../middlewares/auth";

const contentRouter = Router();

contentRouter.post("/",authMiddleware, async (req:Request, res:Response) : Promise<any> =>  {
    const { title, link, type } = req.body;
    const newContent = await ContentModel.create({ title, link, type, tags:[] });
    res.status(201).json(newContent);
})
contentRouter.get("/",authMiddleware, async (req:Request, res:Response) : Promise<any> =>  {
    //@ts-ignore
    const allContent = await ContentModel.find({userId:req.headers.userId});
    if(allContent === null){
        res.status(404).json("No content found");
        return;
    }
    res.status(200).json(allContent);
})

contentRouter.delete("/:id", async (req:Request, res:Response) : Promise<any> =>  {
    const content = await ContentModel.findById(req.params.id);
    if(content === null){
        res.status(404).json("Content not found");
        return;
    }
    await ContentModel.deleteOne({_id:req.params.id});
    res.status(200).json("Content deleted");
})