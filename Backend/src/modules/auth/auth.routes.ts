import express from "express";
import { createUser, loginUser } from "./auth.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile");
// router.put("/:id");
// router.delete("/:id");

export default router;
