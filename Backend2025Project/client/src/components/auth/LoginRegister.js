import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './LoginRegister.css'; // We will create this CSS file next

const LoginRegister = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  // Handlers for login form
  const onLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('userName', res.data.name);
      navigate('/dashboard');
    } catch (err) {
      alert('Login Failed: ' + (err.response?.data?.msg || 'Server Error'));
    }
  };

  // Handlers for register form
  const onRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', registerData);
      alert('Registration successful! Please turn the page to log in.');
      setIsFlipped(false); // Flip back to login page
    } catch (err) {
      alert('Registration Failed: ' + (err.response?.data?.msg || 'Server Error'));
    }
  };


  return (
    <div className="login-register-container">
      <div className={isFlipped ? 'book-container flipped' : 'book-container'}>
        <div className="book">
          {/* Front of the book: Login Page */}
          <div className="front">
            <div className="form-content">
              <h1>Account Login</h1>
              <form onSubmit={onLoginSubmit}>
                <input type="email" placeholder="Email Address" name="email" value={loginData.email} onChange={onLoginChange} required />
                <input type="password" placeholder="Password" name="password" value={loginData.password} onChange={onLoginChange} minLength="6" required />
                <input type="submit" value="Login" />
              </form>
              <p>
                Don't have an account? 
                <button onClick={() => setIsFlipped(true)} className="flip-button">Sign Up</button>
              </p>
            </div>
          </div>

          {/* Back of the book: Register Page */}
          <div className="back">
            <div className="form-content">
              <h1>Create Account</h1>
              <form onSubmit={onRegisterSubmit}>
                <input type="text" placeholder="Name" name="name" value={registerData.name} onChange={onRegisterChange} required />
                <input type="email" placeholder="Email Address" name="email" value={registerData.email} onChange={onRegisterChange} required />
                <input type="password" placeholder="Password" name="password" value={registerData.password} onChange={onRegisterChange} minLength="6" required />
                <select name="role" value={registerData.role} onChange={onRegisterChange}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="warden">Warden</option>
                  <option value="librarian">Librarian</option>
                </select>
                <input type="submit" value="Register" />
              </form>
              <p>
                Already have an account? 
                <button onClick={() => setIsFlipped(false)} className="flip-button">Sign In</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;