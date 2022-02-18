import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChannel, toggleNewChannelModal, toggleRenameChannelModal } from './slices/chatSlice.js';
import Channel from './Channel.jsx';
import SocketContext from './SocketContext.jsx';

export default () => {
  const { channels, currentChannelId } = useSelector((state) => state.chat.chatData);
  const dispatch = useDispatch();
  const [channelManagementState, setChannelManagementState] = useState(null);
  const { socket } = useContext(SocketContext);

  const switchChannel = (channelId) => () => {
    if (channelId === currentChannelId) {
      return;
    }
    dispatch(selectChannel(channelId));
  };

  const openChannelModal = () => {
    dispatch(toggleNewChannelModal(true));
  };

  const toggleChannelMenu = (id) => () => {
    if (channelManagementState === id) {
      setChannelManagementState(null);
    } else {
      setChannelManagementState(id);
    }
  };

  const close = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setChannelManagementState(null);
    }
  };

  const deleteChannel = (id) => () => {
    socket.emit('removeChannel', { id }, (result) => {
      // todo chow error message
    });
  };

  const renameChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(toggleRenameChannelModal({ id, open: true }));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={openChannelModal}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {
          channels.map(({ id, name, removable }) => (removable ? (
            <li key={id} className="nav-item w-100">
              <div role="group" className="d-flex dropdown btn-group" onBlur={close}>
                <Channel id={id} name={name} currentChannelId={currentChannelId} switchChannel={switchChannel}/>
                <button
                  aria-haspopup="true"
                  aria-expanded="false"
                  type="button"
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
                  onClick={toggleChannelMenu(id)}
                >
                  {/*<span className="visually-hidden">Управление каналом</span>*/}
                </button>
                {
                  (channelManagementState === id) && (
                    <div
                      aria-labelledby=""
                      className="dropdown-menu show"
                      style={{
                        position: 'absolute',
                        inset: '0px auto auto 0px',
                        margin: '0px',
                        transform: 'translate3d(74px, 38px, 0px)',
                      }}
                      data-popper-reference-hidden="false"
                      data-popper-escaped="false"
                      data-popper-placement="bottom-start"
                    >
                      <a href="#" className="dropdown-item" role="button" onClick={deleteChannel(id)}>Удалить</a>
                      <a href="#" className="dropdown-item" role="button" onClick={renameChannel(id)}>Переименовать</a>
                    </div>
                  )
                }
              </div>
            </li>
          ) : (
            <li key={id} className="nav-item w-100">
              <Channel id={id} name={name} currentChannelId={currentChannelId} switchChannel={switchChannel}/>
            </li>
          )))
        }
      </ul>
    </div>
  );
};
