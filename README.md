# Bright Academy Learner Management System (LMS)

## Overview
This is a comprehensive MERN stack application for a Learning Management System (LMS) called Bright Academy. It allows students to enroll in courses, take quizzes, and track progress, while instructors can create and manage courses and quizzes.

## Features
- Student management: learner sign up (full name, email, username)
- Learner dashboard: view courses, track progress, view exam scores
- Instructor dashboard: add/delete courses, track learner progress, add quizzes/exams
- Instructor access: view all students and their progress
- Student access: view only their own progress
- Leaderboard: display top performing students (quizzes and course progress)

## Tech Stack
- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Inline CSS (can be upgraded to CSS modules or styled-components)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mern-final-project-jbestcodes
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the `server` directory with:
     ```
     MONGO_URI=mongodb://localhost:27017/BrightAcademyLMS
     PORT=5000
     JWT_SECRET=your_jwt_secret_key
     ```

5. **Start MongoDB** (if using local):
   - Ensure MongoDB is running on your system.

6. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```

7. **Start the frontend**:
   Open a new terminal:
   ```bash
   cd client
   npm start
   ```

8. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Students
- Register/Login as a student
- Browse available courses
- Enroll in courses
- View course details and lessons
- Take quizzes and view scores
- Check leaderboard and profile

### For Instructors
- Register/Login as an instructor
- Create and edit courses with lessons
- Create and edit quizzes
- View enrolled students
- Deactivate students if needed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/my` - List instructor's courses (auth required)
- `GET /api/courses/enrolled` - List student's enrolled courses (auth required)
- `POST /api/courses` - Create a new course (instructor only)
- `PUT /api/courses/:id` - Update a course (instructor only)
- `DELETE /api/courses/:id` - Delete a course (instructor only)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in a course (student only)

### Quizzes
- `GET /api/quizzes` - List all quizzes (instructor only)
- `POST /api/quizzes` - Create a new quiz (instructor only)
- `PUT /api/quizzes/:id` - Update a quiz (instructor only)
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/submit` - Submit quiz answers (student only)
- `GET /api/courses/:courseId/quizzes` - List quizzes for a course

### Students
- `GET /api/students/my` - Get current student's profile (auth required)
- `PUT /api/students/:id/deactivate` - Deactivate a student (instructor only)

### Leaderboard
- `GET /api/leaderboard` - Global top quiz performers

## Database Schema

### Models
- **Student**: fullName, email, username, password, active
- **Instructor**: fullName, email, username, password
- **Course**: title, description, instructor, lessons
- **Quiz**: title, questions, course, createdBy
- **Enrollment**: student, course, progress, scores

## Project Structure
```
mern-final-project-jbestcodes/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Screenshots
(Add screenshots here once deployed)

## Demo Video
(Add video link here once recorded) 