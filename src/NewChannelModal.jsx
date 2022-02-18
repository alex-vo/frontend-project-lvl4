import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNewChannelModal } from './slices/chatSlice.js';
import SocketContext from './SocketContext.jsx';

export default () => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.chat.chatData);
  const { socket } = useContext(SocketContext);
  const hideModal = () => {
    dispatch(toggleNewChannelModal(false));
  };

  return (
    <>
      <div className="fade modal-backdrop show" style={{ zIndex: 1 }} onClick={hideModal}/>
      <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 2 }}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close"/>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ channelName: '' }}
              validate={(values) => {
                if (!values.channelName) {
                  return { channelName: 'must not be blank' };
                }
                return {};
              }}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                if (channels.find((channel) => channel.name === values.channelName)) {
                  setErrors({ channelName: 'duplicate channel name' });
                  setSubmitting(false);
                } else {
                  socket.emit('newChannel', { name: values.channelName }, (result) => {
                    // todo chow error message
                  });
                }
              }}
            >
              {
                ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="visually-hidden" htmlFor="channelName">
                        Имя канала
                        <input
                          name="channelName"
                          id="channelName"
                          className={`mb-2 form-control ${errors.channelName && touched.channelName ? 'is-invalid' : ''}`}
                          value={values.channelName}
                          onChange={handleChange}
                          autoFocus
                        />
                        <div className="invalid-feedback">
                          {errors.channelName}
                        </div>
                      </label>
                      <div className="d-flex justify-content-end">
                        <button type="button" className="me-2 btn btn-secondary" onClick={hideModal}>Отменить</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Отправить</button>
                      </div>
                    </div>
                  </form>
                )
              }
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
