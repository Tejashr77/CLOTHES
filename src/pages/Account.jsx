import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { User, Mail, Lock, ArrowRight, ShoppingBag, LayoutDashboard, LogOut, Eye, EyeOff } from 'lucide-react';
import './Account.css';

const Account = () => {
  const { user, login, register, logout, isAuthenticated } = useAuth();
  const { loadServerCart } = useCart();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' });

  if (isAuthenticated) {
    return (
      <div className="page-container">
        <div className="account-dashboard-wrapper">
          <div className="account-welcome">
            <div className="account-avatar">
              <User size={32} strokeWidth={1.5} />
            </div>
            <h1>Welcome back</h1>
            <p className="account-subtitle">{user.name}</p>
          </div>

          <div className="account-info-card">
            <div className="info-row">
              <Mail size={18} strokeWidth={1.5} />
              <span>{user.email}</span>
            </div>
            {user.role === 'admin' && (
              <div className="info-row admin-row">
                <LayoutDashboard size={18} strokeWidth={1.5} />
                <span className="account-role-badge">Admin Account</span>
              </div>
            )}
          </div>

          <div className="account-actions-grid">
            <button className="account-action-card" onClick={() => navigate('/orders')}>
              <ShoppingBag size={24} strokeWidth={1.5} />
              <span className="action-label">My Orders</span>
              <ArrowRight size={16} strokeWidth={1.5} className="action-arrow" />
            </button>
            {user.role === 'admin' && (
              <button className="account-action-card admin-action" onClick={() => navigate('/admin')}>
                <LayoutDashboard size={24} strokeWidth={1.5} />
                <span className="action-label">Admin Dashboard</span>
                <ArrowRight size={16} strokeWidth={1.5} className="action-arrow" />
              </button>
            )}
            <button className="account-action-card logout-action" onClick={() => { logout(); navigate('/'); }}>
              <LogOut size={24} strokeWidth={1.5} />
              <span className="action-label">Sign Out</span>
              <ArrowRight size={16} strokeWidth={1.5} className="action-arrow" />
            </button>
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
    <div className="page-container">
      <div className="auth-wrapper">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <div className="auth-brand">
              <h2>ZaQueen</h2>
              <p>Couture & Ready-to-Wear</p>
            </div>
            <div className="auth-tagline">
              <span>Where elegance meets craftsmanship</span>
            </div>
          </div>
          <div className="auth-visual-pattern"></div>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p>{isLogin ? 'Sign in to your account' : 'Join ZaQueen today'}</p>
            </div>

            <div className="auth-tabs">
              <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(true); setError(''); }}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(false); setError(''); }}
              >
                Register
              </button>
              <div className={`auth-tab-indicator ${isLogin ? 'left' : 'right'}`}></div>
            </div>

            {error && (
              <div className="auth-error">
                <span>{error}</span>
              </div>
            )}

            {isLogin ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <div className="auth-input-group">
                  <Mail size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={loginForm.email}
                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <Lock size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">Signing in...</span>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegister}>
                <div className="auth-input-group">
                  <User size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={registerForm.name}
                    onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <Mail size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={registerForm.email}
                    onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="auth-input-group">
                  <Lock size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min 6 chars)"
                    value={registerForm.password}
                    onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                  </button>
                </div>
                <div className="auth-input-group">
                  <Lock size={18} strokeWidth={1.5} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={registerForm.confirm}
                    onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">Creating account...</span>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
