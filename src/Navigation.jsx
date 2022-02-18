import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anonymous from './utils.js';
import AuthContext from './AuthContext.jsx';

export default () => {
  const { setAuthContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthContext(anonymous);
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">About</Link>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
      </div>
    </nav>
  );
};
