// Quiz/Exam model for Bright Academy LMS

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
  score: { type: Number, default: 0 }
});

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  submissions: [submissionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
