import type { Request, Response } from "express";
import ApiError from "../../common/utils/api-error.js";
import * as contentService from "./content.services.js";
import ApiResponse from "../../common/utils/api-response.js";

export const createContent = async (req: Request, res: Response) => {
    try {
        const content = await contentService.newContent({
            ...req.body,
            userId: req.user?.id,
        });
        console.log("Body", req.body);
        ApiResponse.created(res, "Content created successful", content);
    } catch (error) {
        throw ApiError.internalServer();
    }
};

export const getAllContent = async (req: Request, res: Response) => {
    try {
        const allContent = await contentService.getAllContent(req.user!.id);
        ApiResponse.ok(res, "All content are : ", allContent);
    } catch (error) {
        throw ApiError.internalServer();
    }
};

export const deleteSingleContent = async (req: Request, res: Response) => {
    try {
        const contentId = req.params.contentId as string;
        const userId = req.user?.id;
        const isDeleted = await contentService.deleteSingleContent(
            contentId,
            userId,
        );
        ApiResponse.ok(res, "Deleted Successful", isDeleted);
    } catch (error) {
        throw ApiError.internalServer();
    }
};
