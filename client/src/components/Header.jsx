import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { getToken, logout } from '../api/auth';

const Header = ({ onAuth }) => {
  const [mode, setMode] = useState(null); // 'login' | 'register' | null

  const handleClose = () => setMode(null);

  const handleLogout = () => {
    logout();
    if (onAuth) onAuth();
  };

  const token = getToken();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="app-title">Kanban Board</h1>
      </div>

      <div className="header-right">
        {!token ? (
          <>
            <button className="btn btn-outline" onClick={() => setMode('login')}>Log in</button>
            <button className="btn btn-primary" onClick={() => setMode('register')}>Sign up</button>
          </>
        ) : (
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        )}
      </div>

      {mode && (
        <div className="auth-modal">
          <div className="auth-modal-card">
            <button className="modal-close" onClick={handleClose}>×</button>
            {mode === 'login' ? (
              <Login onLogin={(user) => { handleClose(); if (onAuth) onAuth(user); }} />
            ) : (
              <Register onRegister={(user) => { handleClose(); if (onAuth) onAuth(user); }} />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;