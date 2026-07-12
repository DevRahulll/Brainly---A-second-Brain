export type ContentType = "youtube" | "tweet" | "document" | "link" | "article";

export interface Content {
    _id: string;
    link: string;
    type: ContentType;
    title: string;
    userId: string;
    createdAt: string;
}

export interface User {
    id: string;
    fullName: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
