import React, { useState, useEffect } from 'react';
import MyComplaints from '../complaints/MyComplaints';
import './StudentDashboard.css';
import api from '../../services/api';
import studentBg from '../images/imageStudent.png';

const StudentDashboard = () => {
  const userName = localStorage.getItem('userName');
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaintRefreshKey, setComplaintRefreshKey] = useState(0);

  const [complaintForm, setComplaintForm] = useState({
    category: 'hostel',
    title: '',
    description: '',
    detail: '',
  });

  const [feedbackForm, setFeedbackForm] = useState({
    name: userName || '',
    email: '',
    subject: '',
    feedbackType: 'suggestion',
    category: 'hostel',
    message: '',
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedbacks');
      setFeedbacks(res.data || []);
    } catch (err) {
      console.error('Failed to fetch feedbacks', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/complaints', {
        title: complaintForm.title,
        description: complaintForm.description,
        category: complaintForm.category,
        ...(complaintForm.category === 'hostel' && complaintForm.detail ? { hostelName: complaintForm.detail } : {}),
        ...(complaintForm.category === 'academic' && complaintForm.detail ? { groupNumber: complaintForm.detail } : {}),
      });
      alert('Complaint submitted successfully!');
      setComplaintForm({ category: 'hostel', title: '', description: '', detail: '' });
      setShowComplaintForm(false);
      setComplaintRefreshKey((prev) => prev + 1);
    } catch (err) {
      alert('Failed to submit complaint.');
      console.error(err);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedbacks', feedbackForm);
      alert('Feedback submitted successfully!');
      setFeedbackForm({
        name: userName || '',
        email: '',
        subject: '',
        feedbackType: 'suggestion',
        category: 'hostel',
        message: '',
      });
      setShowFeedbackForm(false);
      fetchFeedbacks();
    } catch (err) {
      alert('Failed to submit feedback.');
      console.error(err);
    }
  };

  return (
    <div className="student-dashboard-shell">
      <div className="student-dashboard-left">
        <div className="student-portal">
          <div className="student-portal-card">
            <div className="student-portal-header">
              <div>
                <p className="student-portal-subtitle">Hello {userName || 'there'},</p>
                <h1>How can we assist you today?</h1>
                <p className="student-portal-description">
                  Quickly raise concerns, share feedback, and track everything from one place.
                </p>
              </div>
              <div className="student-portal-actions">
                <button className="student-action complaint" onClick={() => setShowComplaintForm(true)}>
                  📝 File a Complaint
                </button>
                <button className="student-action feedback" onClick={() => setShowFeedbackForm(true)}>
                  💬 Give Feedback
                </button>
              </div>
            </div>

            <div className="student-portal-lists">
              <div className="student-portal-list">
                <h2>Complaint History</h2>
                <MyComplaints refreshToken={complaintRefreshKey} />
              </div>
              <div className="student-portal-list">
                <h2>Your Feedback</h2>
                {feedbacks.length === 0 ? (
                  <p>You have not submitted any feedback yet.</p>
                ) : (
                  <div className="student-feedback-list">
                    {feedbacks.map((feedback) => (
                      <div className="student-feedback-card" key={feedback._id}>
                        <h4>{feedback.subject}</h4>
                        <p>{feedback.message}</p>
                        <small>
                          Type: {feedback.feedbackType} · Category: {feedback.category} ·{' '}
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="student-dashboard-right">
        <img src={studentBg} alt="Student dashboard illustration" />
      </div>

      {showComplaintForm && (
        <div className="student-modal">
          <div className="student-modal-content">
            <div className="student-modal-header">
              <h3>File a Complaint</h3>
              <button onClick={() => setShowComplaintForm(false)} className="student-modal-close">
                ✕
              </button>
            </div>
            <form className="student-form" onSubmit={handleComplaintSubmit}>
              <label>
                Category
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value, detail: '' })}
                  required
                >
                  <option value="hostel">Hostel</option>
                  <option value="academic">Academic</option>
                  <option value="library">Library</option>
                </select>
              </label>
              <label>
                Title
                <input
                  type="text"
                  value={complaintForm.title}
                  onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  rows="4"
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                  required
                />
              </label>
              {(complaintForm.category === 'hostel' || complaintForm.category === 'academic') && (
                <label>
                  {complaintForm.category === 'hostel' ? 'Hostel / Block Name' : 'Group / Course Code'}
                  <input
                    type="text"
                    value={complaintForm.detail}
                    onChange={(e) => setComplaintForm({ ...complaintForm, detail: e.target.value })}
                  />
                </label>
              )}
              <div className="student-form-actions">
                <button type="button" onClick={() => setShowComplaintForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFeedbackForm && (
        <div className="student-modal">
          <div className="student-modal-content">
            <div className="student-modal-header">
              <h3>Share Feedback</h3>
              <button onClick={() => setShowFeedbackForm(false)} className="student-modal-close">
                ✕
              </button>
            </div>
            <form className="student-form" onSubmit={handleFeedbackSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                  required
                />
              </label>
              <label>
                Category
                <select
                  value={feedbackForm.category}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                  required
                >
                  <option value="hostel">Hostel</option>
                  <option value="academic">Academic</option>
                  <option value="library">Library</option>
                </select>
              </label>
              <label>
                Feedback Type
                <select
                  value={feedbackForm.feedbackType}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedbackType: e.target.value })}
                  required
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="praise">Praise</option>
                  <option value="improvement">Improvement</option>
                </select>
              </label>
              <label>
                Subject
                <input
                  type="text"
                  value={feedbackForm.subject}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  rows="4"
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  required
                />
              </label>
              <div className="student-form-actions">
                <button type="button" onClick={() => setShowFeedbackForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;