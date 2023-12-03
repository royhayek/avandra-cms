import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileModelProps } from './types';
import { toast } from 'react-toastify';
import { updateUser } from './api';

export const updateProfileAction = createAsyncThunk(
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
