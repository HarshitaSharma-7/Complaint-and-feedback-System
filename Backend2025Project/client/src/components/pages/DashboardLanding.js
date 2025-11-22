import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MyComplaints from '../complaints/MyComplaints';
import studentBg from '../images/imageStudent.png';
import './DashboardLanding.css';

const DashboardLanding = () => {
  const userName = localStorage.getItem('userName') || 'Student';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-hero-shell">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-hero-left">
        <div className="dashboard-card">
          <h2>Hi, {userName} 👋</h2>
          <p>Manage your complaints and feedback</p>

          <div className="dashboard-actions">
            <Link to="/complaint-form" className="dashboard-btn btn-complaint">
              File a Complaint
            </Link>
            <Link to="/feedback-form" className="dashboard-btn btn-feedback">
              Submit Feedback
            </Link>
          </div>

          <div className="complaints-section">
            <MyComplaints />
          </div>
        </div>
      </div>

      <div className="dashboard-hero-right">
        <img src={studentBg} alt="Student support illustration" />
      </div>
    </div>
  );
};

export default DashboardLanding;
