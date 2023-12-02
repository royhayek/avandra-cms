import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, updateUser } from './api';
import { toast } from 'react-toastify';
import { ProfileModelProps } from './types';

export const getUsersList = createAsyncThunk('user/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getUsers();

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const updateUserAction = createAsyncThunk(
  'user/update',
  async (payload: ProfileModelProps, { rejectWithValue }) => {
    try {
      const response = await updateUser(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);
