import { Router, Request, Response } from "express";
import {ContentModel} from "../db/db";
import { authMiddleware } from "../middlewares/auth";

const contentRouter = Router();

contentRouter.post("/",authMiddleware, async (req:Request, res:Response) : Promise<any> =>  {
    const { title, link, type } = req.body;
    const userId =req.userId;
    console.log(userId);
    const newContent = await ContentModel.create({ title, link, type, tags:[], userId });
    res.status(201).json(newContent);
})
contentRouter.get("/",authMiddleware, async (req:Request, res:Response) : Promise<any> =>  {
   const allContent = await ContentModel.find({
    userId:req.userId
   }).populate("userId","username");
   res.status(200).json(allContent);
})

contentRouter.delete("/",authMiddleware, async (req:Request, res:Response) : Promise<any> =>  {
    //const content = await ContentModel.findById(req.params.id);
    const contentId = req.body.contentId;
    try{
        const deleted = await ContentModel.findOneAndDelete({
            _id:contentId,
            userId:req.userId
        });
        res.status(200).json(deleted);
    }catch(e){
        res.status(500).json(e)
    }
})

export default contentRouter;