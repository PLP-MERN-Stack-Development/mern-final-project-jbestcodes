// Quiz/Exam controller for Bright Academy LMS
// Handles quiz CRUD and submissions

const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');

// List quizzes for a course
exports.listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add quiz (instructor only)
exports.addQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const courseId = req.params.courseId;
    const instructorId = req.user.id;
    const quiz = new Quiz({ course: courseId, title, questions, createdBy: instructorId });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quiz details
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student submits answers
exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const studentId = req.user.id;
    const { answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] && answers[idx] === q.correctAnswer) score++;
    });
    quiz.submissions.push({ studentId, answers, score });
    await quiz.save();
    // Update enrollment scores
    await Enrollment.updateOne(
      { student: studentId, course: quiz.course },
      { $push: { scores: { quizId, score } } }
    );
    res.json({ message: 'Quiz submitted', score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
