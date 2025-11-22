import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MyComplaints = ({ refreshToken = 0 }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints/my');
      setComplaints(res.data);
    } catch (err) {
      console.error('Could not fetch complaints', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  if (loading) {
    return <p>Loading your complaints...</p>;
  }

  if (complaints.length === 0) {
    return <p>You have not submitted any complaints yet.</p>;
  }

  return (
    <div className="complaint-list-container">
      <h2>Your Submitted Complaints</h2>
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Details</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id} className={`status-${c.status}`}>
              <td>{c.category}</td>
              <td>{c.title}</td>
              <td>{c.category === 'hostel' ? (c.hostelName || '-') : c.category === 'academic' ? (c.groupNumber || '-') : '-'}</td>
              <td>{c.status}</td>
              <td>{new Date(c.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComplaints;