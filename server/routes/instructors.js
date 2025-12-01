// Instructor routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const { authMiddleware } = require('./auth');

// Get instructor profile
router.get('/:id', authMiddleware, instructorController.getProfile);
// Update instructor profile
router.put('/:id', authMiddleware, instructorController.updateProfile);
// List managed courses
router.get('/:id/courses', authMiddleware, instructorController.getCourses);
// View all students and their progress
router.get('/:id/students', authMiddleware, instructorController.getStudents);

module.exports = router;
