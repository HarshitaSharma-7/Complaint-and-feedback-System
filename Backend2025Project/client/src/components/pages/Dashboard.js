import React from 'react';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '../dashboards/StudentDashboard';
import TeacherDashboard from '../dashboards/TeacherDashboard';
import WardenDashboard from '../dashboards/WardenDashboard';
import LibrarianDashboard from '../dashboards/LibrarianDashboard';
import DashboardLanding from './DashboardLanding';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  if (!token) {
    // Update this redirect to point to '/auth'
    return <Navigate to="/auth" />;
  }

  switch (userRole) {
    case 'student':
      return <DashboardLanding />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'warden':
      return <WardenDashboard />;
    case 'librarian':
      return <LibrarianDashboard />;
    default:
      return <Navigate to="/auth" />;
  }
};

export default Dashboard;