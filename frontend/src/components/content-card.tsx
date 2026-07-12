"use client";

import { useState } from "react";
import { ExternalLink, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CONTENT_TYPE_META } from "@/lib/utils";
import { api } from "@/lib/api";
import type { Content } from "@/types";

interface ContentCardProps {
    content: Content;
    readonly?: boolean;
    onDeleted?: (id: string) => void;
}

export function ContentCard({
    content,
    readonly = false,
    onDeleted,
}: ContentCardProps) {
    const [deleting, setDeleting] = useState(false);
    const meta = CONTENT_TYPE_META[content.type];

    const handleDelete = async () => {
        setDeleting(true);
        try {
            // await api.deleteContent(content._id);
            // toast.success("Content deleted");
            // onDeleted?.(content._id);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <article className="flex flex-col rounded-xl border bg-card overflow-hidden hover:border-border/80 transition-colors group">
            {/* thumbnail */}
            <div
                className={cn(
                    "relative h-24 flex items-center justify-center text-4xl",
                    meta.color,
                )}
            >
                <span role="img" aria-label={meta.label}>
                    {meta.emoji}
                </span>
                <span
                    className={cn(
                        "absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full border",
                        meta.badge,
                    )}
                >
                    {meta.label}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-3 gap-1.5">
                <h3 className="text-sm font-medium leading-snug line-clamp-2">
                    {content.title}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                    {content.link}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-2 border-t gap-2">
                {/* Tags */}
                <div className="flex gap-1 flex-wrap">
                    {content.tags.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag._id}
                            variant="secondary"
                            className="text-[10px] h-4 px-1.5 font-normal"
                        >
                            {tag.title}
                        </Badge>
                    ))}
                    {content.tags.length > 2 && (
                        <Badge
                            variant="secondary"
                            className="text-[10px] h-4 px-1.5 font-normal"
                        >
                            +{content.tags.length - 2}
                        </Badge>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        asChild
                    >
                        <a
                            href={content.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="sr-only">Open link</span>
                        </a>
                    </Button>

                    {!readonly && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                    disabled={deleting}
                                >
                                    {deleting ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-3.5 w-3.5" />
                                    )}
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete this item?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        "{content.title}" will be permanently
                                        removed from your brain.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </div>
        </article>
    );
}
