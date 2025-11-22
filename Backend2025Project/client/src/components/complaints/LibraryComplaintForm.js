import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const LibraryComplaintForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', issueType: 'book-damage' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/complaints', { ...formData, category: 'library' });
      alert('Library complaint submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to submit complaint.');
    }
  };

  return (
    <div className="form-container">
      <h1>Library Complaint Form</h1>
      <form onSubmit={onSubmit}>
        <select name="issueType" value={formData.issueType} onChange={onChange} required>
          <option value="book-damage">Damaged Book</option>
          <option value="missing-book">Missing Book</option>
          <option value="unavailable-book">Book Unavailable</option>
          <option value="lost-item">Lost Item</option>
          <option value="facility-issue">Facility Issue</option>
          <option value="other">Other</option>
        </select>
        <input type="text" placeholder="Complaint Title" name="title" onChange={onChange} required />
        <textarea placeholder="Describe the issue in detail" name="description" onChange={onChange} required></textarea>
        <input type="submit" value="Submit Complaint" />
      </form>
    </div>
  );
};

export default LibraryComplaintForm;
