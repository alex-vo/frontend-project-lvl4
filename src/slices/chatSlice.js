import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  chatData: {
    messages: [],
    channels: [],
    newChannelModal: { open: false },
    renameChannelModal: { open: false },
  },
};

export const fetchData = createAsyncThunk(
  'fetchData',
  async (token) => {
    const response = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChannel: (state, { payload }) => {
      state.chatData.currentChannelId = payload;
    },
    addMessage: (state, { payload }) => {
      if (state.chatData.messages.find((m) => m.id === payload.id)) {
        return;
      }
      state.chatData.messages.push(payload);
    },
    addChannel: (state, { payload }) => {
      if (state.chatData.channels.find((m) => m.name === payload.name)) {
        return;
      }
      state.chatData.channels.push(payload);
      state.chatData.newChannelModal.open = false;
    },
    toggleNewChannelModal: (state, { payload }) => {
      state.chatData.newChannelModal.open = payload;
    },
    toggleRenameChannelModal: (state, { payload }) => {
      state.chatData.renameChannelModal = payload;
    },
    removeChannel: (state, { payload }) => {
      state.chatData.channels = state.chatData.channels.filter((channel) => channel.id !== payload.id);
      state.chatData.messages = state.chatData.messages.filter((message) => message.channelId !== payload.id);
      if (state.chatData.currentChannelId === payload.id) {
        state.chatData.currentChannelId = null;
      }
    },
    renameChannel: (state, { payload }) => {
      state.chatData.channels = state.chatData.channels.filter((channel) => channel.id !== payload.id);
      state.chatData.channels.push(payload);
      state.chatData.renameChannelModal = { open: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.chatData = { ...state.chatData, ...action.payload };
    });
  },
});

export const {
  selectChannel,
  addMessage,
  toggleNewChannelModal,
  addChannel,
  removeChannel,
  toggleRenameChannelModal,
  renameChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
