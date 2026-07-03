import express from "express";
import {
    createContent,
    deleteSingleContent,
    getAllContent,
} from "./content.controllers.js";
import { authUser } from "../auth/auth.middleware.js";

const contentRouter = express.Router();

contentRouter.get("/content", authUser, getAllContent);
contentRouter.post("/content", authUser, createContent);
contentRouter.delete("/content/:contentId", authUser, deleteSingleContent);

export default contentRouter;
