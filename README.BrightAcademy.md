# Bright Academy Learner Management System (LMS)

## Features
- Student management: learner sign up (full name, email, username)
- Learner dashboard: view courses, track progress, view exam scores
- Instructor dashboard: add/delete courses, track learner progress, add quizzes/exams
- Instructor access: view all students and their progress
- Student access: view only their own progress
- Leaderboard: display top performing students (quizzes and course progress)
- More features to be added as needed

## Wireframes/Mockups (Descriptions)
- Learner Sign Up/Login: Form for full name, email, username, password
- Learner Dashboard: List of enrolled courses, progress bars, exam scores, leaderboard snippet
- Course Details: Course info, lessons/modules, progress tracker, exam section
- Instructor Dashboard: Add/delete courses, add quizzes/exams, view all learners, track progress, leaderboard, manage exams
- Leaderboard: Table of top students by score/progress

## Database Schema (Plain Text)
**Student (Learner)**
- fullName: String
- email: String (unique)
- username: String (unique)
- password: String (hashed)
- enrolledCourses: [Course references]
- examScores: [{ quizId, score }]
- progress: [{ courseId, percentComplete }]

**Instructor**
- fullName: String
- email: String (unique)
- username: String (unique)
- password: String (hashed)
- managedCourses: [Course references]

**Course**
- title: String
- description: String
- instructor: Instructor reference
- lessons: [{ title, content }]
- enrolledStudents: [Student references]
- quizzes: [Quiz references]

**Enrollment**
- student: Student reference
- course: Course reference
- enrollmentDate: Date
- progress: Number (percent)
- scores: [{ quizId, score }]

**Quiz/Exam**
- course: Course reference
- title: String
- questions: [{ questionText, options, correctAnswer }]
- createdBy: Instructor reference
- submissions: [{ studentId, answers, score }]

**Leaderboard**
- course: Course reference
- topQuizPerformers: [{ studentId, totalQuizScore }]
- topProgressPerformers: [{ studentId, percentComplete }]

## API Endpoints (Plain Text)
**Authentication**
- POST /api/auth/register (student/instructor sign up)
- POST /api/auth/login
- GET /api/auth/profile

**Students**
- GET /api/students/:id (get student profile)
- PUT /api/students/:id (update student profile)
- GET /api/students/:id/progress (get course progress)
- GET /api/students/:id/scores (get quiz/exam scores)

**Instructors**
- GET /api/instructors/:id (get instructor profile)
- PUT /api/instructors/:id (update instructor profile)
- GET /api/instructors/:id/courses (list managed courses)
- GET /api/instructors/:id/students (view all students and progress)

**Courses**
- GET /api/courses (list all courses)
- POST /api/courses (create course, instructor only)
- PUT /api/courses/:id (update course, instructor only)
- DELETE /api/courses/:id (delete course, instructor only)
- GET /api/courses/:id (get course details)
- POST /api/courses/:id/enroll (enroll student)

**Quizzes/Exams**
- GET /api/courses/:courseId/quizzes (list quizzes for course)
- POST /api/courses/:courseId/quizzes (add quiz, instructor only)
- GET /api/quizzes/:id (get quiz details)
- POST /api/quizzes/:id/submit (student submits answers)

**Leaderboard**
- GET /api/courses/:courseId/leaderboard/quiz (top quiz performers)
- GET /api/courses/:courseId/leaderboard/progress (top progress performers)

## Technical Architecture Overview
- MERN stack: MongoDB, Express.js, React, Node.js
- RESTful API for backend communication
- JWT authentication for secure access
- Role-based access control (student/instructor)
- Real-time updates with Socket.io (for progress, leaderboard)
- Modular backend structure (models, controllers, routes)
- Frontend: React with React Router, reusable components, state management (Context API or Redux)
- Deployment: Backend on Render, frontend on Vercel/Netlify
- CI/CD pipeline for automated testing and deployment
- Monitoring and error tracking (e.g., Sentry)
- Documentation: README, API docs, user guide, architecture overview
