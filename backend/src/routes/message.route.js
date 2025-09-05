import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

// Sidebar users
router.get("/users", protectRoute, getUsersForSidebar);

// Messages with a specific user
router.get("/:id", protectRoute, getMessages);

// Send a message to a specific user
router.post("/send/:id", protectRoute, sendMessages);

export default router;
