// Packages
import axios from 'axios';

// Utilities
import { InterestProps } from 'shared/types/Interest';
import { TABLE_PAGE_SIZE } from 'shared/constants/variables';

// Interfaces
import { ApiRequestProps } from 'shared/types/ApiRequest';

// Calls

export const getInterests = ({ page, lang }: ApiRequestProps) =>
  axios.get(`interest/list?items=${TABLE_PAGE_SIZE}&page=${page}`, { headers: { 'accept-language': lang } });

export const modifyInterests = (payload: InterestProps) => {
  return axios.patch(`interest/update/${payload._id}`, payload);
};

export const createInterest = (payload: InterestProps) => {
  return axios.post('interest/create', payload);
};

export const deleteInterest = (_id: number) => axios.delete(`interest/delete/${_id}`, {});
