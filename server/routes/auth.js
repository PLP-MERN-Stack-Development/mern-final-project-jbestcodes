// Authentication routes for Bright Academy LMS

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
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

// Register
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);
// Profile (protected)
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;
module.exports.authMiddleware = authMiddleware;
