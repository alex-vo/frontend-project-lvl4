import React, { createContext } from 'react';

export default createContext({ isAuthenticated: false, username: null, token: null });
