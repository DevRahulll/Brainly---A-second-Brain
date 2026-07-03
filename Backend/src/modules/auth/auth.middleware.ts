import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/utils/api-error.js";
import { verifyToken } from "../../common/utils/tokens.js";
import User from "./auth.models.js";

export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { token } = req.cookies;
        if (!token) throw ApiError.unauthorized("Unauthorized!! Retry Login");

        const decodedToken = verifyToken(token) as { id: string };
        if (!decodedToken)
            throw ApiError.unauthorized("Unauthorized! Retry again");

        const user = await User.findById(decodedToken.id);
        if (!user) {
            throw ApiError.notFound("Not Found! Retry Login");
        }

        req.user = user;
        next();
    } catch (error) {
        throw ApiError.unauthorized("Invalid token");
    }
};
