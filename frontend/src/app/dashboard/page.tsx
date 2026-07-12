"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Content, ContentType } from "@/types";

export default function DashboardPage() {
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState<ContentType | "all">("all");
    return (
        <>
            <Sidebar
                content={[]}
                onTypeChange={setActiveType}
                activeType={"all"}
                email={"xyz@gmail.com"}
            />
        </>
    );
}
