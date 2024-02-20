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
