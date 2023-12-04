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

      dispatch(userActions.update({ data: response.data.user }));

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);
