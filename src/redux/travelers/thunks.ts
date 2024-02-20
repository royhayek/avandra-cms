// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { createTraveler, deleteTraveler, getTravelers, modifyTraveler } from './api';
import { TravelOptionProps } from 'shared/types/Traveler';

// Actions

export const getTravelersAction = createAsyncThunk('traveler/getTravelers', async (_, { rejectWithValue }) => {
  try {
    const response = await getTravelers();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createTravelerAction = createAsyncThunk(
  'traveler/create',
  async (payload: TravelOptionProps, { rejectWithValue }) => {
    try {
      const response = await createTraveler(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyTravelerAction = createAsyncThunk(
  'traveler/update',
  async (payload: TravelOptionProps, { rejectWithValue }) => {
    try {
      const response = await modifyTraveler(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteTravelerAction = createAsyncThunk('traveler/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteTraveler(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
