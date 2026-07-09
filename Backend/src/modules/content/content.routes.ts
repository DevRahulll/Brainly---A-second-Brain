import express from "express";
import {
    createContent,
    deleteSingleContent,
    getAllContent,
} from "./content.controllers.js";
import { authUser } from "../auth/auth.middleware.js";

const contentRouter = express.Router();

contentRouter.get("/", authUser, getAllContent);
contentRouter.post("/", authUser, createContent);
contentRouter.delete("/:contentId", authUser, deleteSingleContent);

export default contentRouter;
