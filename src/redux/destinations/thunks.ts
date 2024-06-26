// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { createDestination, deleteDestination, getDestination, getDestinations, modifyDestination } from './api';

// Actions

export const getDestinationsAction = createAsyncThunk('destination/getDestinations', async (_, { rejectWithValue }) => {
  try {
    const response = await getDestinations();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const getDestinationAction = createAsyncThunk('destination/get', async (_id: string, { rejectWithValue }) => {
  try {
    const response = await getDestination(_id);

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createDestinationAction = createAsyncThunk(
  'destination/create',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await createDestination(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyDestinationAction = createAsyncThunk(
  'destination/update',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const response = await modifyDestination(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteDestinationAction = createAsyncThunk(
  'destination/delete',
  async (_id: number, { rejectWithValue }) => {
    try {
      const response = await deleteDestination(_id);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);
