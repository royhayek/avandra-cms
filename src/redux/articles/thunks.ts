// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import {
  getArticle,
  getArticles as getArticles,
  createArticle as createArticle,
  deleteArticle as deleteArticle,
  modifyArticle as modifyArticle
} from './api';

// Interfaces
import { ArticleProps } from 'shared/types/Article';

// Actions

export const getArticlesAction = createAsyncThunk('artiles/getArticles', async (_, { rejectWithValue }) => {
  try {
    const response = await getArticles();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const getArticleAction = createAsyncThunk('article/get', async (_id: string, { rejectWithValue }) => {
  try {
    const response = await getArticle(_id);

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createArticleAction = createAsyncThunk(
  'article/create',
  async (payload: ArticleProps, { rejectWithValue }) => {
    try {
      const response = await createArticle(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyArticleAction = createAsyncThunk(
  'article/update',
  async (payload: ArticleProps, { rejectWithValue }) => {
    try {
      const response = await modifyArticle(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteArticleAction = createAsyncThunk('article/delete', async (_id: number, { rejectWithValue }) => {
  try {
    const response = await deleteArticle(_id);

    if (response.data.success) toast.success(response.data.message);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});
