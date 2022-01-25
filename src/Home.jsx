import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.js';
import anonymous from './utils.js';

export default () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext.isAuthenticated) {
    return (
      <Navigate to="/login"/>
    );
  }
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthContext(anonymous);
    navigate('/login');
  };
  return (
    <div>
      <button type="button" onClick={handleLogout}>logout</button>
      <div>home</div>
    </div>
  );
};
