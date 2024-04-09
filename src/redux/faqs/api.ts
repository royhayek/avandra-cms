// Packages
import axios from 'axios';

// Interfaces
import { FaqProps } from 'shared/types/Faq';
import { FaqCategoryProps } from 'shared/types/FaqCategory';

// Calls

// Faq Categories

export const getFaqCategories = () => axios.get('faqcategory/list');

export const createFaqCategory = (payload: FaqCategoryProps) => axios.post('faqcategory/create', payload);

export const updateFaqCategory = (payload) => axios.patch(`faqcategory/update/${payload?._id}`, payload);

export const deleteFaqCategory = (_id: string) => axios.delete(`faqcategory/delete/${_id}`, {});

// Faq Questions

export const getFaqQuestions = (_id: string) => axios.get(`faq/list/${_id}`);

export const createFaqQuestion = (payload: FaqProps) => axios.post('faq/create', payload);

export const updateFaqQuestion = (payload) => axios.patch(`faq/update/${payload?._id}`, payload);

export const deleteFaqQuestion = (_id: string) => axios.delete(`faq/delete/${_id}`, {});
