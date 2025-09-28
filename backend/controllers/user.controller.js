import QuizHistory from "../models/quizHistory.model.js";
import QuizStats from "../models/quizStats.model.js";

// GET /api/user/history
export const getUserHistory = async (req, res) => {
  try {
    const history = await QuizHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/user/history
export const saveQuizResult = async (req, res) => {
  try {
    const { 
      quizTitle, 
      score, 
      totalQuestions = 0, 
      correctAnswers = 0, 
      timeSpent = 0, 
      difficulty = 'medium', 
      questionType = 'mcq',
      answers = [] 
    } = req.body;

    if (!quizTitle || score == null) {
      return res.status(400).json({ message: "quizTitle and score are required" });
    }

    // 1. Save to history
    const historyEntry = await QuizHistory.create({
      user: req.user._id,
      quizTitle,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      difficulty,
      questionType,
      answers
    });

    // 2. Update stats
    let stats = await QuizStats.findOne({ user: req.user._id });

    if (!stats) {
      stats = await QuizStats.create({
        user: req.user._id,
        testsCompleted: 1,
        totalQuizzes: 1,
        averageScore: score,
        bestScore: score,
        totalTimeSpent: timeSpent,
        lastActivity: new Date()
      });
    } else {
      const totalScore = stats.averageScore * stats.totalQuizzes + score;
      stats.testsCompleted += 1;
      stats.totalQuizzes += 1;
      stats.averageScore = totalScore / stats.totalQuizzes;
      stats.bestScore = Math.max(stats.bestScore, score);
      stats.totalTimeSpent += timeSpent;
      stats.lastActivity = new Date();

      // Update difficulty stats
      if (stats.difficultyStats[difficulty]) {
        const diffStat = stats.difficultyStats[difficulty];
        const diffTotalScore = diffStat.averageScore * diffStat.completed + score;
        diffStat.completed += 1;
        diffStat.averageScore = diffTotalScore / diffStat.completed;
      }

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
