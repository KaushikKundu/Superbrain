import { Router, Request, Response } from "express";
import { z } from "zod";
import {ContentModel} from "../db/db";
const contentRouter = Router();
interface Content {
    title: string;
    link: string;
    type: "document" | "tweet" | "youtube" | "link"
    tags: string[];
}

contentRouter.post("/", async (req:Request, res:Response) : Promise<any> =>  {
    const { title, link, type } = req.body;
    const newContent = await ContentModel.create({ title, link, type, tags:[] });
    res.status(201).json(newContent);
})
contentRouter.get("/", async (req:Request, res:Response) : Promise<any> =>  {
    const allContent = await ContentModel.find({req.headers.userId}); 
    if(allContent === null){
        res.status(404).json("No content found");
        return;
    }
    res.status(200).json(allContent);
})
contentRouter.delete("/:id", async (req:Request, res:Response) : Promise<any> =>  {
    const { id } = req.params;
})