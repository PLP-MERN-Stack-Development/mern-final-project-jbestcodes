import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>LMS Platform</h2>
        <div>
          <Link to="/" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Home</Link>
          <Link to="/login" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Register</Link>
          <Link to="/courses" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Courses</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#f4f4f4',
        padding: '50px 20px',
        textAlign: 'center',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Welcome to Our Online Course Platform</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          An innovative Learning Management System (LMS) designed for learners and teachers. Access courses, track progress, and manage your educational journey all in one place.
        </p>
        <Link to="/register" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '1.1em'
        }}>
          Get Started
        </Link>
      </section>

      {/* Overview Section */}
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>Platform Overview</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '20px' }}>
          <div style={{ maxWidth: '300px', margin: '10px' }}>
            <h3>For Learners</h3>
            <p>Enroll in courses, complete lessons, and track your learning progress from your personal dashboard.</p>
          </div>
          <div style={{ maxWidth: '300px', margin: '10px' }}>
            <h3>For Teachers</h3>
            <p>Create and manage courses, add content and lessons, and monitor student enrollment and progress.</p>
          </div>
          <div style={{ maxWidth: '300px', margin: '10px' }}>
            <h3>Courses</h3>
            <p>Browse a variety of courses, enroll as a student, or create new ones as a teacher to share knowledge.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;