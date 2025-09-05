import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup and Login routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected Routes (Requires JWT Authentication)
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
