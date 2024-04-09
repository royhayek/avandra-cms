// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { deleteMessage, getMessages, updateMessage } from './api';

// Interfaces
import { MessageProps } from 'shared/types/Message';

// Actions

export const getMessagesAction = createAsyncThunk('message/getMessages', async (_, { rejectWithValue }) => {
  try {
    const response = await getMessages();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const modifyMessageAction = createAsyncThunk(
  'message/update',
  async (payload: MessageProps, { rejectWithValue }) => {
    try {
      const response = await updateMessage(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteMessageAction = createAsyncThunk('message/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteMessage(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
