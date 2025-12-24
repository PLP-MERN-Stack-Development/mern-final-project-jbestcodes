import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const role = localStorage.getItem('role') || 'student';
  const navigate = useNavigate();

  useEffect(() => {
    // Assume user info from token or API
    // For now, placeholder
    setUser({ name: 'John Doe', email: 'john@example.com' });

    if (role === 'student') {
      axios.get('http://localhost:5000/api/leaderboard')
        .then(response => setLeaderboard(response.data))
        .catch(error => console.error('Error fetching leaderboard:', error));
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
      <h1>Profile</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2>User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>

      {role === 'student' && (
        <div>
          <h2>Leaderboard</h2>
          {leaderboard.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Student</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.studentId}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.studentName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.totalQuizScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No leaderboard data.</p>
          )}
        </div>
      )}

      {role === 'teacher' && (
        <div>
          <h2>Teacher Stats</h2>
          <p>Courses created, students taught, etc. (Coming soon)</p>
        </div>
      )}
    </div>
  );
};

export default Profile;