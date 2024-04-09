// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { createArticleAction, getArticlesAction } from './thunks';

// Interfaces
import { ArticleInitialState } from './types';

export const initialState: ArticleInitialState = {
  data: [],
  loading: false,
  error: null
};

export const articleSlice = createSlice({
  name: 'articles',
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
    builder.addCase(getArticlesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getArticlesAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getArticlesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createArticleAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createArticleAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createArticleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const articleActions = articleSlice.actions;

export default articleSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _articles = (state: RootState) => state.data.articles;

export const selectArticles = createSelector(_articles, (data) => data?.data);

export const selectArticlesError = createSelector(_articles, (data) => data?.error);

export const selectArticlesLoading = createSelector(_articles, (data) => data?.loading);
