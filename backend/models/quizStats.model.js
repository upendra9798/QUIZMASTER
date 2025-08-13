import mongoose from "mongoose";

const quizStatsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalQuizzes: Number,
  averageScore: Number
});

export default mongoose.model("QuizStats", quizStatsSchema);
