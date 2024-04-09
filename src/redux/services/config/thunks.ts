// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { getConfig } from './api';

// Actions

export const getConfigAction = createAsyncThunk('config/getConfig', async (_, { rejectWithValue }) => {
  try {
    const response = await getConfig();

    return response.data.data;
  } catch (error: any) {
    console.debug('error', error);
    toast.error(error.response?.data?.message);

    return rejectWithValue(error.response?.data?.message);
  }
});
