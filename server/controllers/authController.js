// Authentication controller for Bright Academy LMS
// Handles registration and login for students and instructors

const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Register a new user (student or instructor)
exports.register = async (req, res) => {
  try {
    const { role, fullName, email, username, password } = req.body;
    if (!role || !['student', 'instructor'].includes(role)) {
      return res.status(400).json({ error: 'Role must be student or instructor' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    if (role === 'student') {
      user = new Student({ fullName, email, username, password: hashedPassword });
    } else {
      user = new Instructor({ fullName, email, username, password: hashedPassword });
    }
    await user.save();
    res.status(201).json({ message: 'Registration successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login for student or instructor
exports.login = async (req, res) => {
  try {
    const { role, username, password } = req.body;
    if (!role || !['student', 'instructor'].includes(role)) {
      return res.status(400).json({ error: 'Role must be student or instructor' });
    }
    const Model = role === 'student' ? Student : Instructor;
    const user = await Model.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, userId: user._id, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get profile (protected route)
exports.profile = async (req, res) => {
  try {
    const { id, role } = req.user;
    const Model = role === 'student' ? Student : Instructor;
    const user = await Model.findById(id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
