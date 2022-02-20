import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">{t('hexlet-chat')}</Link>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>{t('logout')}</button>
      </div>
    </nav>
  );
};
