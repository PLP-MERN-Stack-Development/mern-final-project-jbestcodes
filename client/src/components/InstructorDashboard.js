import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }] });
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', lessons: [{ title: '', content: '' }] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/courses', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    axios.get('http://localhost:5000/api/quizzes', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setQuizzes(response.data))
      .catch(error => console.error('Error fetching quizzes:', error));

    axios.get('http://localhost:5000/api/students/my', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  };

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setNewCourse({ title: '', description: '', lessons: [{ title: '', content: '' }] });
    setShowCreateCourse(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description, lessons: course.lessons });
    setShowCreateCourse(true);
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    const url = editingCourse ? `http://localhost:5000/api/courses/${editingCourse._id}` : 'http://localhost:5000/api/courses';
    const method = editingCourse ? 'put' : 'post';
    axios[method](url, newCourse, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setShowCreateCourse(false);
        setEditingCourse(null);
        setNewCourse({ title: '', description: '', lessons: [{ title: '', content: '' }] });
        fetchData();
      })
      .catch(error => console.error('Error saving course:', error));
  };

  const addLesson = () => {
    setNewCourse({
      ...newCourse,
      lessons: [...newCourse.lessons, { title: '', content: '' }]
    });
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setNewQuiz({ title: quiz.title, questions: quiz.questions });
    setShowCreateQuiz(true);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const url = editingQuiz ? `http://localhost:5000/api/quizzes/${editingQuiz._id}` : 'http://localhost:5000/api/quizzes';
    const method = editingQuiz ? 'put' : 'post';
    axios[method](url, newQuiz, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setShowCreateQuiz(false);
        setEditingQuiz(null);
        setNewQuiz({ title: '', questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }] });
        fetchData();
      })
      .catch(error => console.error('Error saving quiz:', error));
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/'; // Or use navigate if imported
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
      <h1>Instructor Dashboard</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>My Courses</h2>
        {courses.length > 0 ? (
          <ul>
            {courses.map(course => (
              <li key={course._id}>{course.title} - {course.description} <button onClick={() => handleEditCourse(course)}>Edit</button></li>
            ))}
          </ul>
        ) : (
          <p>No courses created yet.</p>
        )}
        <button onClick={handleCreateCourse} style={{ marginTop: '10px' }}>Create New Course</button>
        {showCreateCourse && (
          <form onSubmit={handleCourseSubmit} style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{editingCourse ? 'Edit Course' : 'Create Course'}</h3>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            {newCourse.lessons.map((lesson, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lesson.title}
                  onChange={(e) => {
                    const lessons = [...newCourse.lessons];
                    lessons[index].title = e.target.value;
                    setNewCourse({ ...newCourse, lessons });
                  }}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <textarea
                  placeholder="Lesson Content"
                  value={lesson.content}
                  onChange={(e) => {
                    const lessons = [...newCourse.lessons];
                    lessons[index].content = e.target.value;
                    setNewCourse({ ...newCourse, lessons });
                  }}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
            ))}
            <button type="button" onClick={addLesson} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>
              Add Lesson
            </button>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
              {editingCourse ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowCreateCourse(false)} style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>
              Cancel
            </button>
          </form>
        )}
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>My Quizzes</h2>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map(quiz => (
              <li key={quiz._id}>{quiz.title} - <button onClick={() => handleEditQuiz(quiz)}>Edit</button> <button>View Results</button></li>
            ))}
          </ul>
        ) : (
          <p>No quizzes created yet.</p>
        )}
        <button onClick={handleCreateQuiz} style={{ marginTop: '10px' }}>Create New Quiz</button>
        {showCreateQuiz && (
          <form onSubmit={handleQuizSubmit} style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{editingQuiz ? 'Edit Quiz' : 'Create Quiz'}</h3>
            <input
              type="text"
              placeholder="Quiz Title"
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            {newQuiz.questions.map((q, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) => {
                    const questions = [...newQuiz.questions];
                    questions[index].question = e.target.value;
                    setNewQuiz({ ...newQuiz, questions });
                  }}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const questions = [...newQuiz.questions];
                      questions[index].options[optIndex] = e.target.value;
                      setNewQuiz({ ...newQuiz, questions });
                    }}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
                  />
                ))}
                <select
                  value={q.correctAnswer}
                  onChange={(e) => {
                    const questions = [...newQuiz.questions];
                    questions[index].correctAnswer = parseInt(e.target.value);
                    setNewQuiz({ ...newQuiz, questions });
                  }}
                  style={{ width: '100%', padding: '8px' }}
                >
                  <option value={0}>Correct: Option 1</option>
                  <option value={1}>Correct: Option 2</option>
                  <option value={2}>Correct: Option 3</option>
                  <option value={3}>Correct: Option 4</option>
                </select>
              </div>
            ))}
            <button type="button" onClick={addQuestion} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>
              Add Question
            </button>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
              {editingQuiz ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowCreateQuiz(false)} style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>
              Cancel
            </button>
          </form>
        )}
      </section>

      <section>
        <h2>Enrolled Students</h2>
        {students.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Courses Enrolled</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.enrolledCourses?.length || 0}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button onClick={() => handleDeactivate(student._id)} style={{ padding: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students enrolled.</p>
        )}
      </section>
    </div>
  );
};

export default InstructorDashboard;