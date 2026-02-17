import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [backendEnv, setBackendEnv] = useState('');
  const [backendPort, setBackendPort] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
  const ENV = process.env.REACT_APP_ENV || 'development';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const healthRes = await fetch(`${API_URL}/health`);
        const healthData = await healthRes.json();
        setStatus(healthData.status);
        setBackendEnv(healthData.environment);
        setBackendPort(healthData.port);
        setTimestamp(healthData.timestamp);

        const usersRes = await fetch(`${API_URL}/users`);
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (err) {
        setStatus('Backend not connected');
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                <path d="M20 10L30 25H10L20 10Z" fill="white" opacity="0.9" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <h1>DevOps Dashboard</h1>
              <p>3-Tier Architecture</p>
            </div>
          </div>
          <div className="env-badge" data-env={ENV}>
            {ENV}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">System Status</p>
                <h3 className="stat-value">{status || 'Checking...'}</h3>
              </div>
              <div className={`status-dot ${status && status !== 'Backend not connected' ? 'active' : 'inactive'}`}></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Active Users</p>
                <h3 className="stat-value">{users.length}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Environment</p>
                <h3 className="stat-value">{backendEnv || ENV}</h3>
              </div>
            </div>
          </div>

          {/* Users Section */}
          <div className="section">
            <div className="section-header">
              <h2>Team Members</h2>
              <p>Currently active in the system</p>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : (
              <div className="users-grid">
                {users.map((user, index) => (
                  <div className="user-card" key={user.id} style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="user-avatar">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p className="user-role">{user.role}</p>
                    </div>
                    <div className="user-status">
                      <span className="status-indicator active"></span>
                      <span className="status-text">Online</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Info */}
          <div className="system-info">
            <div className="info-card">
              <div className="info-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <h3>System Configuration</h3>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">API Endpoint</span>
                  <span className="info-value">{API_URL}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Backend Port</span>
                  <span className="info-value">{backendPort || '4000'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 DevOps Dashboard. Built with React & Express.</p>
      </footer>
    </div>
  );
}

export default App;
