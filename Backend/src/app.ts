import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./modules/auth/auth.routes.js";
import contentRouter from "./modules/content/content.routes.js";
import ApiError from "./common/utils/api-error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.send("<h2>All Good</h2>");
});

// auth
app.use("/api/v1/users", userRouter);

//content
app.use("/api/v1/content", contentRouter);

//catch-all for undefined routes
// app.all("{*path}", (req, res) => {
//     throw ApiError.notFound(`Route ${req.originalUrl} not found`);
// });

export default app;
