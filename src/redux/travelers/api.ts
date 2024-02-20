// Packages
import axios from 'axios';

// Utilities
import { TravelOptionProps } from 'shared/types/Traveler';

// Calls

export const getTravelers = () => axios.get('traveler/list');

export const modifyTraveler = ({ _id, icon, title, description, enabled }: TravelOptionProps) => {
  return axios.patch(
    `traveler/update/${_id}`,
    { icon, title, description, enabled },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const createTraveler = ({ _id, icon, title, description, enabled }: TravelOptionProps) => {
  return axios.post(
    'traveler/create',
    { _id, icon, title, description, enabled },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const deleteTraveler = (_id: number) => axios.delete(`traveler/delete/${_id}`, {});

export const getBudgets = () => axios.get('budget/list');

export const modifyBudget = ({ _id, icon, title, description, enabled }: TravelOptionProps) => {
  return axios.patch(
    `budget/update/${_id}`,
    { icon, title, description, enabled },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const createBudget = ({ _id, icon, title, description, enabled }: TravelOptionProps) => {
  return axios.post(
    'budget/create',
    { _id, icon, title, description, enabled },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const deleteBudget = (_id: number) => axios.delete(`budget/delete/${_id}`, {});
