import React, { useState } from 'react';
import { register, saveToken } from '../api/auth';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Name, email and password required');
      return;
    }
    setLoading(true);
    try {
      const res = await register({ name, email, password });
      if (res.token) {
        saveToken(res.token);
        if (onRegister) onRegister(res);
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2 className="auth-title">Create an account</h2>
      {error && <div className="auth-error">{error}</div>}
      <label className="auth-label">
        Name
        <input className="auth-input" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label className="auth-label">
        Email
        <input className="auth-input" value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </label>
      <label className="auth-label">
        Password
        <input className="auth-input" value={password} onChange={e => setPassword(e.target.value)} type="password" />
      </label>
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button className="btn btn-outline" type="button" onClick={() => { setName(''); setEmail(''); setPassword(''); setError(''); }}>
          Reset
        </button>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default Register;