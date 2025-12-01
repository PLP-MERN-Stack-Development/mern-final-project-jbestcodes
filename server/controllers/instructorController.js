// Instructor controller for Bright Academy LMS
// Handles instructor profile and managed courses

const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

// Get instructor profile
exports.getProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).select('-password');
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update instructor profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List managed courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all students and their progress in managed courses
exports.getStudents = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id }).populate('enrolledStudents');
    const students = courses.flatMap(course => course.enrolledStudents.map(student => ({
      course: course.title,
      student: student.fullName,
      studentId: student._id
    })));
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
