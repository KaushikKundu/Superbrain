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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const contentRouter = (0, express_1.Router)();
contentRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    const userId = req.userId;
    //console.log(userId);
    try {
        const newContent = yield db_1.ContentModel.create({
            title,
            link,
            type,
            tags: [],
            userId
        });
        res.status(201).json(newContent);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
contentRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allContent = yield db_1.ContentModel.find({
        userId: req.userId,
    }).populate("userId", "username");
    res.status(200).json(allContent);
    console.log(allContent);
}));
contentRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    console.log(contentId);
    try {
        const deleted = yield db_1.ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId,
        });
        res.status(200).json(deleted);
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
exports.default = contentRouter;
