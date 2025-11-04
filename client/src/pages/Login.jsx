import React, { useState } from 'react';
import { login, saveToken } from '../api/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password required');
      return;
    }
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res.token) {
        saveToken(res.token);
        if (onLogin) onLogin(res);
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2 className="auth-title">Welcome back</h2>
      {error && <div className="auth-error">{error}</div>}
      <label className="auth-label">
        Email
        <input className="auth-input" value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </label>
      <label className="auth-label">
        Password
        <input className="auth-input" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      </label>
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button className="btn btn-outline" type="button" onClick={() => { setEmail(''); setPassword(''); setError(''); }}>
          Reset
        </button>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default Login;