import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role') || 'student');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}/quizzes`);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    const checkEnrollment = async () => {
      if (role === 'student' && token) {
        try {
          const response = await axios.get('http://localhost:5000/api/courses/enrolled', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const enrolledCourses = response.data;
          setEnrolled(enrolledCourses.some(c => c._id === id));
        } catch (error) {
          console.error('Error checking enrollment:', error);
        }
      }
    };

    fetchCourse();
    fetchQuizzes();
    checkEnrollment();
  }, [id, role, token]);

  const handleEnroll = async () => {
    if (!token) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/courses/${id}/enroll`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolled(true);
      alert('Enrolled successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Enrollment failed');
    }
  };

  const handleEdit = () => {
    // Placeholder for edit functionality
    alert('Edit course feature coming soon');
  };

  if (!course) return <p>Loading course...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor?.fullName || 'Unknown'}</p>
      {role === 'student' && !enrolled && <button onClick={handleEnroll}>Enroll</button>}
      {role === 'student' && enrolled && <p>You are enrolled in this course.</p>}
      {role === 'teacher' && <button onClick={handleEdit}>Edit Course</button>}
      
      <h2>Lessons</h2>
      {course.lessons && course.lessons.length > 0 ? (
        <ul>
          {course.lessons.map((lesson, index) => (
            <li key={index}>
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available yet.</p>
      )}
      
      <h2>Quizzes</h2>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz._id}>
              <h3>{quiz.title}</h3>
              {enrolled && <button onClick={() => navigate(`/take-quiz/${quiz._id}`)}>Take Quiz</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available yet.</p>
      )}
    </div>
  );
};

export default CourseDetails;