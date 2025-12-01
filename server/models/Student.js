// Student (Learner) model for Bright Academy LMS

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  percentComplete: { type: Number, default: 0 }
});

const examScoreSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: { type: Number, default: 0 }
});

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  examScores: [examScoreSchema],
  progress: [progressSchema]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
