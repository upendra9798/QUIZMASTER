import mongoose from "mongoose";

const quizHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quizTitle: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'mixed'],
        default: 'medium'
    },
    questionType: {
        type: String,
        enum: ['mcq', 'true_false', 'short_answer', 'mixed'],
        default: 'mcq'
    },
    answers: [{
        questionIndex: Number,
        userAnswer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean
    }],
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
quizHistorySchema.index({ user: 1, createdAt: -1 });

const QuizHistory = mongoose.model("QuizHistory", quizHistorySchema);

export default QuizHistory;
