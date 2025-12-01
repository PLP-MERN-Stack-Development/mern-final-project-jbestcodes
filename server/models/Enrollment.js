// Enrollment model for Bright Academy LMS

const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: { type: Number, default: 0 }
});

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  progress: { type: Number, default: 0 },
  scores: [scoreSchema]
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
