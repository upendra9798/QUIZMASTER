import mongoose from "mongoose";

const quizHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizTitle: String,
  score: Number
}, { timestamps: true });

export default mongoose.model("QuizHistory", quizHistorySchema);
