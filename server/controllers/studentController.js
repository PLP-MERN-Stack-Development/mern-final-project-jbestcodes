// Student controller for Bright Academy LMS
// Handles student profile, progress, and scores

const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// List instructor's students
exports.listMyStudents = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId }).select('_id');
    const courseIds = courses.map(c => c._id);
    const enrollments = await Enrollment.find({ course: { $in: courseIds } }).populate('student', 'name email').populate('course', 'title');
    const students = enrollments.map(e => ({
      _id: e.student._id,
      name: e.student.name,
      email: e.student.email,
      enrolledCourses: [e.course.title] // Simplify, or aggregate
    }));
    // Remove duplicates
    const uniqueStudents = students.filter((s, index, self) => self.findIndex(t => t._id === s._id) === index);
    res.json(uniqueStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deactivate student
exports.deactivateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    // Remove from all enrollments
    await Enrollment.deleteMany({ student: studentId });
    // Update courses to remove student
    await Course.updateMany({}, { $pull: { enrolledStudents: studentId } });
    // Optionally, mark student as inactive
    await Student.findByIdAndUpdate(studentId, { active: false });
    res.json({ message: 'Student deactivated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
