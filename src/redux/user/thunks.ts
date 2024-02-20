// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { updateUser } from './api';
import { ProfileModelProps } from './types';

// Actions

export const updateProfileAction = createAsyncThunk(
  'user/update',
  async (payload: ProfileModelProps, { rejectWithValue }) => {
    try {
      const response = await updateUser(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data.result;
    } catch (error: any) {
      toast.error(error.response?.data?.message);

      return rejectWithValue(error.response?.data?.message);
    }
  }
);
