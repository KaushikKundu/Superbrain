import { Router, Request, Response } from "express";
import { ContentModel } from "../db";

const contentRouter = Router();

contentRouter.post(
  "/",
  async (req: Request, res: Response): Promise<any> => {
    const { title, link, type } = req.body;
    const userId = req.userId;
    //console.log(userId);
    try {
      const newContent = await ContentModel.create({
        title,
        link,
        type,
        tags: [],
        userId
      });
      res.status(201).json(newContent);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
contentRouter.get(
  "/",
  async (req: Request, res: Response): Promise<any> => {
    const allContent = await ContentModel.find({
      userId: req.userId,
    }).populate("userId", "username");
    res.status(200).json(allContent);
    console.log(allContent)
  }
);

contentRouter.delete(
  "/:id",
  async (req: Request, res: Response): Promise<any> => {
    const contentId = req.params.id;
    try {
      const deleted = await ContentModel.findByIdAndDelete({
        _id: contentId,
        userId: req.userId,
      });
      res.status(200).json(deleted);
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

export default contentRouter;
