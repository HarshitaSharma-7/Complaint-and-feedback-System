import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // We'll create this CSS file next
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faChevronDown, faClipboardList } from '@fortawesome/free-solid-svg-icons';


import api from '../../services/api';
import registrationIllustration from '../images/imageR.png';


function RegistrationPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginAs, setLoginAs] = useState('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectLoginAs = (option) => {
    setLoginAs(option);
    setDropdownOpen(false);
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: loginAs.toLowerCase(),
      });
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.msg || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      {/* Left Panel: Illustration and Welcome Text */}
      <div className="left-panel-reg">
        {/* Decorative elements (circles, etc.) */}
        <div className="deco-circle-reg deco-circle-reg-1"></div>
        <div className="deco-circle-reg deco-circle-reg-2"></div>
        <div className="deco-circle-reg deco-circle-reg-3"></div>
        <div className="deco-circle-reg deco-circle-reg-4"></div>
        <div className="deco-square-reg deco-square-reg-1"></div>


        <div className="illustration-wrapper-reg">
          <img src={registrationIllustration} alt="Hello Friend Illustration" className="main-illustration-reg" />
        </div>

        <div className="welcome-text-reg">
          <h2>Hello, friend!</h2>
          <p>Join us to make your voice heard.</p>
        </div>
      </div>

      {/* Right Panel: Registration Form */}
      <div className="right-panel-reg">
        <div className="form-container-reg">
          <h1>Create Your Account</h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <label className="input-label-reg">Login as</label>
            <div className="dropdown-container">
              <div className="custom-select" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} className="input-icon-reg" />
                <span>{loginAs}</span>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              </div>
              {dropdownOpen && (
                <div className="dropdown-options">
                  <div onClick={() => selectLoginAs('Student')}>Student</div>
                  <div onClick={() => selectLoginAs('Warden')}>Warden</div>
                  <div onClick={() => selectLoginAs('Teacher')}>Teacher</div>
                  <div onClick={() => selectLoginAs('Librarian')}>Librarian</div>
                </div>
              )}
            </div>

      <div className="input-group-reg">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="input-group-reg">
        <input type="email" name="email" placeholder="Email / Phone No." value={formData.email} onChange={handleChange} required />
      </div>

      <div className="input-group-reg">
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>

      <div className="input-group-reg">
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
      </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'REGISTER'}
            </button>
          </form>

          <p className="login-link-reg">
            Already have account? <a href="/" onClick={handleLoginClick}>Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;