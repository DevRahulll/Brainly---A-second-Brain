import ApiError from "../../common/utils/api-error.js";
import Content from "./content.models.js";
import type { IContentInput } from "./content.types.js";

const newContent = async ({
    link,
    contentType,
    title,
    tag,
    userId,
}: IContentInput) => {
    if (!link || !contentType || !title || !tag || !userId) {
        throw ApiError.invalidCredentials("All fields are required");
    }

    const contentCreated = await Content.create({
        link,
        contentType,
        title,
        tag,
        userId,
    });

    return contentCreated;
};

const getAllContent = async (userId: string) => {
    if (!userId) {
        throw ApiError.unauthorized("Unauthorized! Login Again");
    }

    const allContent = await Content.find({ userId });

    return allContent;
};

const deleteSingleContent = async (contentId: string, userId: string) => {
    if (!contentId) {
        throw ApiError.badRequest("Content ID is required");
    }

    const content = await Content.findById(contentId);
    if (!content) throw ApiError.notFound("Content not found");

    if (content.userId.toString() !== userId) {
        throw ApiError.forbidden("You don't have permission to delete this");
    }

    await content.deleteOne();

    return { deleted: true, contentId };
};

export { newContent, getAllContent, deleteSingleContent };
