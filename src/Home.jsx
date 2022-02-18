import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from './AuthContext.jsx';
import { fetchData } from './slices/chatSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NewChannelModal from './NewChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import Navigation from './Navigation.jsx';

export default () => {
  const { authContext } = useContext(AuthContext);
  if (!authContext.isAuthenticated) {
    return (
      <Navigate to="/login"/>
    );
  }

  const dispatch = useDispatch();
  const { newChannelModal, renameChannelModal } = useSelector((state) => state.chat.chatData);

  useEffect(() => {
    dispatch(fetchData(authContext.token));
  }, [dispatch]);

  return (
    <>
      <Navigation/>
      <div className="row h-100 flex-md-row">
        <Channels/>
        <Messages/>
      </div>
      {newChannelModal.open && <NewChannelModal/>}
      {renameChannelModal.open && <RenameChannelModal/>}
    </>
  );
};
