import type { Response } from "express";

class ApiResponse {
    static ok<T = any>(res: Response, message: string, data: T | null = null) {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    }

    static created<T = any>(res: Response, message: string, data: T | null = null) {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    }

    static noContent<T = any>(res: Response, message: string, data: T | null = null) {
        return res.status(204).json({
            success: true,
            message,
            data,
        });
    }
}

export default ApiResponse;
