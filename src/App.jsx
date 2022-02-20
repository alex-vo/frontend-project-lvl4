import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from './AuthContext.jsx';
import anonymous from './utils.js';
import SocketContext from './SocketContext.jsx';
import { addChannel, addMessage, removeChannel, renameChannel } from './slices/chatSlice.js';
import Signup from './Signup.jsx';

export default ({ socket }) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (messageWithId) => {
    dispatch(addMessage(messageWithId));
  });
  socket.on('newChannel', (channelWithId) => {
    dispatch(addChannel(channelWithId));
  });
  socket.on('removeChannel', (channelWithId) => {
    dispatch(removeChannel(channelWithId));
  });
  socket.on('renameChannel', (channelWithId) => {
    dispatch(renameChannel(channelWithId));
  });
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser) : anonymous;
  const [authContext, setAuthContext] = useState(user);
  return (
    <SocketContext.Provider value={{ socket }}>
      <AuthContext.Provider value={{ authContext, setAuthContext }}>
        <Router>
          <div>
            <Routes>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/" element={<Home/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </SocketContext.Provider>
  );
};
