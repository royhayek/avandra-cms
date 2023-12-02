import { CategoryProps } from 'shared/types/Category';
import axios from 'axios';

export const getCategories = () => axios.get('category');

export const createCategory = ({ name, title, description, image }: CategoryProps) => {
  return axios.post(
    'image',
    { name, title, description, image },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
