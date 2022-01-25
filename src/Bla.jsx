import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from './AuthContext.jsx';
import anonymous from './utils.js';

export default () => {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : anonymous;
  const [authContext, setAuthContext] = useState(user);
  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
      <Router>
        <div>
          <Menu/>
          <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};
