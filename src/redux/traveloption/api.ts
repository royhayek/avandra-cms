// Packages
import axios from 'axios';

// Utilities
import { TravelOptionProps } from 'shared/types/TravelOption';

// Calls

export const getTravelers = () => axios.get('traveler/list');

export const modifyTraveler = (payload: TravelOptionProps) => {
  return axios.patch(`traveler/update/${payload._id}`, payload);
};

export const createTraveler = (payload: TravelOptionProps) => {
  return axios.post('traveler/create', payload);
};

export const deleteTraveler = (_id: number) => axios.delete(`traveler/delete/${_id}`, {});

export const getBudgets = () => axios.get('budget/list');

export const modifyBudget = (payload: TravelOptionProps) => {
  return axios.patch(`budget/update/${payload._id}`, payload);
};

export const createBudget = (payload: TravelOptionProps) => {
  return axios.post('budget/create', payload);
};

export const deleteBudget = (_id: number) => axios.delete(`budget/delete/${_id}`, {});
