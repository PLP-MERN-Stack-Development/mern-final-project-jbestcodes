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
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a course (instructor only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
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

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const courseId = req.params.id;
    // Check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return res.status(400).json({ error: 'Already enrolled' });
    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();
    // Add student to course's enrolledStudents
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: studentId } });
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
