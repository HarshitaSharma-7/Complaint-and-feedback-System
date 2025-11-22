import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import wardenImage from '../images/wardenImage.png';

const LibrarianDashboard = () => {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchComplaints();
    fetchFeedbacks();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/category?category=library');
      setComplaints(res.data);
    } catch (err) {
      console.error('Failed to fetch complaints', err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedbacks?category=library');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Failed to fetch feedbacks', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/complaints/${id}/status`, { status });
      fetchComplaints();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const formatDate = (value) => new Date(value).toLocaleString();

  return (
    <div className="dashboard-split-layout librarian-theme">
      <div className="dashboard-image-panel">
        <img src={wardenImage} alt="Librarian workspace" />
      </div>
      <div className="dashboard-content-panel">
        <h1>Library Dashboard: Complaints & Feedbacks</h1>
        <div className="dashboard-content">
          <div className="complaints-section">
            <h2>Complaints</h2>
            <div className="complaint-list-container">
              {complaints.map((complaint) => (
                <div key={complaint._id} className={`complaint-card status-${complaint.status}`}>
                  <h3>{complaint.title}</h3>
                  <p>{complaint.description}</p>
                  <small>
                    From: {complaint.user?.name} ({complaint.user?.email}) · Filed on {formatDate(complaint.date)}
                  </small>
                  <div className="status-badge">Status: {complaint.status}</div>
                  <div className="action-buttons">
                    <button onClick={() => handleStatusUpdate(complaint._id, 'approved')} className="btn-approve">
                      Approve
                    </button>
                    <button onClick={() => handleStatusUpdate(complaint._id, 'rejected')} className="btn-reject">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {!complaints.length && <p>No complaints have been submitted yet.</p>}
            </div>
          </div>
          <div className="feedback-section">
            <h2>Feedbacks</h2>
            <div className="feedback-list-container">
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-card">
                  <h3>{feedback.subject}</h3>
                  <p>{feedback.message}</p>
                  <small>
                    From: {feedback.name} ({feedback.email}) · Type: {feedback.feedbackType} · Submitted on{' '}
                    {formatDate(feedback.createdAt)}
                  </small>
                </div>
              ))}
              {!feedbacks.length && <p>No feedback has been shared yet.</p>}
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

export default LibrarianDashboard;
