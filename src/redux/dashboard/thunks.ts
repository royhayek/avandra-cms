import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData } from './api';
import { toast } from 'react-toastify';

export const getDashboardList = createAsyncThunk('dashboard/getData', async (_, { rejectWithValue }) => {
  try {
    const response = await getDashboardData();

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
