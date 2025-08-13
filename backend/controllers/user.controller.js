import QuizHistory from "../models/quizHistory.model.js"; // Example model
import QuizStats from "../models/quizStats.model.js";     // Example model

// GET /api/user/history
export const getUserHistory = async (req, res) => {
  try {
    const history = await QuizHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/user/history
export const saveQuizResult = async (req, res) => {
  try {
    const { quizTitle, score } = req.body;

    if (!quizTitle || score == null) {
      return res.status(400).json({ message: "quizTitle and score are required" });
    }

    // 1. Save to history
    const historyEntry = await QuizHistory.create({
      user: req.user._id,
      quizTitle,
      score
    });

    // 2. Update stats
    let stats = await QuizStats.findOne({ user: req.user._id });

    if (!stats) {
      stats = await QuizStats.create({
        user: req.user._id,
        totalQuizzes: 1,
        averageScore: score
      });
    } else {
      const totalScore = stats.averageScore * stats.totalQuizzes + score;
      stats.totalQuizzes += 1;
      stats.averageScore = totalScore / stats.totalQuizzes;
      await stats.save();
    }

    res.status(201).json({ message: "Quiz result saved", historyEntry, stats });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// GET /api/user/stats
export const getUserStats = async (req, res) => {
  try {
    const stats = await QuizStats.findOne({ user: req.user._id });
    res.json({ stats: stats || {} });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
