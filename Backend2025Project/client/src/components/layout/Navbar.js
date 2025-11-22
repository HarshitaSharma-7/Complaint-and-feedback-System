import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/auth'); // Change this from '/login' to '/auth'
  };

  const authLinks = (
    <ul>
      {userRole && <li><Link to="/dashboard">Dashboard</Link></li>}
      <li><a onClick={onLogout} href="#!">Logout</a></li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      {/* Both links now point to /auth */}
      <li><Link to="/auth">Register</Link></li> 
      <li><Link to="/auth">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to={token ? '/dashboard' : '/'}>CMS</Link>
      </h1>
      <Fragment>{token ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;