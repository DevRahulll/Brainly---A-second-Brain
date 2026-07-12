"use client";

import { useRouter } from "next/navigation";
import {
    Brain,
    LayoutGrid,
    FileText,
    Link2,
    Newspaper,
    Tag,
    LogOut,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
// import { api } from "@/lib/api";
import type { ContentType, Content } from "@/types";

interface SidebarProps {
    content: Content[];
    activeType: ContentType | "all";
    onTypeChange: (type: ContentType | "all") => void;
    // activeTag: string | null;
    // onTagChange: (tag: string | null) => void;
    email: string;
}

const TYPE_NAV: {
    type: ContentType | "all";
    label: string;
    icon: React.ElementType;
}[] = [
    { type: "all", label: "All notes", icon: LayoutGrid },
    // { type: "youtube", label: "YouTube", icon: Youtube },
    // { type: "tweet", label: "Tweets", icon: Twitter },
    { type: "document", label: "Documents", icon: FileText },
    { type: "link", label: "Links", icon: Link2 },
    { type: "article", label: "Articles", icon: Newspaper },
];

function countByType(content: Content[], type: ContentType | "all"): number {
    if (type === "all") return content.length;
    return content.filter((c) => c.type === type).length;
}

function getInitials(name: string) {
    return name.slice(0, 2).toUpperCase();
}

export function Sidebar({
    content,
    activeType,
    onTypeChange,
    // activeTag,
    // onTagChange,
    email,
}: SidebarProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            // await api.signout();
            router.push("/signin");
        } catch {
            toast.error("Sign out failed");
        }
    };

    return (
        <aside className="w-56 shrink-0 flex flex-col h-full border-r bg-muted/30">
            {/* brand */}
            <div className="flex items-center gap-2.5 px-4 py-4 border-b">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                    <p className="text-sm font-semibold leading-none">
                        Second Brain
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Brainly
                    </p>
                </div>
            </div>

            {/* Content-type nav */}
            <nav className="flex flex-col gap-0.5 px-2 pt-4 flex-1 overflow-y-auto">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest px-2 mb-1">
                    Content type
                </p>
                {TYPE_NAV.map(({ type, label, icon: Icon }) => {
                    const count = countByType(content, type);
                    return (
                        <button
                            key={type}
                            onClick={() => {
                                onTypeChange(type);
                                onTagChange(null);
                            }}
                            className={cn(
                                "flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors w-full text-left",
                                activeType === type && activeTag === null
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1 truncate">{label}</span>
                            {count > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="text-[10px] h-4 px-1.5 font-normal"
                                >
                                    {count}
                                </Badge>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* User profile */}
            <div className="border-t px-2 py-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="flex items-center gap-2.5 w-full px-2 py-2 rounded-md hover:bg-accent transition-colors text-left">
                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-semibold text-primary">
                                    {getInitials(email)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate leading-none">
                                    {email}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                    Free plan
                                </p>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleSignOut}
                            className="text-destructive focus:text-destructive gap-2"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}
