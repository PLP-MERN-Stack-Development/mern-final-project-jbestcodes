import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || 'student');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'teacher') {
      // Fetch only instructor's courses
      axios.get('http://localhost:5000/api/courses/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    } else {
      // Fetch all courses for browsing
      axios.get('http://localhost:5000/api/courses')
        .then(response => setCourses(response.data))
        .catch(error => console.error('Error fetching courses:', error));
    }
  }, [role]);

  const handleEnroll = (courseId) => {
    axios.post('http://localhost:5000/api/enroll', { courseId }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => alert('Enrolled successfully'))
      .catch(error => console.error('Error enrolling:', error));
  };

  const handleCreate = () => {
    setEditingCourse(null);
    setNewCourse({ title: '', description: '' });
    setShowCreateForm(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourse({ title: course.title, description: course.description });
    setShowCreateForm(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const url = editingCourse ? `http://localhost:5000/api/courses/${editingCourse._id}` : 'http://localhost:5000/api/courses';
    const method = editingCourse ? 'put' : 'post';
    axios[method](url, newCourse, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => {
        setShowCreateForm(false);
        setEditingCourse(null);
        setNewCourse({ title: '', description: '' });
        fetchCourses();
      })
      .catch(error => console.error('Error saving course:', error));
  };

  const handleViewDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Courses</h1>
      {role === 'teacher' && (
        <button onClick={handleCreate} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
          Create New Course
        </button>
      )}
      {showCreateForm && (
        <form onSubmit={handleCreateSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>{editingCourse ? 'Edit Course' : 'Create Course'}</h3>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <textarea
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            {editingCourse ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={() => setShowCreateForm(false)} style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}>
            Cancel
          </button>
        </form>
      )}
      {courses.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {courses.map(course => (
            <div key={course._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
              <h3 style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => handleViewDetails(course._id)}>{course.title}</h3>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor?.name || 'Unknown'}</p>
              {role === 'student' && (
                <button onClick={() => handleEnroll(course._id)} style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Enroll
                </button>
              )}
              {role === 'teacher' && (
                <button onClick={() => handleEdit(course)} style={{ padding: '8px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px' }}>
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No courses available yet. Teachers can create courses to get started.</p>
      )}
    </div>
  );
};

export default Courses;