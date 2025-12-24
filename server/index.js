// Entry point for Bright Academy LMS backend

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Student routes
const studentRoutes = require('./routes/students');
app.use('/api/students', studentRoutes);

// Instructor routes
const instructorRoutes = require('./routes/instructors');
app.use('/api/instructors', instructorRoutes);

// Course routes
const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

// Quiz/Exam routes
const quizRoutes = require('./routes/quizzes');
app.use('/api', quizRoutes);

// Leaderboard routes
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api', leaderboardRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Bright Academy LMS Backend is running');
});

// TODO: Add routes for auth, students, instructors, courses, quizzes, leaderboard

const PORT = process.env.PORT || 5000;

module.exports = app;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
