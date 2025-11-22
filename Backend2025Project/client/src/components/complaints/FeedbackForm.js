import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    feedbackType: 'suggestion',
    category: 'hostel',
    message: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your feedback! We will review it shortly.');
        navigate('/dashboard');
      } else {
        alert('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="feedback-form-wrapper">
      <div className="feedback-form-container">
        <div className="form-header">
          <h2>💬 FEEDBACK FORM</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Your Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Feedback Category Section */}
          <div className="form-section">
            <h3>Feedback Category *</h3>
            <div className="form-group">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="hostel">Hostel</option>
                <option value="academic">Academic</option>
                <option value="library">Library</option>
              </select>
            </div>
          </div>

          {/* Feedback Type Section */}
          <div className="form-section">
            <h3>Feedback Type *</h3>
            <div className="feedback-type-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="feedbackType"
                  value="suggestion"
                  checked={formData.feedbackType === 'suggestion'}
                  onChange={handleChange}
                />
                <span>Suggestion</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="feedbackType"
                  value="praise"
                  checked={formData.feedbackType === 'praise'}
                  onChange={handleChange}
                />
                <span>Praise</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="feedbackType"
                  value="improvement"
                  checked={formData.feedbackType === 'improvement'}
                  onChange={handleChange}
                />
                <span>Improvement</span>
              </label>
            </div>
          </div>

          {/* Feedback Details Section */}
          <div className="form-section">
            <h3>Feedback Details</h3>
            <div className="form-group full-width">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter feedback subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Your Feedback *</label>
              <textarea
                name="message"
                placeholder="Please share your feedback in detail..."
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              SUBMIT FEEDBACK
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
