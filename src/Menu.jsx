import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

export default () => {
  const { authContext } = useContext(AuthContext);
  return (
    <ul>
      {authContext.isAuthenticated ? (
        <li>
          <Link to="/">Home</Link>
        </li>
      ) : null}
      {!authContext.isAuthenticated ? (
        <li>
          <Link to="/login">Login</Link>
        </li>
      ) : null}
    </ul>
  );
};
