import express from "express";

import userRouter from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.send("<h2>All Good</h2>");
});

//catch-all for undefined routes
app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

// auth
app.use("/api/v1/users", userRouter);

export default app;
