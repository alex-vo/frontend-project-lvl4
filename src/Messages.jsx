import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import SocketContext from './SocketContext.jsx';
import AuthContext from './AuthContext.jsx';

export default () => {
  const { currentChannelId, messages, channels } = useSelector((state) => state.chat.chatData);
  if (currentChannelId === null) {
    return null;
  }
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : '';
  const currentChannelMessages = messages.filter((message) => message.channelId === currentChannelId);
  const { socket } = useContext(SocketContext);
  const { authContext: { username } } = useContext(AuthContext);

  const handleAddMessage = (values) => {
    const message = { text: values.msg, channelId: currentChannelId, username };
    socket.emit('newMessage', message);
    // todo reset msg asyncly
    values.msg = '';
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannelName}</b></p>
          <span className="text-muted">
            {`${currentChannelMessages.length} сообщений`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {
            currentChannelMessages
              .map(({ id, username, text }) => (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>
                  :
                  {text}
                </div>
              ))
          }
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik initialValues={{ msg: '' }} onSubmit={handleAddMessage}>
            {({ values, handleChange, handleSubmit }) => (
              <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
                <div className="input-group has-validation">
                  <input
                    name="msg"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    onChange={handleChange}
                    value={values.msg}
                  />
                  <div className="input-group-append">
                    <button disabled="" type="submit" className="btn btn-group-vertical">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
