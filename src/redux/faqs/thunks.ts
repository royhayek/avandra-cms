// Packages
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Utilities
import {
  createFaqCategory,
  createFaqQuestion,
  deleteFaqCategory,
  deleteFaqQuestion,
  getFaqCategories,
  getFaqQuestions,
  updateFaqCategory,
  updateFaqQuestion
} from './api';

// Interfaces
import { FaqCategoryProps } from 'shared/types/FaqCategory';
import { FaqProps } from 'shared/types/Faq';

// Actions

// Faq Categories

export const getFaqCategoriesAction = createAsyncThunk('faqcategory/list', async (_, { rejectWithValue }) => {
  try {
    const response = await getFaqCategories();

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createFaqCategoryAction = createAsyncThunk(
  'faqcategory/create',
  async (payload: FaqCategoryProps, { rejectWithValue }) => {
    try {
      const response = await createFaqCategory(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyFaqCategoryAction = createAsyncThunk(
  'faqcategory/update',
  async (payload: FaqCategoryProps, { rejectWithValue }) => {
    try {
      const response = await updateFaqCategory(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteFaqCategoryAction = createAsyncThunk(
  'faqcategory/delete',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await deleteFaqCategory(_id);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// Faq Questions

export const getFaqQuestionsAction = createAsyncThunk('faqquestion/list', async (_id: string, { rejectWithValue }) => {
  try {
    const response = await getFaqQuestions(_id);

    return response.data.result;
  } catch (error: any) {
    toast.error(error.response?.data?.error);

    return rejectWithValue(error.response?.data?.error);
  }
});

export const createFaqQuestionAction = createAsyncThunk(
  'faqquestion/create',
  async (payload: FaqProps, { rejectWithValue }) => {
    try {
      const response = await createFaqQuestion(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const modifyFaqQuestionAction = createAsyncThunk(
  'faqquestion/update',
  async (payload: FaqProps, { rejectWithValue }) => {
    try {
      const response = await updateFaqQuestion(payload);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteFaqQuestionAction = createAsyncThunk(
  'faqquestion/delete',
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await deleteFaqQuestion(_id);

      if (response.data.success) toast.success(response.data.message);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.error);

      return rejectWithValue(error.response?.data?.error);
    }
  }
);
