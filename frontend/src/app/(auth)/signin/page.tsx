"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Link2, Loader2, Share2, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen">
            {/* left hero panel */}
            <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-muted/40 border-r p-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-semibold">Brainly</span>
                </div>
                <p className="text-muted-foreground text-center max-w-xs mb-10 leading-relaxed">
                    Your second brain — save links from anywhere and revisit
                    them whenever you need.
                </p>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    {[
                        { icon: Link2, text: "Save tweets, videos, and docs" },
                        { icon: Tag, text: "Organise with tags by topic" },
                        { icon: Share2, text: "Share your brain publicly" },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* right form panel */}
            <div className="flex flex-col justify-center w-full lg:max-w-md px-8 py-12">
                <div className="lg:hidden flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Brain className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">Brainly</span>
                </div>

                <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Sign in to your second brain
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-1"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Sign in
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-6">
                    No account?{" "}
                    <Link
                        href="/signup"
                        className="text-primary font-medium hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
