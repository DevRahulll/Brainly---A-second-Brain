import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.services.js";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = await authService.register(req.body);
        ApiResponse.created(res, "Registration successful.", user);
    } catch (error) {
        ApiError.internalServer();
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userObj, token } = await authService.login(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        ApiResponse.ok(res, "Login successful", userObj);
    } catch (error) {
        ApiError.internalServer();
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = await authService.getProfile(req.user!.id);
        ApiResponse.ok(res, "Profile ", user);
    } catch (error) {
        ApiError.internalServer();
    }
};

export const logoutUser = async (
    eq: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.clearCookie("token");
        ApiResponse.ok(res, "Logout successful");
    } catch (error) {
        ApiError.internalServer();
    }
};
