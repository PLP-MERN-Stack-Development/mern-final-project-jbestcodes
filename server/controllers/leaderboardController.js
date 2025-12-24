// Leaderboard controller for Bright Academy LMS
// Handles leaderboard endpoints

const { getTopQuizPerformers, getTopProgressPerformers, getGlobalTopQuizPerformers } = require('../models/Leaderboard');

// Top quiz performers for a course
exports.topQuizPerformers = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const top = await getTopQuizPerformers(courseId);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Top progress performers for a course
exports.topProgressPerformers = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const top = await getTopProgressPerformers(courseId);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Global top quiz performers
exports.globalTopQuizPerformers = async (req, res) => {
  try {
    const top = await getGlobalTopQuizPerformers();
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
