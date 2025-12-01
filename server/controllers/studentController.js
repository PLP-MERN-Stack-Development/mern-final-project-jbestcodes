// Student controller for Bright Academy LMS
// Handles student profile, progress, and scores

const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course progress for student
exports.getProgress = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.id }).populate('course');
    const progress = enrollments.map(enrollment => ({
      course: enrollment.course.title,
      percentComplete: enrollment.progress
    }));
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quiz/exam scores for student
exports.getScores = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.id }).populate('course');
    const scores = enrollments.map(enrollment => ({
      course: enrollment.course.title,
      scores: enrollment.scores
    }));
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
