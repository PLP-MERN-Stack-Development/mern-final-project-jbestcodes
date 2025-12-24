// Course routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// List all courses
router.get('/', courseController.listCourses);
// List instructor's courses
router.get('/my', authMiddleware, courseController.listMyCourses);
// List student's enrolled courses
router.get('/enrolled', authMiddleware, courseController.listEnrolledCourses);
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
