// Packages
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Utilities
import { login } from './api';
import { userActions } from 'redux/user/slice';

// Actions

export const loginAction = createAsyncThunk(
  'auth/login',
  async (args: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      const { email, password } = args;
      const response = await login({ email, password });

      console.debug('response.data', response.data);
      dispatch(userActions.update({ data: response.data.data.admin }));

      return response.data.data;
    } catch (error: any) {
      console.debug('error', error);
      toast.error(error.response?.data?.message);

      return rejectWithValue(error.response?.data?.message);
    }
  }
);
