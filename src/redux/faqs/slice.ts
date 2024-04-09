// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { getFaqCategoriesAction, getFaqQuestionsAction } from './thunks';

// Interfaces
import { FaqsInitialState } from './types';

export const initialState: FaqsInitialState = {
  error: null,
  loading: false,
  faqQuestions: [],
  faqCategories: []
};

export const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFaqCategoriesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFaqCategoriesAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.faqCategories = action.payload;
    });

    builder.addCase(getFaqCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getFaqQuestionsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFaqQuestionsAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.faqQuestions = action.payload;
    });

    builder.addCase(getFaqQuestionsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const faqsActions = faqsSlice.actions;

export default faqsSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _faqs = (state: RootState) => state.data.faqs;

export const getFaqsError = createSelector(_faqs, (data) => data?.error);

export const getFaqsLoading = createSelector(_faqs, (data) => data?.loading);

export const getFaqQuestions = createSelector(_faqs, (data) => data?.faqQuestions);

export const getFaqCategories = createSelector(_faqs, (data) => data?.faqCategories);
