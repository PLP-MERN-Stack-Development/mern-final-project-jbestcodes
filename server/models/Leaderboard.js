// Leaderboard logic for Bright Academy LMS
// This is a utility module, not a Mongoose model

const Enrollment = require('./Enrollment');
const Student = require('./Student');

/**
 * Get top students by quiz scores for a course
 * @param {String} courseId
 * @param {Number} limit
 * @returns {Promise<Array>} Array of { studentId, totalQuizScore }
 */
async function getTopQuizPerformers(courseId, limit = 10) {
  // Aggregate scores from enrollments for the course
  const enrollments = await Enrollment.find({ course: courseId });
  const scores = enrollments.map(enrollment => {
    const totalQuizScore = enrollment.scores.reduce((sum, s) => sum + (s.score || 0), 0);
    return { studentId: enrollment.student, totalQuizScore };
  });
  // Sort and return top performers
  return scores.sort((a, b) => b.totalQuizScore - a.totalQuizScore).slice(0, limit);
}

/**
 * Get top students by course progress
 * @param {String} courseId
 * @param {Number} limit
 * @returns {Promise<Array>} Array of { studentId, percentComplete }
 */
async function getTopProgressPerformers(courseId, limit = 10) {
  const enrollments = await Enrollment.find({ course: courseId });
  const progressList = enrollments.map(enrollment => ({
    studentId: enrollment.student,
    percentComplete: enrollment.progress || 0
  }));
  return progressList.sort((a, b) => b.percentComplete - a.percentComplete).slice(0, limit);
}

/**
 * Get top students by quiz scores globally
 * @param {Number} limit
 * @returns {Promise<Array>} Array of { studentId, totalQuizScore }
 */
async function getGlobalTopQuizPerformers(limit = 10) {
  // Aggregate all enrollments
  const enrollments = await Enrollment.find({}).populate('student', 'fullName');
  const studentScores = {};
  enrollments.forEach(enrollment => {
    const studentId = enrollment.student._id.toString();
    const studentName = enrollment.student.fullName;
    const totalQuizScore = enrollment.scores.reduce((sum, s) => sum + (s.score || 0), 0);
    if (studentScores[studentId]) {
      studentScores[studentId].totalQuizScore += totalQuizScore;
    } else {
      studentScores[studentId] = { totalQuizScore, studentName };
    }
  });
  const scores = Object.values(studentScores);
  return scores.sort((a, b) => b.totalQuizScore - a.totalQuizScore).slice(0, limit);
}

module.exports = {
  getTopQuizPerformers,
  getTopProgressPerformers,
  getGlobalTopQuizPerformers
};
