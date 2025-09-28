import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['mcq', 'true_false', 'short_answer'],
        required: true
    },
    options: [{
        type: String
    }],
    correctAnswer: {
        type: mongoose.Schema.Types.Mixed, // Can be number (index) or string
        required: true
    },
    explanation: {
        type: String
    },
    points: {
        type: Number,
        default: 1
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [questionSchema],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard', 'mixed'],
        default: 'medium'
    },
    timeLimit: {
        type: Number, // in minutes
        default: 20
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    tags: [String],
    subject: {
        type: String
    },
    generatedFrom: {
        fileName: String,
        fileType: String,
        uploadDate: Date
    },
    attempts: {
        type: Number,
        default: 0
    },
    averageScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for better search performance
quizSchema.index({ createdBy: 1, createdAt: -1 });
quizSchema.index({ isPublic: 1, subject: 1 });

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
