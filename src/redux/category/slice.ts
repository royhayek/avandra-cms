// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { CategoryProps } from 'shared/types/Category';

interface CcategoryInitialState {
  categories: Array<CategoryProps>;
}

export const initialState: CcategoryInitialState = {
  categories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _categories = (state: RootState) => state.data.categories;

export const getCategories = createSelector(_categories, (data) => data);
