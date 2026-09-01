import React, { useState } from 'react';
import Button from '../components/Button';
import './Account.css';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login functionality requires a backend. This is a demo storefront.');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirm) {
      alert('Passwords do not match');
      return;
    }
    alert('Registration functionality requires a backend. This is a demo storefront.');
  };

  return (
    <div className="page-container container">
      <div className="account-container">
        <div className="account-tabs">
          <button className={`account-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</button>
          <button className={`account-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Create Account</button>
        </div>

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
            <Button variant="primary" className="account-submit">Sign In</Button>
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
              <input type="password" placeholder="Create password" value={registerForm.password} onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" value={registerForm.confirm} onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })} required />
            </div>
            <Button variant="primary" className="account-submit">Create Account</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
