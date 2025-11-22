import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import wardenImage from '../images/wardenImage.png';

const TeacherDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    const res = await api.get('/complaints/category');
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedbacks?category=academic');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Failed to fetch feedbacks', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/complaints/${id}/status`, { status });
      fetchComplaints(); // Refresh the list
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="dashboard-split-layout teacher-theme">
      <div className="dashboard-image-panel">
        <img src={wardenImage} alt="Teacher reviewing academics" />
      </div>
      <div className="dashboard-content-panel">
        <h1>Teacher Dashboard: Academic Complaints & Feedbacks</h1>
        <div className="dashboard-content">
        <div className="complaints-section">
          <h2>Complaints</h2>
          <div className="complaint-list-container">
            {complaints.map((c) => (
              <div key={c._id} className={`complaint-card status-${c.status}`}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <small>From: {c.user.name} ({c.user.email})</small>
                <div className="status-badge">Status: {c.status}</div>
                <div className="action-buttons">
                  <button onClick={() => handleStatusUpdate(c._id, 'approved')} className="btn-approve">Approve</button>
                  <button onClick={() => handleStatusUpdate(c._id, 'rejected')} className="btn-reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="feedback-section">
          <h2>Feedbacks</h2>
          <div className="feedback-list-container">
            {feedbacks.map((f) => (
              <div key={f._id} className="feedback-card">
                <h3>{f.subject}</h3>
                <p>{f.message}</p>
                <small>
                  From: {f.name} ({f.email}) · Type: {f.feedbackType}
                </small>
              </div>
            ))}
            {!feedbacks.length && <p>No feedback submitted yet.</p>}
          </div>
        </div>
        </div>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;