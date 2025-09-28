import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
    uploadFile, 
    generateQuestions, 
    getUserQuizzes, 
    getQuizById, 
    submitQuizAnswers,
    upload 
} from "../controllers/quiz.controller.js";

const router = express.Router();

// File upload route
router.post("/upload", protectRoute, upload.single('file'), uploadFile);

// Generate questions from uploaded file
router.post("/generate", protectRoute, generateQuestions);

// Get user's quizzes
router.get("/", protectRoute, getUserQuizzes);

// Get specific quiz for taking test
router.get("/:quizId", protectRoute, getQuizById);

// Submit quiz answers
router.post("/:quizId/submit", protectRoute, submitQuizAnswers);

export default router;
