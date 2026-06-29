import mongoose from "mongoose";
import type { IUser } from "./auth.types.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: [true, "FullName is required"],
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        maxlength: 322,
        // match
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: 45,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password!, 12);
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string,
) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
