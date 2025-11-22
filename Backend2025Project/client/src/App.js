import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
// Import the new combined component
import LoginRegister from './components/auth/LoginRegister';
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import ComplaintForm from './components/complaints/ComplaintForm';
import FeedbackForm from './components/complaints/FeedbackForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Replace the old login/register routes with a single auth route */}
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complaint-form" element={<ComplaintForm />} />
          <Route path="/feedback-form" element={<FeedbackForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;