import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import './Account.css';

const Account = () => {
  const { user, login, register, logout, isAuthenticated } = useAuth();
  const { loadServerCart } = useCart();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' });

  if (isAuthenticated) {
    return (
      <div className="page-container container">
        <div className="account-container">
          <h2>My Account</h2>
          <div className="account-profile-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            {user.role === 'admin' && <span className="account-role-badge">Admin</span>}
          </div>
          <div className="account-actions">
            <Button variant="outline" onClick={() => navigate('/orders')}>My Orders</Button>
            {user.role === 'admin' && <Button variant="outline" onClick={() => navigate('/admin')}>Admin Dashboard</Button>}
            <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>Sign Out</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      loadServerCart();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (registerForm.password !== registerForm.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container container">
      <div className="account-container">
        <div className="account-tabs">
          <button className={`account-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
          <button className={`account-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Create Account</button>
        </div>

        {error && <p className="account-error">{error}</p>}

        {isLogin ? (
          <form className="account-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} required />
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
            <Button variant="primary" className="account-submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
          </form>
        ) : (
          <form className="account-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" value={registerForm.name} onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create password (min 6 chars)" value={registerForm.password} onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} required minLength={6} />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" value={registerForm.confirm} onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })} required />
            </div>
            <Button variant="primary" className="account-submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
