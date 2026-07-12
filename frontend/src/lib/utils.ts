import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import type { ContentType } from "@/types";

export function detectContentType(url: string): ContentType {
    try {
        const { hostname } = new URL(url);
        if (hostname.includes("youtube.com") || hostname.includes("youtu.be"))
            return "youtube";
        if (hostname.includes("twitter.com") || hostname.includes("x.com"))
            return "tweet";
        if (
            url.endsWith(".pdf") ||
            hostname.includes("docs.google.com") ||
            hostname.includes("notion.so")
        )
            return "document";
    } catch {
        // invalid URL — fall through
    }
    return "link";
}

export const CONTENT_TYPE_META: Record<
    ContentType,
    { label: string; emoji: string; color: string; badge: string }
> = {
    youtube: {
        label: "YouTube",
        emoji: "📺",
        color: "bg-red-50",
        badge: "bg-red-100 text-red-700 border-red-200",
    },
    tweet: {
        label: "Tweet",
        emoji: "🐦",
        color: "bg-blue-50",
        badge: "bg-blue-100 text-blue-700 border-blue-200",
    },
    document: {
        label: "Document",
        emoji: "📄",
        color: "bg-green-50",
        badge: "bg-green-100 text-green-700 border-green-200",
    },
    link: {
        label: "Link",
        emoji: "🔗",
        color: "bg-purple-50",
        badge: "bg-purple-100 text-purple-700 border-purple-200",
    },
    article: {
        label: "Article",
        emoji: "📰",
        color: "bg-amber-50",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
    },
};
