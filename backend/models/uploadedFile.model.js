import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    cloudinaryUrl: {
        type: String
    },
    cloudinaryPublicId: {
        type: String
    },
    extractedText: {
        type: String
    },
    processingStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    generatedQuizzes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    }],
    isProcessed: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String
    }
}, {
    timestamps: true
});

// Index for better query performance
uploadedFileSchema.index({ userId: 1, createdAt: -1 });
uploadedFileSchema.index({ processingStatus: 1 });

const UploadedFile = mongoose.model("UploadedFile", uploadedFileSchema);

export default UploadedFile;
