import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';

export default () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  </Router>
);
