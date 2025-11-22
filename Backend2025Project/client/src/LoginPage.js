import React, { useState } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import api from './services/api';
import illustration from './components/images/imageL.png';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('userName', res.data.name);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.msg || 'Invalid credentials'));
    }
  };

  return (
    <div className="login-page">
      {/* Left Section: Form and Text */}
      <div className="left-panel">
        <div className="content-wrapper">
          <h1>
            Welcome to the <br />
            Complaint / Feedback <br />
            System
          </h1>
          <p className="subtitle">
            Your one-stop solution for reporting and <br />
            resolve institutional issues.
          </p>

          <form className="login-form" onSubmit={onSubmit}>
            <div className="input-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={onChange} required />
            </div>
            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={onChange}
                required
              />
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>

          <p className="register-text">
            Don't have an account? <a href="/register">Register Here</a>
          </p>

          <p className="info-links">
            <Link to="/about">About Us</Link>
            <span> · </span>
            <Link to="/contact">Contact Us</Link>
          </p>
        </div>
      </div>

      {/* Right Section: Illustration and Decorative Elements */}
      <div className="right-panel">
        <img src={illustration} alt="Complaint System Illustration" className="main-illustration" />
        {/* Decorative circles - these will be styled with CSS pseudo-elements or empty divs */}
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-circle circle-3"></div>
        <div className="deco-circle circle-4"></div>
      </div>
    </div>
  );
}

export default LoginPage;