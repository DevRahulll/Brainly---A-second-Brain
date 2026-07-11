"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Filter, Icon, Loader2, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !fullName.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirm.trim()
        ) {
            toast.error("All fields are required");
        }
        if (password !== confirm) {
            toast.error("Password don't match");
        }
        if (password.length < 8) {
            toast.error("Password must be atleast 8 characters");
        }

        setLoading(false);
        try {
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen">
            {/* left panel */}
            <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-muted/40 border-r p-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-semibold">Brainly</span>
                </div>
                <p className="text-muted-foreground text-center max-2-xs mb-10 leading-relaxed">
                    Join knowledge builders who never lose an important link
                    again.
                </p>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    {[
                        { icon: Zap, text: "Save any link in seconds" },
                        {
                            icon: Filter,
                            text: "Filter any content type or tag",
                        },
                        {
                            icon: Users,
                            text: "Share your whole brain with anyone",
                        },
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

            {/* right panel form */}
            <div className="flex flex-col justify-center w-full lg:max-w-md px-8 py-12">
                <div className="lg:hidden flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Brain className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">Brainly</span>
                </div>

                <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Start building your second brain
                </p>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                >
                    <div className="space-y-1.5">
                        <Label htmlFor="fullName">FullName</Label>
                        <Input
                            id="fullName"
                            placeholder="Enter your full-name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input
                            id="confirm"
                            type="password"
                            placeholder="******"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={"w-full mt-1"}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}{" "}
                        Create account
                    </Button>
                </form>

                <p className="text-sm text-center text-muted-foreground mt-6">
                    Already have one?{" "}
                    <Link
                        href="/signin"
                        className="text-primary font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
