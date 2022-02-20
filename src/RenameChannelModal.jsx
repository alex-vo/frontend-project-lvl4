import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { toggleRenameChannelModal } from './slices/chatSlice.js';
import SocketContext from './SocketContext.jsx';

export default () => {
  const dispatch = useDispatch();
  const { channels, renameChannelModal } = useSelector((state) => state.chat.chatData);
  const currentChannel = channels.find((channel) => channel.id === renameChannelModal.id);
  const hideModal = () => {
    dispatch(toggleRenameChannelModal({ open: false }));
  };
  const { socket } = useContext(SocketContext);

  const { t } = useTranslation();

  return (
    <>
      <div className="fade modal-backdrop show" style={{ zIndex: 1 }} onClick={hideModal}/>
      <div className=" modal-dialog modal-dialog-centered" style={{ zIndex: 2 }}>
        <div className=" modal-content">
          <div className=" modal-header">
            <div className=" modal-title h4">{t('rename-channel')}</div>
            <button aria-label=" Close" data-bs-dismiss=" modal" type="button" className="btn btn-close"/>
          </div>
          <div className=" modal-body">
            <Formik
              initialValues={{ channelName: currentChannel.name }}
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
                  socket.emit('renameChannel', { name: values.channelName, id: renameChannelModal.id }, (result) => {
                    if (result.status === 'ok') {
                      toast(t('channel-renamed'));
                    }
                  });
                }
              }}
            >
              {
                ({ values, errors, touched, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className=" form-group">
                      <label className=" visually-hidden" htmlFor=" name">
                        {t('channel-name')}
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
                        <button
                          type="button"
                          className="me-2 btn btn-secondary"
                          onClick={hideModal}
                        >
                          {t('cancel')}
                        </button>
                        <button type="submit" className="btn btn-primary">{t('send')}</button>
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
