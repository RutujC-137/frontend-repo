import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Check backend health
    fetch('http://localhost:4000/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(err => setStatus('Backend not connected'));

    // Get users
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🚀 Frontend App</h1>
      <p><strong>Backend Status:</strong> {status}</p>
      
      <h2>Users List:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
