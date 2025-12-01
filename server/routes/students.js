// Student routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('./auth').authMiddleware;

// Get student profile
router.get('/:id', authMiddleware, studentController.getProfile);
// Update student profile
router.put('/:id', authMiddleware, studentController.updateProfile);
// Get course progress
router.get('/:id/progress', authMiddleware, studentController.getProgress);
// Get quiz/exam scores
router.get('/:id/scores', authMiddleware, studentController.getScores);

module.exports = router;
