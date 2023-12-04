// Packages
import axios from 'axios';

// Utilities
import { CategoryProps } from 'shared/types/Category';

// Calls

export const getCategories = () => axios.get('category');

export const createCategory = ({ name, title, description, image }: CategoryProps) => {
  return axios.post(
    'image',
    { name, title, description, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
