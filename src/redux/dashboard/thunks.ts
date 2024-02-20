// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { getDashboardData } from './api';

// Actions

export const getDashboardList = createAsyncThunk('dashboard/getData', async (_, { rejectWithValue }) => {
  try {
    const response = await getDashboardData();

    return response.data.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
