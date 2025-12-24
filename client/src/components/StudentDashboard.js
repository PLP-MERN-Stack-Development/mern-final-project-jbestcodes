import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch enrolled courses only
    axios.get('http://localhost:5000/api/courses/enrolled', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch available quizzes (assuming all, or enrolled courses' quizzes)
    axios.get('http://localhost:5000/api/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
      <h1>Student Dashboard</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>My Courses</h2>
        {courses.length > 0 ? (
          <ul>
            {courses.map(course => (
              <li key={course._id}>{course.title} - {course.description}</li>
            ))}
          </ul>
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Available Quizzes</h2>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map(quiz => (
              <li key={quiz._id}>{quiz.title} - <button onClick={() => handleTakeQuiz(quiz._id)}>Take Quiz</button></li>
            ))}
          </ul>
        ) : (
          <p>No quizzes available.</p>
        )}
      </section>

      <section>
        <h2>Profile</h2>
        <p>View your profile and leaderboard: <button onClick={() => navigate('/profile')}>Go to Profile</button></p>
      </section>
    </div>
  );
};

export default StudentDashboard;