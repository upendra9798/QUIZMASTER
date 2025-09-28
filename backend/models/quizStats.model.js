import mongoose from "mongoose";

const quizStatsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    testsCompleted: {
        type: Number,
        default: 0
    },
    totalQuizzes: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    bestScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    totalTimeSpent: {
        type: Number,
        default: 0 // in seconds
    },
    uploadedFiles: {
        type: Number,
        default: 0
    },
    studyStreak: {
        type: Number,
        default: 0
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    subjectStats: [{
        subject: String,
        testsCompleted: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 }
    }],
    difficultyStats: {
        easy: {
            completed: { type: Number, default: 0 },
            averageScore: { type: Number, default: 0 }
        },
        medium: {
            completed: { type: Number, default: 0 },
            averageScore: { type: Number, default: 0 }
        },
        hard: {
            completed: { type: Number, default: 0 },
            averageScore: { type: Number, default: 0 }
        }
    }
}, {
    timestamps: true
});

const QuizStats = mongoose.model("QuizStats", quizStatsSchema);

export default QuizStats;
