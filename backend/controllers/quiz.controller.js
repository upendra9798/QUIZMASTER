import Quiz from "../models/quiz.model.js";
import UploadedFile from "../models/uploadedFile.model.js";
import QuizStats from "../models/quizStats.model.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPG, PNG files are allowed.'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Upload file and extract text
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { originalname, filename, path: filePath, mimetype, size } = req.file;

        // Save file info to database
        const uploadedFile = new UploadedFile({
            userId: req.user._id,
            originalName: originalname,
            fileName: filename,
            filePath: filePath,
            fileType: path.extname(originalname),
            fileSize: size,
            mimeType: mimetype,
            processingStatus: 'processing'
        });

        await uploadedFile.save();

        // Extract text based on file type
        let extractedText = '';
        
        if (mimetype === 'application/pdf') {
            try {
                // PDF parsing will be implemented later with a more stable solution
                extractedText = "PDF text extraction will be implemented with AI service integration";
            } catch (error) {
                console.error('PDF parsing error:', error);
                extractedText = "Error extracting text from PDF";
            }
        } else if (mimetype.startsWith('image/')) {
            // OCR will be implemented later
            extractedText = "Image text extraction will be implemented with OCR service";
        }

        // Update file with extracted text
        uploadedFile.extractedText = extractedText;
        uploadedFile.processingStatus = 'completed';
        uploadedFile.isProcessed = true;
        await uploadedFile.save();

        // Update user stats
        await QuizStats.findOneAndUpdate(
            { user: req.user._id },
            { 
                $inc: { uploadedFiles: 1 },
                $set: { lastActivity: new Date() }
            },
            { upsert: true }
        );

        res.status(200).json({
            message: "File uploaded successfully",
            file: {
                id: uploadedFile._id,
                name: originalname,
                size: size,
                type: mimetype,
                extractedText: extractedText.substring(0, 500) // Return first 500 chars
            }
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};

// Generate questions from uploaded file (AI placeholder)
export const generateQuestions = async (req, res) => {
    try {
        const { fileId, questionType, questionCount, difficulty } = req.body;

        const file = await UploadedFile.findById(fileId);
        if (!file || file.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "File not found" });
        }

        // AI Integration placeholder - Replace with actual AI service
        const sampleQuestions = generateSampleQuestions(questionType, questionCount, difficulty);

        // Create a quiz
        const quiz = new Quiz({
            title: `Quiz from ${file.originalName}`,
            description: `Auto-generated quiz from uploaded file`,
            createdBy: req.user._id,
            questions: sampleQuestions,
            difficulty: difficulty,
            generatedFrom: {
                fileName: file.originalName,
                fileType: file.fileType,
                uploadDate: file.createdAt
            }
        });

        await quiz.save();

        // Link quiz to file
        file.generatedQuizzes.push(quiz._id);
        await file.save();

        res.status(200).json({
            message: "Questions generated successfully",
            quiz: quiz,
            questions: sampleQuestions
        });

    } catch (error) {
        console.error('Question generation error:', error);
        res.status(500).json({ message: "Question generation failed", error: error.message });
    }
};

// Get user's quizzes
export const getUserQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })
            .select('-questions.correctAnswer'); // Don't send correct answers

        res.status(200).json({ quizzes });
    } catch (error) {
        console.error('Get quizzes error:', error);
        res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
    }
};

// Get quiz by ID (for taking test)
export const getQuizById = async (req, res) => {
    try {
        const { quizId } = req.params;
        
        const quiz = await Quiz.findById(quizId)
            .select('-questions.correctAnswer -questions.explanation'); // Don't send answers during test

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Check if user has permission to access this quiz
        if (quiz.createdBy.toString() !== req.user._id.toString() && !quiz.isPublic) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json({ quiz });
    } catch (error) {
        console.error('Get quiz error:', error);
        res.status(500).json({ message: "Failed to fetch quiz", error: error.message });
    }
};

// Submit quiz answers
export const submitQuizAnswers = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers, timeSpent } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Calculate score
        let correctAnswers = 0;
        const detailedAnswers = [];

        quiz.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = question.correctAnswer === userAnswer;
            
            if (isCorrect) correctAnswers++;

            detailedAnswers.push({
                questionIndex: index,
                userAnswer: userAnswer,
                isCorrect: isCorrect
            });
        });

        const score = Math.round((correctAnswers / quiz.questions.length) * 100);

        // Update quiz attempts
        quiz.attempts += 1;
        quiz.averageScore = ((quiz.averageScore * (quiz.attempts - 1)) + score) / quiz.attempts;
        await quiz.save();

        res.status(200).json({
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: quiz.questions.length,
            timeSpent: timeSpent,
            answers: detailedAnswers
        });

    } catch (error) {
        console.error('Submit quiz error:', error);
        res.status(500).json({ message: "Failed to submit quiz", error: error.message });
    }
};

// Sample question generator (replace with AI integration)
function generateSampleQuestions(questionType, questionCount, difficulty) {
    const questions = [];
    
    for (let i = 0; i < questionCount; i++) {
        if (questionType === 'mcq' || questionType === 'mixed') {
            questions.push({
                question: `Sample MCQ question ${i + 1} - ${difficulty} level`,
                type: 'mcq',
                options: [
                    "Option A",
                    "Option B", 
                    "Option C",
                    "Option D"
                ],
                correctAnswer: Math.floor(Math.random() * 4),
                explanation: "This is a sample explanation",
                points: 1
            });
        } else if (questionType === 'true_false') {
            questions.push({
                question: `Sample True/False question ${i + 1} - ${difficulty} level`,
                type: 'true_false',
                options: ["True", "False"],
                correctAnswer: Math.floor(Math.random() * 2),
                explanation: "This is a sample explanation",
                points: 1
            });
        } else if (questionType === 'short_answer') {
            questions.push({
                question: `Sample short answer question ${i + 1} - ${difficulty} level`,
                type: 'short_answer',
                options: [],
                correctAnswer: "Sample answer",
                explanation: "This is a sample explanation",
                points: 1
            });
        }
    }
    
    return questions;
}
