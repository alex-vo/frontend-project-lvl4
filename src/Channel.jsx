import React from 'react';

export default ({ id, name, currentChannelId, switchChannel }) => (
  <button
    type="button"
    className={`w-100 rounded-0 text-start btn ${currentChannelId === id && 'btn-secondary'}`}
    onClick={switchChannel(id)}
  >
    <span className="me-1">#</span>
    {name}
  </button>
);
