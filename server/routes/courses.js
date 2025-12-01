// Course routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authMiddleware } = require('./auth');

// List all courses
router.get('/', courseController.listCourses);
// Create course (instructor only)
router.post('/', authMiddleware, courseController.createCourse);
// Update course (instructor only)
router.put('/:id', authMiddleware, courseController.updateCourse);
// Delete course (instructor only)
router.delete('/:id', authMiddleware, courseController.deleteCourse);
// Get course details
router.get('/:id', courseController.getCourse);
// Enroll student in course
router.post('/:id/enroll', authMiddleware, courseController.enrollStudent);

module.exports = router;
