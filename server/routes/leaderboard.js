// Leaderboard routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Global top quiz performers
router.get('/', leaderboardController.globalTopQuizPerformers);
// Top quiz performers
router.get('/courses/:courseId/leaderboard/quiz', leaderboardController.topQuizPerformers);
// Top progress performers
router.get('/courses/:courseId/leaderboard/progress', leaderboardController.topProgressPerformers);

module.exports = router;
