import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    phoneNumber: '',
    complaintType: 'hostel',
    hostelName: '',
    groupNumber: '',
    title: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.title || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const complaintPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.complaintType,
      };
      // attach optional details based on complaint type
      if (formData.complaintType === 'hostel' && formData.hostelName) {
        complaintPayload.hostelName = formData.hostelName;
      }
      if (formData.complaintType === 'academic' && formData.groupNumber) {
        complaintPayload.groupNumber = formData.groupNumber;
      }

      await api.post('/complaints', complaintPayload);
      alert('Complaint submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit complaint: ' + (err.response?.data?.msg || 'Server Error'));
    }
  };

  return (
    <div className="complaint-form-wrapper">
      <div className="complaint-form-container">
        <div className="form-header">
          <h2>📋COMPLAINT FORM</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
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
                 <label>Roll Number</label>
                 <input
                   type="text"
                   name="rollNumber"
                   placeholder="Roll Number"
                   value={formData.rollNumber}
                   onChange={handleChange}
                 />
               </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Type of Complaint Section */}
          <div className="form-section">
            <h3>Type of Complaint *</h3>
            <div className="complaint-type-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="complaintType"
                  value="hostel"
                  checked={formData.complaintType === 'hostel'}
                  onChange={handleChange}
                />
                <span>Hostel Complaint</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="complaintType"
                  value="academic"
                  checked={formData.complaintType === 'academic'}
                  onChange={handleChange}
                />
                <span>Academic Complaint</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="complaintType"
                  value="library"
                  checked={formData.complaintType === 'library'}
                  onChange={handleChange}
                />
                <span>Library Complaint</span>
              </label>
            </div>
          </div>

          {/* Hostel Details Section (Conditional) */}
          {formData.complaintType === 'hostel' && (
            <div className="form-section">
              <h3>Hostel Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Hostel Name</label>
                  <select
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleChange}
                  >
                    <option value="">Select Hostel</option>
                    <option value="hostel-A">Hostel A</option>
                    <option value="hostel-B">Hostel B</option>
                    <option value="hostel-C">Hostel C</option>
                    <option value="hostel-D">Hostel D</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Academic Details Section (show only when academic selected) */}
          {formData.complaintType === 'academic' && (
            <div className="form-section">
              <h3>Academic Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Group Number</label>
                  <input
                    type="text"
                    name="groupNumber"
                    placeholder="Group Number"
                    value={formData.groupNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Complaint Details Section */}
          <div className="form-section">
            <h3>Complaint Details</h3>
            <div className="form-group full-width">
              <label>Complaint Title *</label>
              <input
                type="text"
                name="title"
                placeholder="Enter complaint title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                name="description"
                placeholder="Please describe your complaint in detail..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              SUBMIT COMPLAINT
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

export default ComplaintForm;
