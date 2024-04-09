// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { createWalkthrough, deleteWalkthrough, getWalkthrough, modifyWalkthrough } from './api';

// Interfaces
import { WalkthroughProps } from 'shared/types/Walkthrough';

// Actions

export const getWalkthroughAction = createAsyncThunk('walkthrough/getWalkthrough', async (_, { rejectWithValue }) => {
  try {
    const response = await getWalkthrough();

    console.debug('response', response);

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createWalkthroughAction = createAsyncThunk(
  'walkthrough/create',
  async (payload: WalkthroughProps, { rejectWithValue }) => {
    try {
      const response = await createWalkthrough(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyWalkthroughAction = createAsyncThunk(
  'walkthrough/update',
  async (payload: WalkthroughProps, { rejectWithValue }) => {
    try {
      const response = await modifyWalkthrough(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteWalkthroughAction = createAsyncThunk(
  'walkthrough/delete',
  async (_id: number, { rejectWithValue }) => {
    try {
      const response = await deleteWalkthrough(_id);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);
