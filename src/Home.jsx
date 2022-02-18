import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from './AuthContext.jsx';
import anonymous from './utils.js';
import { fetchData } from './slices/chatSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NewChannelModal from './NewChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

export default () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext.isAuthenticated) {
    return (
      <Navigate to="/login"/>
    );
  }

  // todo implement logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthContext(anonymous);
    navigate('/login');
  };

  const dispatch = useDispatch();
  const { newChannelModal, renameChannelModal } = useSelector((state) => state.chat.chatData);

  useEffect(() => {
    dispatch(fetchData(authContext.token));
  }, [dispatch]);
  // todo use inside components
  // const chatData = useSelector((state) => state.chat.chatData);

  return (
    <>
      <div className="row h-100 flex-md-row">
        <Channels/>
        <Messages/>
      </div>
      {newChannelModal.open && <NewChannelModal/>}
      {renameChannelModal.open && <RenameChannelModal/>}
    </>
  );
};
