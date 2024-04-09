// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { getMessagesAction } from './thunks';

// Interfaces
import { MessagesInitialState } from './types';

export const initialState: MessagesInitialState = {
  data: [],
  loading: false,
  error: null
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getMessagesAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getMessagesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const messageActions = messagesSlice.actions;

export default messagesSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _messages = (state: RootState) => state.data.messages;

export const getMessages = createSelector(_messages, (data) => data?.data);

export const getMessagesError = createSelector(_messages, (data) => data?.error);

export const getMessagesLoading = createSelector(_messages, (data) => data?.loading);
