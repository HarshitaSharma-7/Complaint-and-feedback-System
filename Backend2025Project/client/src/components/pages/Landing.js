import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Landing.css';

const Landing = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('userName', res.data.name);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.msg || 'Server error'));
    }
  };

  return (
    <div className="landing-hero">
      <div className="landing-left">
        <div className="login-card">
          <h1>Welcome to the Complaint / Feedback System</h1>
          <p>Your one-stop solution for reporting and resolving institutional issues.</p>

          <form onSubmit={onSubmit}>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email Address" value={loginData.email} onChange={onChange} required />
            </div>
            <div className="form-row">
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={onChange} required />
            </div>
            <div className="login-actions">
              <button className="btn-login" type="submit">LOGIN</button>
              <button type="button" className="link-register" onClick={() => navigate('/register')}>Don't have an account? Register</button>
            </div>
          </form>
        </div>
      </div>

      <div className="landing-right">
        <div className="illustration-box">Illustration / Hero Image</div>
      </div>
    </div>
  );
};

export default Landing;