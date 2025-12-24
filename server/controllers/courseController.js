// Course controller for Bright Academy LMS
// Handles course CRUD and enrollment

const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');

// List all courses
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'fullName');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new course (instructor only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, lessons } = req.body;
    const instructorId = req.user.id;
    const course = new Course({ title, description, lessons, instructor: instructorId });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a course (instructor only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.instructor.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    const updates = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a course (instructor only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    if (course.instructor.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course details
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'fullName');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List instructor's courses
exports.listMyCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const courses = await Course.find({ instructor: instructorId }).populate('instructor', 'fullName');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List student's enrolled courses
exports.listEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    const enrollments = await Enrollment.find({ student: studentId }).populate('course');
    const courses = enrollments.map(e => e.course);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;
    const student = await Student.findById(studentId);
    if (!student || !student.active) return res.status(403).json({ error: 'Student not active' });
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) return res.status(400).json({ error: 'Already enrolled' });
    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
