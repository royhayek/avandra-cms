// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import { UserProps } from 'shared/types/User';
import { createUser, deleteUser, getUsers, updateUser } from './api';

// Actions

export const getUsersList = createAsyncThunk('user/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await getUsers();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.message);

    return rejectWithValue(error.response?.data?.message);
  }
});

export const createUserAction = createAsyncThunk('users/create', async (payload: UserProps, { rejectWithValue }) => {
  try {
    const response = await createUser(payload);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message);

    return rejectWithValue(error.response?.data?.message);
  }
});

export const updateUserAction = createAsyncThunk('users/update', async (payload: UserProps, { rejectWithValue }) => {
  try {
    const response = await updateUser(payload);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message);

    return rejectWithValue(error.response?.data?.message);
  }
});

export const deleteUserAction = createAsyncThunk('users/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteUser(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
