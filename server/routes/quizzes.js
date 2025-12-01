// Quiz/Exam routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { authMiddleware } = require('./auth');

// List quizzes for course
router.get('/courses/:courseId/quizzes', quizController.listQuizzes);
// Add quiz (instructor only)
router.post('/courses/:courseId/quizzes', authMiddleware, quizController.addQuiz);
// Get quiz details
router.get('/quizzes/:id', quizController.getQuiz);
// Student submits answers
router.post('/quizzes/:id/submit', authMiddleware, quizController.submitQuiz);

module.exports = router;
