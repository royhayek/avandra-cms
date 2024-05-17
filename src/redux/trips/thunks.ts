// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { deleteTrip, getTrip, getTrips } from './api';

// Actions

export const getTripsAction = createAsyncThunk('trip/getTrips', async (_, { rejectWithValue }) => {
  try {
    const response = await getTrips();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const getTripAction = createAsyncThunk('trip/get', async (_id: string, { rejectWithValue }) => {
  try {
    const response = await getTrip(_id);

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const deleteTripAction = createAsyncThunk('trip/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteTrip(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
