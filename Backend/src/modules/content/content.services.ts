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
    if (!allContent || allContent.length === 0)
        throw ApiError.notFound("Not Content Found! Create one");

    return allContent;
};

const deleteSingleContent = async (contentId: string) => {
    if (!contentId) {
        throw ApiError.unauthorized("Unauthorized! Login Again");
    }

    const isDeleted = await Content.findByIdAndDelete(contentId);
    console.log("Dleted log", isDeleted);
    if (!isDeleted) {
        throw ApiError.notFound("Content Not found");
    }

    return isDeleted;
};

export { newContent, getAllContent, deleteSingleContent };
