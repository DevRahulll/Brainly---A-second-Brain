import express from "express";
import {
    createUser,
    getUser,
    loginUser,
    logoutUser,
} from "./auth.controller.js";
import { authUser } from "./auth.middleware.js";

const router = express.Router();

router.get("/me", (req, res) => {
    res.send("all good");
});
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUser);
router.post("/logout", authUser, logoutUser);
// router.put("/:id");
// router.delete("/:id");

export default router;
