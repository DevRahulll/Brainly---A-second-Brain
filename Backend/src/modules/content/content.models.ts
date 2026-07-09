import mongoose, { Schema, Types } from "mongoose";

const contentSchema = new Schema(
    {
        link: {
            type: String,
            required: [true, "Link is required"],
        },
        title: {
            type: String,
            required: [true, "Content Title is required"],
        },
        contentType: {
            type: String,
            enum: ["tweet", "youtube", "article", "document", "link"],
            required: [true, "Content Type is required"],
        },
        tag: {
            type: String,
            required: [true, "content tag is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is required"],
        },
    },
    { timestamps: true },
);

export default mongoose.model("content", contentSchema);
