import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserHistory, getUserStats, saveQuizResult } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/history", protectRoute, getUserHistory);
router.post("/history", protectRoute, saveQuizResult); // new route for saving results
router.get("/stats", protectRoute, getUserStats);

export default router;
