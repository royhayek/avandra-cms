// Packages
import axios from 'axios';

// Utilities
import { ArticleProps } from 'shared/types/Article';

// Calls

export const getArticles = () => axios.get('article/list');

export const getArticle = (_id: string) => axios.get(`article/read/${_id}`);

export const modifyArticle = (payload: ArticleProps) => {
  return axios.patch(`article/update/${payload._id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const createArticle = (payload: ArticleProps) => {
  return axios.post('article/create', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const deleteArticle = (_id: number) => axios.delete(`article/delete/${_id}`, {});
