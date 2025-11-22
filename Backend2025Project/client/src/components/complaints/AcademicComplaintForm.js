import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AcademicComplaintForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/complaints', { ...formData, category: 'academic' });
      alert('Academic complaint submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to submit complaint.');
    }
  };

  return (
    <div className="form-container">
      <h1>Academic Complaint Form</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Complaint Title" name="title" onChange={onChange} required />
        <textarea placeholder="Describe the issue in detail" name="description" onChange={onChange} required></textarea>
        <input type="submit" value="Submit Complaint" />
      </form>
    </div>
  );
};

export default AcademicComplaintForm;