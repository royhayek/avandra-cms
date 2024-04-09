// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { createInterest, deleteInterest, getInterests, modifyInterests } from './api';

// Interfaces
import { InterestProps } from 'shared/types/Interest';
import { ApiRequestProps } from 'shared/types/ApiRequest';

// Actions

export const getInterestsAction = createAsyncThunk(
  'interest/getInterests',
  async (payload: ApiRequestProps, { rejectWithValue }) => {
    try {
      const response = await getInterests(payload);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const createInterestAction = createAsyncThunk(
  'interest/create',
  async (payload: InterestProps, { rejectWithValue }) => {
    try {
      const response = await createInterest(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyInterestAction = createAsyncThunk(
  'interest/update',
  async (payload: InterestProps, { rejectWithValue }) => {
    try {
      const response = await modifyInterests(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteInterestAction = createAsyncThunk('interest/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteInterest(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
